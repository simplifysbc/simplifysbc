import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (t: string) => void;
  onDone: () => void;
  onError: (e: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (resp.status === 429) { onError("Too many requests. Please wait a moment."); return; }
  if (resp.status === 402) { onError("AI service temporarily unavailable."); return; }
  if (!resp.ok || !resp.body) { onError("Something went wrong. Please try again."); return; }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { onDone(); return; }
      try {
        const c = JSON.parse(json).choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch { buf = line + "\n" + buf; break; }
    }
  }
  onDone();
}

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    setMessages((p) => [...p, userMsg]);
    setLoading(true);

    let acc = "";
    const upsert = (chunk: string) => {
      acc += chunk;
      setMessages((p) => {
        const last = p[p.length - 1];
        if (last?.role === "assistant") {
          return p.map((m, i) => (i === p.length - 1 ? { ...m, content: acc } : m));
        }
        return [...p, { role: "assistant", content: acc }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsert,
        onDone: () => setLoading(false),
        onError: (e) => {
          setMessages((p) => [...p, { role: "assistant", content: e }]);
          setLoading(false);
        },
      });
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "Connection error. Please try again." }]);
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-all duration-300",
          "w-14 h-14 bg-primary text-primary-foreground hover:scale-105",
          open && "rotate-90"
        )}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-background shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300"
          style={{ height: "min(520px, calc(100vh - 8rem))" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-primary text-primary-foreground">
            <Bot size={22} />
            <div>
              <p className="font-heading text-sm font-semibold">SBC Assistant</p>
              <p className="text-xs opacity-80">Ask us anything about our services</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                <Bot size={32} className="mx-auto mb-3 text-accent" />
                <p className="font-medium">Welcome to Simplify Business Consultancy!</p>
                <p className="mt-1 text-xs">Ask me about our services, pricing, or how we can help your business grow.</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}>
                {m.role === "assistant" && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                    <Bot size={14} className="text-accent" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card text-card-foreground rounded-bl-md"
                  )}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none [&>p]:my-1 [&>ul]:my-1 [&>ol]:my-1">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
                {m.role === "user" && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <User size={14} className="text-primary" />
                  </div>
                )}
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot size={14} className="text-accent" />
                </div>
                <div className="bg-card rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border">
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading || !input.trim()} className="rounded-xl h-10 w-10">
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
