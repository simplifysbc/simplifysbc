import { motion } from "framer-motion";
import { ArrowLeft, Bot, Clock, DollarSign, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImg from "@/assets/service-automation.jpg";

const benefits = [
  { icon: Clock, title: "Save 15+ Hours Weekly", desc: "Automate invoicing, scheduling, inventory tracking, and customer follow-ups." },
  { icon: DollarSign, title: "Reduce Operating Costs", desc: "Cut manual labor expenses by up to 40% with smart automation tools." },
  { icon: Zap, title: "Faster Response Times", desc: "Automated alerts and workflows mean nothing falls through the cracks." },
];

const features = [
  "Automated invoicing and payment reminders",
  "Smart inventory tracking and reorder alerts",
  "Customer communication workflows (email & SMS)",
  "Appointment scheduling and calendar sync",
  "Expense tracking and financial reporting",
  "Employee task management and assignment",
];

const ServiceAutomation = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero */}
    <section className="relative min-h-[60vh] flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Automation for small rural businesses" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />
      </div>
      <div className="container relative z-10 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl space-y-5">
          <a href="/" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </a>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground leading-tight">
            Automation for Small Rural Businesses
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
            Running a small business in a rural area means wearing many hats. We help you put the repetitive stuff on autopilot so you can focus on what matters most — growing your business and serving your community.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Get a Free Automation Audit
          </Button>
        </motion.div>
      </div>
    </section>

    {/* Benefits */}
    <section className="py-20 bg-background">
      <div className="container">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Why Automate Your Business?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-8 rounded-lg bg-card border border-border text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <b.icon className="text-accent" size={28} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-muted-foreground text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Features List */}
    <section className="py-20 bg-card">
      <div className="container max-w-3xl">
        <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-10">What We Automate</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border">
              <CheckCircle2 className="text-accent mt-0.5 shrink-0" size={20} />
              <span className="text-foreground text-sm font-medium">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-primary text-center">
      <div className="container max-w-2xl space-y-6">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground">Ready to Automate?</h2>
        <p className="text-primary-foreground/80">Schedule a free consultation and discover how much time and money your business can save with smart automation.</p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Schedule Free Consultation</Button>
      </div>
    </section>

    <Footer />
  </div>
);

export default ServiceAutomation;
