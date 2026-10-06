import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarCheck, ChevronLeft, ChevronRight, ClipboardList, Users } from "lucide-react";
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
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

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
      return;
    }
    // Send the booking confirmation email when a lead becomes Booked.
    if (patch.pipeline_stage === "Booked") {
      supabase.functions
        .invoke("send-booking-confirmation", { body: { leadId: id } })
        .catch((err) => console.error("booking confirmation email failed", err));
    }
  };

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: leads.length };
    STAGES.forEach((s) => (c[s] = leads.filter((l) => l.pipeline_stage === s).length));
    return c;
  }, [leads]);

  const stats = useMemo(() => {
    const booked = leads.filter((l) => l.pipeline_stage === "Booked");

    const bySource = new Map<string, number>();
    booked.forEach((l) => {
      const key = l.lead_source === "Booking Page" ? "Booking Page" : "Other sources";
      bySource.set(key, (bySource.get(key) ?? 0) + 1);
    });
    // Keep the two headline rows first, then any named sources that have bookings.
    booked.forEach((l) => {
      if (l.lead_source !== "Booking Page") {
        bySource.set(l.lead_source, (bySource.get(l.lead_source) ?? 0) + 1);
      }
    });

    const byConsultant = new Map<string, number>();
    booked.forEach((l) => {
      const key = l.consultant?.trim() || "Unassigned";
      byConsultant.set(key, (byConsultant.get(key) ?? 0) + 1);
    });

    const sort = (m: Map<string, number>) => [...m.entries()].sort((a, b) => b[1] - a[1]);
    return {
      total: leads.length,
      booked: booked.length,
      bySource: sort(bySource),
      byConsultant: sort(byConsultant),
    };
  }, [leads]);

  const visible = filter === "All" ? leads : leads.filter((l) => l.pipeline_stage === filter);
  const groups = STAGES.map((s) => ({ stage: s, items: visible.filter((l) => l.pipeline_stage === s) })).filter(
    (g) => g.items.length > 0
  );

  const bookedLeads = useMemo(
    () =>
      leads
        .filter((l) => l.pipeline_stage === "Booked")
        .sort((a, b) => {
          const ka = `${a.booking_date ?? "9999-12-31"}T${a.booking_time ?? "23:59"}`;
          const kb = `${b.booking_date ?? "9999-12-31"}T${b.booking_time ?? "23:59"}`;
          return sortDir === "asc" ? ka.localeCompare(kb) : kb.localeCompare(ka);
        }),
    [leads, sortDir]
  );

  const bookingsByDay = useMemo(() => {
    const m = new Map<string, Lead[]>();
    bookedLeads.forEach((l) => {
      if (!l.booking_date) return;
      const arr = m.get(l.booking_date) ?? [];
      arr.push(l);
      m.set(l.booking_date, arr);
    });
    return m;
  }, [bookedLeads]);

  const unscheduled = useMemo(() => bookedLeads.filter((l) => !l.booking_date), [bookedLeads]);

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

        {/* Booking stats dashboard */}
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
                <ClipboardList size={20} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total leads</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/20 text-foreground">
                <CalendarCheck size={20} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stats.booked}</p>
                <p className="text-xs text-muted-foreground">Bookings</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                <Users size={20} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stats.byConsultant.length}</p>
                <p className="text-xs text-muted-foreground">Consultants with bookings</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="font-medium text-foreground mb-1">Bookings by source</h2>
              <p className="text-xs text-muted-foreground mb-4">Booking page versus every other way a lead arrived.</p>
              {stats.bySource.length === 0 ? (
                <p className="text-sm text-muted-foreground">No bookings yet.</p>
              ) : (
                <div className="space-y-3">
                  {stats.bySource.map(([source, count]) => (
                    <div key={source}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{source}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent transition-all"
                          style={{ width: `${stats.booked ? Math.round((count / stats.booked) * 100) : 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h2 className="font-medium text-foreground mb-1">Bookings by consultant</h2>
              <p className="text-xs text-muted-foreground mb-4">Who each booked call is assigned to.</p>
              {stats.byConsultant.length === 0 ? (
                <p className="text-sm text-muted-foreground">No bookings yet.</p>
              ) : (
                <div className="space-y-3">
                  {stats.byConsultant.map(([name, count]) => (
                    <div key={name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground">{name}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${stats.booked ? Math.round((count / stats.booked) * 100) : 0}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

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
          <div className="space-y-10">
            {groups.map((group) => (
            <section key={group.stage}>
              <div className="flex items-center gap-2 mb-3">
                <h2 className={`text-sm px-2.5 py-1 rounded-full ${stageTone[group.stage]}`}>{group.stage}</h2>
                <span className="text-xs text-muted-foreground">{group.items.length} lead{group.items.length === 1 ? "" : "s"}</span>
              </div>
              <div className="space-y-4">
            {group.items.map((lead) => (
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

                {lead.pipeline_stage !== "Booked" && (
                  <button
                    onClick={() => updateLead(lead.id, { pipeline_stage: "Booked" })}
                    disabled={savingId === lead.id}
                    className="mt-4 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
                  >
                    Move to Booked
                  </button>
                )}
              </article>
            ))}
              </div>
            </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminPipeline;
