// booking-acuity — TSQ AI Automation
// Receives Acuity Scheduling webhook, matches to recent ai_calls, marks appointment_booked = true
// Deployed to: qmhcgtpacrbthqnucmre.supabase.co/functions/v1/booking-acuity
// verify_jwt: false
// Optional secrets: ACUITY_USER_ID, ACUITY_API_KEY (for fetching full appointment details)

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

  // Parse form-encoded or JSON body
  const contentType = req.headers.get("content-type") ?? "";
  let action: string | null = null;
  let appointmentId: string | null = null;
  let callerPhone: string | null = null;

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    const params = new URLSearchParams(text);
    action = params.get("action");
    appointmentId = params.get("id");
    callerPhone = params.get("phone");
  } else {
    const payload = await req.json().catch(() => ({}));
    action = payload?.action;
    appointmentId = payload?.id?.toString();
    callerPhone = payload?.phone;
  }

  if (action !== "scheduled") {
    return new Response(JSON.stringify({ ok: true, skipped: true }), { status: 200 });
  }

  // If no phone in webhook, try to fetch from Acuity API
  if (!callerPhone && appointmentId) {
    const userId = Deno.env.get("ACUITY_USER_ID");
    const apiKey = Deno.env.get("ACUITY_API_KEY");
    if (userId && apiKey) {
      const res = await fetch(`https://acuityscheduling.com/api/v1/appointments/${appointmentId}`, {
        headers: { Authorization: `Basic ${btoa(`${userId}:${apiKey}`)}` },
      });
      if (res.ok) {
        const appt = await res.json();
        callerPhone = appt?.phone ?? null;
      }
    }
  }

  if (!callerPhone) {
    return new Response(JSON.stringify({ ok: true, note: "no phone found" }), { status: 200 });
  }

  // Normalize phone
  const cleaned = callerPhone.replace(/\D/g, "");
  const normalizedPhone = cleaned.length === 10 ? `+1${cleaned}` : `+${cleaned}`;

  // Find recent call from this number (within 60 min)
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { data: callRow } = await supabase
    .from("ai_calls")
    .select("id")
    .eq("caller_number", normalizedPhone)
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
