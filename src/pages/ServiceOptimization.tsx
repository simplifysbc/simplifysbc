import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Target, Layers, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImg from "@/assets/service-optimization.jpg";

const benefits = [
  { icon: TrendingUp, title: "Boost Revenue by 20–35%", desc: "Streamlined processes mean fewer bottlenecks, faster delivery, and happier customers." },
  { icon: Target, title: "Eliminate Waste", desc: "We identify redundant steps, manual workarounds, and cost leaks across your operations." },
  { icon: Layers, title: "Scalable Processes", desc: "Build systems that grow with you — whether you hire 2 people or 200." },
];

const steps = [
  { num: "01", title: "Discovery & Assessment", desc: "We map out your existing processes end-to-end, interviewing team members and observing real workflows." },
  { num: "02", title: "Bottleneck Analysis", desc: "Using data-driven methods, we identify exactly where time and money are being lost." },
  { num: "03", title: "Solution Design", desc: "We design optimized workflows tailored to your specific industry, team size, and budget." },
  { num: "04", title: "Implementation & Training", desc: "We roll out improvements alongside your team and train everyone until the new processes stick." },
];

const ServiceOptimization = () => (
  <div className="min-h-screen">
    <Navbar />

    <section className="relative min-h-[60vh] flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Business process optimization" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />
      </div>
      <div className="container relative z-10 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl space-y-5">
          <a href="/" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </a>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground leading-tight">
            Business Process Optimization Services
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
            Most businesses lose 20–30% of revenue to inefficient processes they don't even realize exist. We find those leaks, fix them, and build systems that keep your business running like a well-oiled machine.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Request a Process Audit
          </Button>
        </motion.div>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">The Results You Can Expect</h2>
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

    <section className="py-20 bg-card">
      <div className="container max-w-4xl">
        <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">Our 4-Step Optimization Process</h2>
        <div className="space-y-8">
          {steps.map((s, i) => (
            <motion.div key={s.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex gap-6 items-start p-6 rounded-lg bg-background border border-border">
              <span className="text-4xl font-heading font-bold text-accent/30">{s.num}</span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-primary text-center">
      <div className="container max-w-2xl space-y-6">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground">Stop Leaving Money on the Table</h2>
        <p className="text-primary-foreground/80">Let us show you exactly where your business is leaking time and revenue — and how to fix it.</p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Get Your Free Audit</Button>
      </div>
    </section>

    <Footer />
  </div>
);

export default ServiceOptimization;
