import { motion } from "framer-motion";
import { Cpu, Workflow, BarChart3, Users, Bot, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "Process Optimization",
    desc: "We look at how your business runs day to day, find what's slowing you down, and fix it so you keep more of what you earn.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    desc: "Put repetitive tasks on autopilot. From invoicing to scheduling, we set up tools that do the busy work for you.",
  },
  {
    icon: Cpu,
    title: "Digital Transformation",
    desc: "Move from paper and spreadsheets to modern systems that save time and keep everything in one place.",
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    desc: "See what's actually happening in your business with clear dashboards that help you spot where you're leaving money on the table.",
  },
  {
    icon: Users,
    title: "Change Management",
    desc: "We train your team and stick around until everyone is comfortable, so improvements last well beyond our engagement.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Security",
    desc: "Stay on the right side of regulations while keeping your business data locked down and private.",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-24 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-accent font-medium text-sm uppercase tracking-widest">What We Do</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">
          End-to-End Business Process Solutions
        </h2>
        <p className="text-muted-foreground mt-4">
          From first look to full rollout, we build solutions that fit the way rural businesses actually work.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-8 rounded-lg bg-card border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
              <s.icon className="text-accent" size={24} />
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
