import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Briefcase, Globe } from "lucide-react";

const pillars = [
  {
    icon: Globe,
    title: "Digital-Driven Economic Transformation",
    desc: "Leveraging data-driven strategies, we partner with rural communities to craft practical plans that foster resilient tech economies.",
  },
  {
    icon: DollarSign,
    title: "Entrepreneurial Investment",
    desc: "Fewer than 2% of venture capital reaches rural businesses. We discover, finance, and empower innovative tech founders throughout rural America.",
  },
  {
    icon: TrendingUp,
    title: "Digital Skills Advancement",
    desc: "We collaborate with communities, employers, and universities to give rural Americans expanded pathways to thrive in today's tech-driven economy.",
  },
  {
    icon: Briefcase,
    title: "Research for Transformative Impact",
    desc: "We create data-focused maps, tools, and resources that illuminate both the opportunities and challenges across rural America.",
  },
];

const HowWeWorkSection = () => (
  <section className="py-24 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-accent font-medium text-sm uppercase tracking-widest">How We Work</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">
          Four Pillars of Rural Innovation
        </h2>
        <p className="text-muted-foreground mt-4">
          SBC positions rural communities as leaders in innovation by providing customized resources and support that reflect their unique strengths.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-5 p-6 rounded-lg border border-border hover:border-accent/30 hover:shadow-md transition-all"
          >
            <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <p.icon className="text-primary-foreground" size={28} />
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowWeWorkSection;
