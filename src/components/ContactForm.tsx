import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const packages = ["Digital Starter", "Growth Accelerator", "Enterprise Pro", "Others"] as const;
const sources = [
  "Homepage",
  "Contact Page",
  "Packages Page",
  "WhatsApp Campaign",
  "Social Media",
] as const;

type LeadSource = (typeof sources)[number];

const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

const contactSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  whatsapp_number: z
    .string()
    .trim()
    .min(7, "Please enter a valid WhatsApp number")
    .max(30)
    .regex(phoneRegex, "Use international format, e.g. +1 555 123 4567"),
  country: z.string().trim().min(2, "Please enter your country").max(80),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  preferred_package: z.enum(packages).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

type Props = {
  defaultPackage?: (typeof packages)[number];
  leadSource?: LeadSource;
};

const ContactForm = ({ defaultPackage, leadSource = "Homepage" }: Props) => {
  const [resolvedSource, setResolvedSource] = useState<LeadSource>(leadSource);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    whatsapp_number: "",
    country: "",
    city: "",
    preferred_package: defaultPackage ?? "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill package from ?package= query param (e.g. clicking a pricing CTA)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get("package");
    if (pkg && (packages as readonly string[]).includes(pkg)) {
      setFormData((prev) => ({ ...prev, preferred_package: pkg }));
      setResolvedSource("Packages Page");
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // duplicate-submit guard

    const parsed = contactSchema.safeParse(formData);
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
      const { error } = await supabase.from("customer_leads").insert([
        {
          full_name: parsed.data.full_name,
          email: parsed.data.email,
          whatsapp_number: parsed.data.whatsapp_number,
          country: parsed.data.country,
          city: parsed.data.city || null,
          preferred_package: parsed.data.preferred_package || null,
          message: parsed.data.message || null,
          lead_source: resolvedSource,
        } as never,
      ]);

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({
        full_name: "",
        email: "",
        whatsapp_number: "",
        country: "",
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="tel"
          name="whatsapp_number"
          placeholder="WhatsApp Number * (e.g. +1 555 123 4567)"
          value={formData.whatsapp_number}
          onChange={handleChange}
          required
          maxLength={30}
          className={inputClass}
        />
        <input
          type="text"
          name="country"
          placeholder="Country *"
          value={formData.country}
          onChange={handleChange}
          required
          maxLength={80}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          maxLength={80}
          className={inputClass}
        />
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
      </div>

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
