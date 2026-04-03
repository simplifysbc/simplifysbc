import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    if (name.length > 100 || email.length > 255 || message.length > 2000) {
      toast({ title: "One or more fields exceed the maximum length", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name,
        email,
        message,
      });

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      toast({ title: "Message sent successfully! We will be in touch soon." });
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4 py-8"
      >
        <CheckCircle className="mx-auto text-accent" size={48} />
        <h3 className="text-2xl font-heading font-bold text-primary-foreground">
          Thank you for reaching out!
        </h3>
        <p className="text-primary-foreground/70">
          We received your message and will get back to you shortly.
        </p>
        <Button
          className="bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => setIsSubmitted(false)}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-primary-foreground/90">
          Your Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Jane Smith"
          value={formData.name}
          onChange={handleChange}
          maxLength={100}
          className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-accent"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-primary-foreground/90">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          value={formData.email}
          onChange={handleChange}
          maxLength={255}
          className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-accent"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-primary-foreground/90">
          Your Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your business and how we can help..."
          value={formData.message}
          onChange={handleChange}
          maxLength={2000}
          rows={4}
          className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-accent"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
      >
        {isSubmitting ? "Sending..." : "Send Message"} <Send size={18} />
      </Button>
    </form>
  );
};

export default ContactForm;
