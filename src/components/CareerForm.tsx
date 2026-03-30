import { useState } from "react";
import { Send, CheckCircle, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const CareerForm = () => {
  const [formData, setFormData] = useState({ full_name: "", email: "", phone: "", position: "", message: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File must be under 5MB", variant: "destructive" });
        return;
      }
      const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowed.includes(file.type)) {
        toast({ title: "Please upload a PDF or Word document", variant: "destructive" });
        return;
      }
      setCvFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { full_name, email } = formData;

    if (!full_name.trim() || !email.trim()) {
      toast({ title: "Please fill in your name and email", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      let cv_url: string | null = null;

      if (cvFile) {
        const ext = cvFile.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("career-cvs").upload(fileName, cvFile);
        if (uploadError) throw uploadError;
        cv_url = fileName;
      }

      const { error } = await supabase.from("career_applications").insert({
        full_name: full_name.trim(),
        email: email.trim(),
        phone: formData.phone.trim() || null,
        position: formData.position.trim() || null,
        message: formData.message.trim() || null,
        cv_url,
      });

      if (error) throw error;

      setIsSubmitted(true);
      setFormData({ full_name: "", email: "", phone: "", position: "", message: "" });
      setCvFile(null);
      toast({ title: "Application submitted successfully! We will review it shortly." });
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 py-8">
        <CheckCircle className="mx-auto text-accent" size={48} />
        <h3 className="text-2xl font-heading font-bold text-foreground">Thank you for applying!</h3>
        <p className="text-muted-foreground">We received your application and will get back to you soon.</p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>Submit another application</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name *</Label>
          <Input id="full_name" name="full_name" placeholder="Jane Smith" value={formData.full_name} onChange={handleChange} maxLength={100} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="career_email">Email Address *</Label>
          <Input id="career_email" name="email" type="email" placeholder="jane@example.com" value={formData.email} onChange={handleChange} maxLength={255} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" placeholder="+1 (555) 123 4567" value={formData.phone} onChange={handleChange} maxLength={20} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position of Interest</Label>
          <Input id="position" name="position" placeholder="e.g. Automation Consultant" value={formData.position} onChange={handleChange} maxLength={100} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="career_message">Cover Letter or Message</Label>
        <Textarea id="career_message" name="message" placeholder="Tell us about yourself and why you want to join our team..." value={formData.message} onChange={handleChange} maxLength={2000} rows={4} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cv">Upload Your CV (PDF or Word, max 5MB)</Label>
        <div className="flex items-center gap-3">
          <label htmlFor="cv" className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-muted transition-colors text-sm">
            <Upload size={16} />
            {cvFile ? cvFile.name : "Choose file"}
          </label>
          <input id="cv" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
        </div>
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
        {isSubmitting ? "Submitting..." : "Submit Application"} <Send size={18} />
      </Button>
    </form>
  );
};

export default CareerForm;
