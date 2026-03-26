import { motion } from "framer-motion";
import { Cpu, ShoppingCart, GraduationCap, Heart, Monitor } from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "AI-Driven Optimization",
    desc: "Operational audits, predictive analytics, and workflow automation. Embrace the power of AI to streamline operations, reduce manual workload, and make smarter, data-backed decisions.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    desc: "Establish a strong online presence with custom store development, secure payments, mobile-friendly designs, and inventory management — tailored to your rural business needs.",
  },
  {
    icon: GraduationCap,
    title: "Training & Mentorship",
    desc: "Personalized mentorship, hands-on training, and practical workshops that develop leadership, technical, and professional abilities for immediate application.",
  },
  {
    icon: Heart,
    title: "Social Impact Programs",
    desc: "Initiatives focused on education, skill development, environmental sustainability, and community empowerment to uplift underserved populations.",
  },
  {
    icon: Monitor,
    title: "Digitalization",
    desc: "Transform traditional paper-based processes into efficient, technology-driven systems with modern digital tools, automated workflows, and optimized data management.",
  },
];

const OurWorkSection = () => (
  <section id="our-work" className="py-24 bg-card">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-accent font-medium text-sm uppercase tracking-widest">Our Work</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">
          How We Help Rural Businesses Thrive
        </h2>
        <p className="text-muted-foreground mt-4">
          We help entrepreneurs, SMEs, and sole proprietors modernize operations through digitalization & automation to sell more online and build durable growth.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group p-8 rounded-lg bg-background border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300"
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

export default OurWorkSection;
