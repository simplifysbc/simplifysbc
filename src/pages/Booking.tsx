import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import {
  SearchSelect,
  DialCodePhoneInput,
  countryOptions,
  useCityOptions,
} from "@/components/forms/LocationFields";
import { Country } from "country-state-city";
import { Link } from "react-router-dom";
import { ANY_CONSULTANT, consultantNames } from "@/data/consultants";

const packages = ["Digital Starter", "Growth Accelerator", "Enterprise Pro", "Others"] as const;

const consultants = [ANY_CONSULTANT, ...consultantNames];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const;

const phoneRegex = /^[0-9\s\-()]{6,20}$/;

const bookingSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  dial_code: z.string().trim().regex(/^\+\d{1,4}$/, "Please select a country dial code"),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(20).regex(phoneRegex, "Use digits only, e.g. 555 123 4567"),
  country: z.string().trim().min(2, "Please select your country").max(80),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  preferred_package: z.enum(packages, { errorMap: () => ({ message: "Please choose a package" }) }),
  booking_date: z.string().min(1, "Please choose a date"),
  booking_time: z.string().min(1, "Please choose a time"),
  consultant: z.string().min(1, "Please choose a consultant"),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

const todayIso = () => new Date().toISOString().slice(0, 10);

const Booking = () => {
  const [countryIso, setCountryIso] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<{ date: string; time: string; consultant: string } | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    dial_code: "",
    phone: "",
    city: "",
    preferred_package: "",
    booking_date: "",
    booking_time: "",
    consultant: consultants[0],
    message: "",
  });

  const cityOptions = useCityOptions(countryIso);
  const countryName = useMemo(
    () => (countryIso ? Country.getCountryByCode(countryIso)?.name ?? "" : ""),
    [countryIso],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get("package");
    const consultant = params.get("consultant");
    setForm((p) => ({
      ...p,
      preferred_package: pkg && (packages as readonly string[]).includes(pkg) ? pkg : p.preferred_package,
      consultant: consultant && consultants.includes(consultant) ? consultant : p.consultant,
    }));
  }, []);

  useEffect(() => {
    setForm((p) => ({ ...p, city: "" }));
  }, [countryIso]);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const parsed = bookingSchema.safeParse({ ...form, country: countryName });
    if (!parsed.success) {
      toast({
        title: "Please check your details",
        description: parsed.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const leadId = crypto.randomUUID();
      const { error } = await supabase.from("customer_leads").insert([
        {
          id: leadId,
          full_name: parsed.data.full_name,
          email: parsed.data.email,
          whatsapp_number: `${parsed.data.dial_code} ${parsed.data.phone}`.trim(),
          country: parsed.data.country,
          city: parsed.data.city || null,
          preferred_package: parsed.data.preferred_package,
          message: parsed.data.message || null,
          lead_source: "Booking Page",
          status: "Confirmed",
          pipeline_stage: "Booked",
          booking_date: parsed.data.booking_date,
          booking_time: parsed.data.booking_time,
          consultant: parsed.data.consultant,
        } as never,
      ]);

      if (error) throw error;

      supabase.functions
        .invoke("send-lead-welcome", { body: { leadId } })
        .catch((err) => console.error("welcome email failed", err));

      setConfirmed({
        date: parsed.data.booking_date,
        time: parsed.data.booking_time,
        consultant: parsed.data.consultant,
      });
      toast({
        title: "Booking confirmed",
        description: "Your session is booked. We have sent a confirmation to your email.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition";

  return (
    <>
      <SEO
        title="Book a Consultation"
        description="Pick your package, choose a date and time, and book a session with a Simplify Business Consultancy consultant."
        canonical="/booking"
      />
      <Navbar />
      <main className="min-h-screen bg-muted/30 pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-accent text-sm font-medium">
              <CalendarCheck size={18} /> Booking
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3">Book your consultation</h1>
            <p className="text-muted-foreground mt-3">
              Choose the package you are interested in, pick a day and time that suits you, and tell us who you would
              like to speak with. We will confirm by email.
            </p>
          </div>

          {confirmed ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <CheckCircle2 className="mx-auto text-accent" size={40} />
              <h2 className="font-heading text-2xl font-bold mt-4">You are booked</h2>
              <p className="text-muted-foreground mt-3">
                {new Date(`${confirmed.date}T00:00:00`).toLocaleDateString(undefined, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                at {confirmed.time} with {confirmed.consultant}.
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                A confirmation email is on its way. If anything changes, just reply to that email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name *"
                  value={form.full_name}
                  onChange={change}
                  maxLength={100}
                  className={fieldClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={form.email}
                  onChange={change}
                  maxLength={255}
                  className={fieldClass}
                />
              </div>

              <DialCodePhoneInput
                id="booking-phone"
                dialCode={form.dial_code}
                phone={form.phone}
                onDialCodeChange={(v) => setForm((p) => ({ ...p, dial_code: v }))}
                onPhoneChange={(v) => setForm((p) => ({ ...p, phone: v }))}
                placeholder="WhatsApp number *"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SearchSelect
                  value={countryIso}
                  onChange={setCountryIso}
                  options={countryOptions}
                  placeholder="Country *"
                  searchPlaceholder="Search country..."
                  emptyText="No country found."
                  ariaLabel="Country"
                />
                <SearchSelect
                  value={form.city}
                  onChange={(v) => setForm((p) => ({ ...p, city: v }))}
                  options={cityOptions}
                  placeholder={countryIso ? "City" : "Select country first"}
                  searchPlaceholder="Search city..."
                  emptyText="No city found."
                  disabled={!countryIso}
                  ariaLabel="City"
                />
              </div>

              <label className="block text-sm text-muted-foreground">
                Package *
                <select name="preferred_package" value={form.preferred_package} onChange={change} className={`${fieldClass} mt-1`}>
                  <option value="">Select a package</option>
                  {packages.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block text-sm text-muted-foreground">
                  Date *
                  <input
                    type="date"
                    name="booking_date"
                    min={todayIso()}
                    value={form.booking_date}
                    onChange={change}
                    className={`${fieldClass} mt-1`}
                  />
                </label>
                <label className="block text-sm text-muted-foreground">
                  Time *
                  <select name="booking_time" value={form.booking_time} onChange={change} className={`${fieldClass} mt-1`}>
                    <option value="">Select a time</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block text-sm text-muted-foreground">
                Consultant *
                <select name="consultant" value={form.consultant} onChange={change} className={`${fieldClass} mt-1`}>
                  {consultants.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <p className="text-xs text-muted-foreground -mt-2">
                <Link to="/consultants" className="text-accent underline underline-offset-4">
                  Meet our consultants
                </Link>{" "}
                to see their focus areas, availability and past projects.
              </p>


              <textarea
                name="message"
                placeholder="Anything you would like us to know before the call (optional)"
                value={form.message}
                onChange={change}
                rows={4}
                maxLength={2000}
                className={fieldClass}
              />

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {isSubmitting ? "Booking..." : "Confirm booking"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Booking is free. Contact us for a customized quote tailored to your business needs.
              </p>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Booking;
