// vapi-call-logger — TSQ AI Automation
// Receives Vapi post-call webhook, logs to ai_calls, sends SMS via Twilio
// Deployed to: qmhcgtpacrbthqnucmre.supabase.co/functions/v1/vapi-call-logger
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

  // Extract call metadata from Vapi payload
  const call = payload?.message?.call ?? payload?.call ?? payload;
  const vapiCallId = call?.id ?? null;
  const assistantName = call?.assistant?.name ?? payload?.message?.assistant?.name ?? null;
  const callerNumber = call?.customer?.number ?? null;
  const durationSeconds = Math.round((call?.endedAt && call?.startedAt)
    ? (new Date(call.endedAt).getTime() - new Date(call.startedAt).getTime()) / 1000
    : (call?.duration ?? 0));
  const transcript = call?.transcript ?? payload?.message?.transcript ?? null;
  const summary = call?.analysis?.summary ?? payload?.message?.analysis?.summary ?? null;
  const rawPayload = payload;

  // Determine outcome
  let outcome = "answered";
  const endedReason = call?.endedReason ?? "";
  if (endedReason.includes("transfer")) outcome = "transferred";
  else if (endedReason.includes("voicemail")) outcome = "voicemail";
  else if (durationSeconds < 5) outcome = "missed";

  const appointmentBooked = summary?.toLowerCase().includes("appointment booked") ||
    transcript?.toLowerCase().includes("appointment booked") || false;
  const messageTaken = summary?.toLowerCase().includes("message taken") ||
    transcript?.toLowerCase().includes("i'll pass that along") || false;

  // Match client by assistant name
  let clientId = null;
  if (assistantName) {
    const { data: clientRow } = await supabase
      .from("ai_clients")
      .select("id")
      .ilike("assistant_name", `%${assistantName.replace(" Receptionist", "").trim()}%`)
      .maybeSingle();
    clientId = clientRow?.id ?? null;
  }

  // Log call to ai_calls
  const { error: insertError } = await supabase.from("ai_calls").insert({
    client_id: clientId,
    vapi_call_id: vapiCallId,
    caller_number: callerNumber,
    duration_seconds: durationSeconds,
    outcome,
    appointment_booked: appointmentBooked,
    message_taken: messageTaken,
    transcript,
    summary,
    raw_payload: rawPayload,
  });

  if (insertError) {
    console.error("Insert error:", insertError);
  }

  // Send SMS to Quinn via Twilio
  const twilioSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const twilioToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const twilioFrom = Deno.env.get("TWILIO_PHONE_FROM");
  const quinnPhone = Deno.env.get("QUINN_PHONE");

  if (twilioSid && twilioToken && twilioFrom && quinnPhone) {
    const clientLabel = assistantName ?? "Unknown client";
    const mins = Math.floor(durationSeconds / 60);
    const secs = durationSeconds % 60;
    const durationLabel = `${mins}m ${secs}s`;
    const callerLabel = callerNumber ?? "unknown number";
    const bookingLabel = appointmentBooked ? " · ✅ Appt booked" : "";
    const messageLabel = messageTaken ? " · 📝 Message taken" : "";
    const smsBody = `📞 New call, ${clientLabel}\n${durationLabel} · ${outcome}${bookingLabel}${messageLabel}\nCaller: ${callerLabel}`;

    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
    const auth = btoa(`${twilioSid}:${twilioToken}`);
    await fetch(twilioUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: twilioFrom, To: quinnPhone, Body: smsBody }),
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
