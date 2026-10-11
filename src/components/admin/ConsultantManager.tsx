import { useState } from "react";
import { Plus, Trash2, UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ConsultantRow, consultantPhoto } from "@/hooks/useConsultants";

const fieldClass =
  "w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || crypto.randomUUID().slice(0, 8);

// Resize the photo in the browser and keep it as a small image string.
const resizePhoto = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const size = 400;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no canvas"));
      const min = Math.min(img.width, img.height);
      ctx.drawImage(img, (img.width - min) / 2, (img.height - min) / 2, min, min, 0, 0, size, size);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });

const availabilityToText = (a: ConsultantRow["availability"]) => a.map((x) => `${x.day}: ${x.hours}`).join("\n");
const textToAvailability = (t: string) =>
  t
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const i = l.indexOf(":");
      return i === -1 ? { day: l, hours: "" } : { day: l.slice(0, i).trim(), hours: l.slice(i + 1).trim() };
    });

interface Props {
  consultants: ConsultantRow[];
  reload: () => void;
}

const ConsultantCard = ({ c, reload }: { c: ConsultantRow; reload: () => void }) => {
  const [form, setForm] = useState({
    name: c.name,
    role: c.role,
    bio: c.bio,
    specialties: c.specialties.join(", "),
    availability: availabilityToText(c.availability),
    photo_url: c.photo_url,
    active: c.active,
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!form.name.trim()) {
      toast({ title: "Please add a name", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("consultants")
      .update({
        name: form.name.trim(),
        role: form.role.trim(),
        bio: form.bio.trim(),
        specialties: form.specialties.split(",").map((s) => s.trim()).filter(Boolean),
        availability: textToAvailability(form.availability),
        photo_url: form.photo_url,
        active: form.active,
      })
      .eq("id", c.id);
    setSaving(false);
    if (error) {
      toast({ title: "Could not save", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Consultant saved" });
    reload();
  };

  const remove = async () => {
    if (!confirm(`Remove ${c.name}? Past bookings keep their name.`)) return;
    const { error } = await supabase.from("consultants").delete().eq("id", c.id);
    if (error) toast({ title: "Could not remove", description: error.message, variant: "destructive" });
    else reload();
  };

  return (
    <article className="bg-card border border-border rounded-xl p-5">
      <div className="flex gap-4 items-start">
        <label className="shrink-0 cursor-pointer text-center">
          <img
            src={consultantPhoto({ photo_url: form.photo_url, slug: c.slug })}
            alt={form.name}
            className="w-20 h-20 rounded-full object-cover border border-border"
          />
          <span className="block text-xs text-accent mt-1">Change photo</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              try {
                const url = await resizePhoto(f);
                setForm((p) => ({ ...p, photo_url: url }));
              } catch {
                toast({ title: "Could not read that photo", variant: "destructive" });
              }
            }}
          />
        </label>
        <div className="flex-1 grid gap-2">
          <input className={fieldClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" />
          <input className={fieldClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Job title" />
        </div>
      </div>
      <label className="block text-xs text-muted-foreground mt-3">
        Short bio
        <textarea rows={3} className={`${fieldClass} mt-1 resize-none`} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
      </label>
      <label className="block text-xs text-muted-foreground mt-3">
        Specialties (separate with commas)
        <input className={`${fieldClass} mt-1`} value={form.specialties} onChange={(e) => setForm({ ...form, specialties: e.target.value })} />
      </label>
      <label className="block text-xs text-muted-foreground mt-3">
        Availability (one per line, e.g. Monday: 09:00 - 13:00)
        <textarea rows={3} className={`${fieldClass} mt-1 resize-none`} value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} />
      </label>
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
          Show on website
        </label>
        <div className="flex-1" />
        <button onClick={remove} className="p-2 rounded-lg border border-border text-muted-foreground hover:text-destructive" aria-label="Remove consultant">
          <Trash2 size={16} />
        </button>
        <button
          onClick={save}
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </article>
  );
};

const ConsultantManager = ({ consultants, reload }: Props) => {
  const add = async () => {
    const name = prompt("New consultant's full name");
    if (!name?.trim()) return;
    const { error } = await supabase.from("consultants").insert({
      name: name.trim(),
      slug: `${slugify(name)}-${Date.now().toString(36)}`,
      sort_order: consultants.length + 1,
    });
    if (error) toast({ title: "Could not add", description: error.message, variant: "destructive" });
    else reload();
  };

  return (
    <section className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <h2 className="font-medium text-foreground flex items-center gap-2">
            <UserRound size={18} /> Consultants
          </h2>
          <p className="text-xs text-muted-foreground">
            These profiles appear on the Meet our consultants page and in the booking form.
          </p>
        </div>
        <button onClick={add} className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted flex items-center gap-2">
          <Plus size={16} /> Add consultant
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {consultants.map((c) => (
          <ConsultantCard key={`${c.id}-${c.photo_url?.length ?? 0}-${c.name}`} c={c} reload={reload} />
        ))}
      </div>
    </section>
  );
};

export default ConsultantManager;
