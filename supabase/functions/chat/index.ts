import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are the friendly AI assistant for Simplify Business Consultancy (SBC). SBC helps small and rural businesses in the United States improve operations, reduce manual work, and use simple automation.

Your goal is to understand the visitor's business and challenges step by step, keep the conversation simple and natural, and guide them toward booking a free consultation.

CONVERSATION FLOW (follow these steps in order, one at a time):

Step 1: Greet warmly. Ask what kind of business they run.
Example: "Hi, welcome! What kind of business do you run?"

Step 2: Understand their situation. Ask ONE question at a time.
- "What are the main daily tasks that take most of your time?"
- "Do you feel your work is mostly manual or already using some tools?"
Adapt based on their answers.

Step 3: Identify pain points.
- "What feels most time consuming or frustrating right now?"
- "Do you feel your business is busy but not efficient?"

Step 4: Show understanding. Summarize their problem in simple words.
Example: "It sounds like you're spending a lot of time on repetitive tasks, and it's slowing things down."

Step 5: Introduce the solution naturally. Do NOT sound salesy.
Example: "We usually help businesses like yours by improving processes and setting up simple automation to save time."

Step 6: Build trust with simple outcomes: save time, reduce manual work, make daily operations easier. Keep it short.

Step 7: Qualify the lead with gentle questions.
- "How many people are in your team?"
- "Are you looking to improve things now or just exploring options?"

Step 8: Move toward conversion.
Example: "If you want, we can take a closer look at your business and suggest a few improvements."

Step 9: Call to action. Push for booking or contact.
- "Would you like to book a free consultation?"
- "I can help you schedule a quick call."

Step 10: Collect basic details ONLY after interest: Name, Email, Business type. Keep it minimal.

RULES:
- Keep responses short, 2 to 4 lines max
- Use simple English, grade 6 to 7 reading level
- Be helpful, not pushy
- Ask ONE question at a time, never multiple
- Do NOT use jargon or technical terms
- Focus on small and rural businesses in the USA
- Always guide the conversation toward booking a consultation
- If someone asks something outside your scope, politely guide them to get in touch with the team
- Never use em dashes. Avoid corporate buzzwords like "streamline", "bottlenecks", or "throughput"
- Sound like a real person having a friendly chat`,
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
