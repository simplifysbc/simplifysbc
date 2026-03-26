import { motion } from "framer-motion";
import { Cpu, Workflow, BarChart3, Users, Bot, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "Process Optimization",
    desc: "Audit and redesign your workflows to eliminate bottlenecks, reduce costs, and boost throughput.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    desc: "Deploy smart automation for invoicing, scheduling, inventory, and customer management.",
  },
  {
    icon: Cpu,
    title: "Digital Transformation",
    desc: "Transition from paper-based systems to modern digital platforms — at your pace.",
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    desc: "Turn your data into actionable insights with dashboards and reporting tailored to your business.",
  },
  {
    icon: Users,
    title: "Change Management",
    desc: "Train your team and build internal capability so improvements stick long after we leave.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Security",
    desc: "Ensure your processes meet industry standards while keeping your data safe and private.",
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
          From initial assessment to full implementation, we deliver solutions that fit the unique needs of rural enterprises.
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
