import { motion } from "framer-motion";
import { ArrowLeft, GitBranch, Settings, BarChart3, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImg from "@/assets/service-workflow.jpg";

const offerings = [
  { icon: GitBranch, title: "Workflow Mapping & Design", desc: "We document your current workflows, identify inefficiencies, and design streamlined alternatives tailored to your industry." },
  { icon: Settings, title: "Tool Selection & Integration", desc: "We recommend and implement the right automation tools — CRMs, project management, accounting software — and connect them seamlessly." },
  { icon: BarChart3, title: "Performance Dashboards", desc: "Track the impact of your new workflows in real-time with custom dashboards showing KPIs that matter to your bottom line." },
  { icon: Users, title: "Team Training & Adoption", desc: "We don't just build it and leave. Our consultants train your staff and provide ongoing support until every team member is confident." },
];

const industries = [
  "Agriculture & Farming Operations",
  "Manufacturing & Distribution",
  "Healthcare & Medical Practices",
  "Retail & E-Commerce",
  "Construction & Trades",
  "Professional Services & Legal",
];

const ServiceWorkflow = () => (
  <div className="min-h-screen">
    <Navbar />

    <section className="relative min-h-[60vh] flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Workflow automation consulting USA" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />
      </div>
      <div className="container relative z-10 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl space-y-5">
          <a href="/" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </a>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground leading-tight">
            Workflow Automation Consulting (USA)
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
            From coast to coast, we help American businesses replace manual, error-prone workflows with intelligent automation that saves time, cuts costs, and drives growth.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Talk to a Workflow Expert
          </Button>
        </motion.div>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Our Consulting Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {offerings.map((o, i) => (
            <motion.div key={o.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex gap-5 p-8 rounded-lg bg-card border border-border">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <o.icon className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{o.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{o.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-card">
      <div className="container max-w-3xl">
        <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-10">Industries We Serve</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {industries.map((ind) => (
            <div key={ind} className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border">
              <CheckCircle2 className="text-accent shrink-0" size={20} />
              <span className="text-foreground text-sm font-medium">{ind}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-primary text-center">
      <div className="container max-w-2xl space-y-6">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground">Let's Streamline Your Business</h2>
        <p className="text-primary-foreground/80">Get a free workflow assessment and see exactly how automation can transform your operations.</p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Get Free Assessment</Button>
      </div>
    </section>

    <Footer />
  </div>
);

export default ServiceWorkflow;
