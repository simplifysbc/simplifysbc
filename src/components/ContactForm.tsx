import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const packages = ["Digital Starter", "Growth Accelerator", "Enterprise Pro", "Others"] as const;
const sources = ["homepage", "contact", "packages"] as const;

const contactSchema = z.object({
  full_name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  whatsapp_number: z.string().trim().max(30).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  preferred_package: z.enum(packages).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please enter a message").max(2000),
});

type Props = {
  defaultPackage?: (typeof packages)[number];
  leadSource?: (typeof sources)[number];
};

const ContactForm = ({ defaultPackage, leadSource = "homepage" }: Props) => {
  const [resolvedSource, setResolvedSource] = useState<(typeof sources)[number]>(leadSource);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    whatsapp_number: "",
    country: "",
    preferred_package: defaultPackage ?? "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill package from ?package= query param (when visitor clicks a pricing CTA)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const pkg = params.get("package");
    if (pkg && (packages as readonly string[]).includes(pkg)) {
      setFormData((prev) => ({ ...prev, preferred_package: pkg }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          whatsapp_number: parsed.data.whatsapp_number || null,
          country: parsed.data.country || null,
          preferred_package: parsed.data.preferred_package || null,
          message: parsed.data.message,
          lead_source: leadSource,
        },
      ]);

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({
        full_name: "",
        email: "",
        whatsapp_number: "",
        country: "",
        preferred_package: defaultPackage ?? "",
        message: "",
      });
      toast({
        title: "Message sent",
        description:
          "Thank you for contacting Simplify Business Consultancy. Our specialist will contact you shortly.",
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
    "w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="full_name"
        placeholder="Your Name"
        value={formData.full_name}
        onChange={handleChange}
        required
        maxLength={100}
        className={inputClass}
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
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
          placeholder="WhatsApp Number"
          value={formData.whatsapp_number}
          onChange={handleChange}
          maxLength={30}
          className={inputClass}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          maxLength={80}
          className={inputClass}
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
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={5}
        maxLength={2000}
        className={`${inputClass} resize-none`}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {isSubmitted && (
        <p className="text-sm text-accent">
          Thank you for contacting Simplify Business Consultancy. Our specialist will contact you shortly.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
