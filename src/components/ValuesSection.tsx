import { motion } from "framer-motion";
import { Handshake, Scale, Shield, Heart, Star } from "lucide-react";

const values = [
  {
    icon: Handshake,
    title: "Coordination",
    desc: "Build solutions in partnership with communities. Learn from each other and improve performance by working together.",
  },
  {
    icon: Scale,
    title: "Impartiality",
    desc: "Intentionally create spaces to ensure every voice is heard. Prioritize resources for innovative approaches to achieve equity goals.",
  },
  {
    icon: Shield,
    title: "Honesty",
    desc: "Do what we say we are going to do. Create agreements aligned with our stated values.",
  },
  {
    icon: Heart,
    title: "Appreciation",
    desc: "Practice empathy, offer praise, and measure in constructive criticism. Recognize and build on the strengths of individuals and communities.",
  },
  {
    icon: Star,
    title: "Belief",
    desc: "Act with empathy, authenticity, and humility. Identify gaps in trust, discuss them, and address them.",
  },
];

const ValuesSection = () => (
  <section className="py-24 bg-card">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-accent font-medium text-sm uppercase tracking-widest">Our Values</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">
          Prevailing Beliefs & Encouraged Behaviors
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center p-6 rounded-lg bg-background border border-border hover:border-accent/30 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <v.icon className="text-accent" size={22} />
            </div>
            <h3 className="font-heading text-base font-semibold text-foreground mb-2">{v.title}</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValuesSection;
