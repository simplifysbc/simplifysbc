import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

// The generated database types lag behind the new pipeline columns.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as unknown as { from: (table: string) => any };

const STAGES = ["New", "Contacted", "Qualified", "Scheduled", "Booked", "Lost"] as const;
type Stage = (typeof STAGES)[number];

type Lead = {
  id: string;
  lead_id: string;
  created_date: string;
  full_name: string;
  email: string;
  whatsapp_number: string | null;
  country: string | null;
  city: string | null;
  preferred_package: string | null;
  message: string | null;
  lead_source: string;
  pipeline_stage: Stage;
  booking_date: string | null;
  booking_time: string | null;
  consultant: string | null;
  internal_notes: string | null;
};

const stageTone: Record<Stage, string> = {
  New: "bg-muted text-muted-foreground",
  Contacted: "bg-secondary text-secondary-foreground",
  Qualified: "bg-secondary text-secondary-foreground",
  Scheduled: "bg-accent/20 text-foreground",
  Booked: "bg-accent text-accent-foreground",
  Lost: "bg-destructive/10 text-destructive",
};

const AdminPipeline = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Stage | "All">("All");
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: roles } = await db
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id);
      if (!active) return;
      const ok = (roles ?? []).some((r: { role: string }) => r.role === "admin" || r.role === "consultant");
      setAllowed(ok);
      setChecking(false);
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate("/auth", { replace: true });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    const { data, error } = await db
      .from("customer_leads")
      .select("*")
      .order("created_date", { ascending: false });
    if (error) {
      toast({ title: "Could not load leads", description: error.message, variant: "destructive" });
    } else {
      setLeads((data ?? []) as unknown as Lead[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (allowed) loadLeads();
  }, [allowed, loadLeads]);

  const updateLead = async (id: string, patch: Partial<Lead>) => {
    setSavingId(id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    const { error } = await db
      .from("customer_leads")
      .update(patch)
      .eq("id", id);
    setSavingId(null);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      loadLeads();
    }
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: leads.length };
    STAGES.forEach((s) => (c[s] = leads.filter((l) => l.pipeline_stage === s).length));
    return c;
  }, [leads]);

  const visible = filter === "All" ? leads : leads.filter((l) => l.pipeline_stage === filter);

  if (checking) {
    return <main className="min-h-screen grid place-items-center text-muted-foreground">Loading...</main>;
  }

  if (!allowed) {
    return (
      <main className="min-h-screen grid place-items-center px-4 text-center">
        <div>
          <h1 className="font-serif text-2xl mb-2">No pipeline access</h1>
          <p className="text-muted-foreground mb-6">Ask an administrator to grant your account access.</p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/auth", { replace: true });
            }}
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition"
          >
            Sign out
          </button>
        </div>
      </main>
    );
  }

  const fieldClass =
    "w-full px-3 py-2 rounded-md bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <SEO title="Booking Pipeline" description="Internal booking pipeline for Simplify Business Consultancy." noindex />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-serif text-3xl text-foreground">Booking pipeline</h1>
            <p className="text-muted-foreground text-sm">Move each lead from New through to Booked.</p>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/auth", { replace: true });
            }}
            className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition"
          >
            Sign out
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["All", ...STAGES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s as Stage | "All")}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                filter === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:bg-muted"
              }`}
            >
              {s} ({counts[s] ?? 0})
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading leads...</p>
        ) : visible.length === 0 ? (
          <p className="text-muted-foreground">No leads in this stage yet.</p>
        ) : (
          <div className="space-y-4">
            {visible.map((lead) => (
              <article key={lead.id} className="bg-card border border-border rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-medium text-foreground">{lead.full_name}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${stageTone[lead.pipeline_stage]}`}>
                        {lead.pipeline_stage}
                      </span>
                      <span className="text-xs text-muted-foreground">{lead.lead_id}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {lead.email}
                      {lead.whatsapp_number ? ` · ${lead.whatsapp_number}` : ""}
                      {lead.city || lead.country ? ` · ${[lead.city, lead.country].filter(Boolean).join(", ")}` : ""}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {lead.preferred_package ? `${lead.preferred_package} · ` : ""}
                      {lead.lead_source} · {new Date(lead.created_date).toLocaleDateString()}
                    </p>
                  </div>
                  {savingId === lead.id && <span className="text-xs text-muted-foreground">Saving...</span>}
                </div>

                {lead.message && (
                  <p className="text-sm text-foreground/80 bg-muted/50 rounded-md p-3 mb-4 whitespace-pre-line">
                    {lead.message}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <label className="text-xs text-muted-foreground">
                    Stage
                    <select
                      value={lead.pipeline_stage}
                      onChange={(e) => updateLead(lead.id, { pipeline_stage: e.target.value as Stage })}
                      className={`${fieldClass} mt-1`}
                    >
                      {STAGES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs text-muted-foreground">
                    Booking date
                    <input
                      type="date"
                      value={lead.booking_date ?? ""}
                      onChange={(e) => updateLead(lead.id, { booking_date: e.target.value || null })}
                      className={`${fieldClass} mt-1`}
                    />
                  </label>
                  <label className="text-xs text-muted-foreground">
                    Booking time
                    <input
                      type="time"
                      value={lead.booking_time ? lead.booking_time.slice(0, 5) : ""}
                      onChange={(e) => updateLead(lead.id, { booking_time: e.target.value || null })}
                      className={`${fieldClass} mt-1`}
                    />
                  </label>
                  <label className="text-xs text-muted-foreground">
                    Consultant
                    <input
                      type="text"
                      defaultValue={lead.consultant ?? ""}
                      placeholder="Assign a consultant"
                      onBlur={(e) => {
                        const v = e.target.value.trim();
                        if (v !== (lead.consultant ?? "")) updateLead(lead.id, { consultant: v || null });
                      }}
                      className={`${fieldClass} mt-1`}
                    />
                  </label>
                </div>

                <label className="block text-xs text-muted-foreground mt-3">
                  Internal notes
                  <textarea
                    defaultValue={lead.internal_notes ?? ""}
                    rows={2}
                    placeholder="Notes for the team"
                    onBlur={(e) => {
                      const v = e.target.value.trim();
                      if (v !== (lead.internal_notes ?? "")) updateLead(lead.id, { internal_notes: v || null });
                    }}
                    className={`${fieldClass} mt-1 resize-none`}
                  />
                </label>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminPipeline;
