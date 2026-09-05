import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  SearchSelect,
  DialCodePhoneInput,
  countryOptions,
  useCityOptions,
} from "@/components/forms/LocationFields";
import { Country } from "country-state-city";

const packages = ["Digital Starter", "Growth Accelerator", "Enterprise Pro", "Others"] as const;
const sources = [
  "Homepage",
  "Contact Page",
  "Packages Page",
  "WhatsApp Campaign",
  "Social Media",
] as const;

type LeadSource = (typeof sources)[number];

const phoneRegex = /^[0-9\s\-()]{6,20}$/;

const contactSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  dial_code: z.string().trim().regex(/^\+\d{1,4}$/, "Please select a country dial code"),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number")
    .max(20)
    .regex(phoneRegex, "Use digits only, e.g. 555 123 4567"),
  country: z.string().trim().min(2, "Please select your country").max(80),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  preferred_package: z.enum(packages).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type Props = {
  defaultPackage?: (typeof packages)[number];
  leadSource?: LeadSource;
};

const ContactForm = ({ defaultPackage, leadSource = "Homepage" }: Props) => {
  const [resolvedSource, setResolvedSource] = useState<LeadSource>(leadSource);
  const [countryIso, setCountryIso] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    dial_code: "",
    phone: "",
    city: "",
    preferred_package: defaultPackage ?? "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cityOptions = useCityOptions(countryIso);
  const countryName = useMemo(
    () => (countryIso ? Country.getCountryByCode(countryIso)?.name ?? "" : ""),
    [countryIso],
  );

  // Pre-fill package from ?package= query param
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get("package");
    if (pkg && (packages as readonly string[]).includes(pkg)) {
      setFormData((prev) => ({ ...prev, preferred_package: pkg }));
      setResolvedSource("Packages Page");
    }
  }, []);

  // When country changes, clear city
  useEffect(() => {
    setFormData((prev) => ({ ...prev, city: "" }));
  }, [countryIso]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const parsed = contactSchema.safeParse({
      ...formData,
      country: countryName,
    });
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
      const whatsapp = `${parsed.data.dial_code} ${parsed.data.phone}`.trim();
      const leadId = crypto.randomUUID();
      const { error } = await supabase.from("customer_leads").insert([
        {
          id: leadId,
          full_name: parsed.data.full_name,
          email: parsed.data.email,
          whatsapp_number: whatsapp,
          country: parsed.data.country,
          city: parsed.data.city || null,
          preferred_package: parsed.data.preferred_package || null,
          message: parsed.data.message || null,
          lead_source: resolvedSource,
        } as never,
      ]);

      if (error) throw error;

      // Fire the welcome email; never block the user's confirmation on it.
      supabase.functions
        .invoke("send-lead-welcome", { body: { leadId } })
        .catch((e) => console.error("welcome email failed", e));



      setIsSubmitted(true);
      setCountryIso("");
      setFormData({
        full_name: "",
        email: "",
        dial_code: "",
        phone: "",
        city: "",
        preferred_package: defaultPackage ?? "",
        message: "",
      });
      toast({
        title: "Message sent",
        description:
          "Thank you for contacting Simplify Business Consultancy. Our consultant will connect with you shortly.",
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

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input
        type="text"
        name="full_name"
        placeholder="Full Name *"
        value={formData.full_name}
        onChange={handleChange}
        required
        maxLength={100}
        className={inputClass}
      />

      <input
        type="email"
        name="email"
        placeholder="Email *"
        value={formData.email}
        onChange={handleChange}
        required
        maxLength={255}
        className={inputClass}
      />

      <div>
        <label className="sr-only" htmlFor="contact-phone">
          WhatsApp number
        </label>
        <DialCodePhoneInput
          id="contact-phone"
          dialCode={formData.dial_code}
          phone={formData.phone}
          onDialCodeChange={(v) => setFormData((p) => ({ ...p, dial_code: v }))}
          onPhoneChange={(v) => setFormData((p) => ({ ...p, phone: v }))}
          placeholder="WhatsApp number *"
        />
      </div>

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
          value={formData.city}
          onChange={(v) => setFormData((p) => ({ ...p, city: v }))}
          options={cityOptions}
          placeholder={countryIso ? "City" : "Select country first"}
          searchPlaceholder="Search city..."
          emptyText="No city found."
          disabled={!countryIso}
          ariaLabel="City"
        />
      </div>

      <select
        name="preferred_package"
        value={formData.preferred_package}
        onChange={handleChange}
        className={inputClass}
      >
        <option value="" className="bg-primary text-primary-foreground">
          Preferred Package (optional)
        </option>
        {packages.map((p) => (
          <option key={p} value={p} className="bg-primary text-primary-foreground">
            {p}
          </option>
        ))}
      </select>

      <textarea
        name="message"
        placeholder="Your Message (optional)"
        value={formData.message}
        onChange={handleChange}
        rows={5}
        maxLength={2000}
        className={`${inputClass} resize-none`}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {isSubmitted && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 rounded-lg border border-accent/40 bg-accent/10 p-4 text-sm text-primary-foreground">
          Thank you for contacting Simplify Business Consultancy. Our consultant will connect with you shortly.
        </div>
      )}
    </form>
  );
};

export default ContactForm;
