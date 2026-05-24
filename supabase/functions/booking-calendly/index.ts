// booking-calendly — TSQ AI Automation
// Receives Calendly invitee.created webhook, matches to recent ai_calls by phone, marks appointment_booked = true
// Deployed to: qmhcgtpacrbthqnucmre.supabase.co/functions/v1/booking-calendly
// verify_jwt: false

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Only handle invitee.created events
  if (payload?.event !== "invitee.created") {
    return new Response(JSON.stringify({ ok: true, skipped: true }), { status: 200 });
  }

  // Extract phone from Calendly Q&A responses
  const questions = payload?.payload?.questions_and_answers ?? [];
  let callerPhone: string | null = null;
  for (const qa of questions) {
    const answer = qa?.answer ?? "";
    const cleaned = answer.replace(/\D/g, "");
    if (cleaned.length >= 10) {
      callerPhone = `+1${cleaned.slice(-10)}`;
      break;
    }
  }

  if (!callerPhone) {
    console.log("No phone found in Calendly Q&A");
    return new Response(JSON.stringify({ ok: true, note: "no phone found" }), { status: 200 });
  }

  // Find recent call from this number (within 60 min)
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { data: callRow } = await supabase
    .from("ai_calls")
    .select("id")
    .eq("caller_number", callerPhone)
    .gte("call_start", since)
    .order("call_start", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (callRow?.id) {
    await supabase
      .from("ai_calls")
      .update({ appointment_booked: true, outcome: "appointment_booked" })
      .eq("id", callRow.id);
  }

  return new Response(JSON.stringify({ ok: true, matched: !!callRow }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
