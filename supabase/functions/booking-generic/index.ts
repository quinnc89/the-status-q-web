// booking-generic — TSQ AI Automation
// Generic booking webhook handler — works with any system that sends JSON or form-encoded data
// Deployed to: qmhcgtpacrbthqnucmre.supabase.co/functions/v1/booking-generic
// verify_jwt: false

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Common phone field names across booking systems
const PHONE_KEYS = ["phone", "phone_number", "mobile", "cell", "contact_phone", "customer_phone", "invitee_phone", "attendee_phone"];

function extractPhone(obj: any, depth = 0): string | null {
  if (!obj || typeof obj !== "object" || depth > 5) return null;
  for (const key of PHONE_KEYS) {
    if (obj[key] && typeof obj[key] === "string") {
      const cleaned = obj[key].replace(/\D/g, "");
      if (cleaned.length >= 10) return cleaned.length === 10 ? `+1${cleaned}` : `+${cleaned}`;
    }
  }
  for (const val of Object.values(obj)) {
    const found = extractPhone(val, depth + 1);
    if (found) return found;
  }
  return null;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const contentType = req.headers.get("content-type") ?? "";
  let data: any = {};

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    const params = new URLSearchParams(text);
    params.forEach((v, k) => { data[k] = v; });
  } else {
    data = await req.json().catch(() => ({}));
  }

  const callerPhone = extractPhone(data);

  if (!callerPhone) {
    return new Response(JSON.stringify({ ok: true, note: "no phone found in payload" }), { status: 200 });
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

  return new Response(JSON.stringify({ ok: true, matched: !!callRow, phone: callerPhone }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
