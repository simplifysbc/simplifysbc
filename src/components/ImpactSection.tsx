import { motion } from "framer-motion";

const stats = [
  { value: "$500M+", label: "Helping businesses save in operational costs" },
  { value: "10,000+", label: "Rural SMEs empowered with AI practices" },
  { value: "500+", label: "Participants in tech talent training programs" },
  { value: "23", label: "States represented in our network" },
];

const ImpactSection = () => (
  <section className="py-24 bg-primary">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-accent font-medium text-sm uppercase tracking-widest">Our Impact</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mt-3">
          Trust Earned Over Decades
        </h2>
        <p className="text-primary-foreground/70 mt-4 max-w-xl mx-auto">
          A nationwide alliance of 40 member communities representing 2.9 million individuals across the United States.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-8 text-center border border-primary-foreground/15"
          >
            <div className="font-heading text-3xl md:text-4xl font-bold text-accent">{s.value}</div>
            <div className="text-primary-foreground/70 text-sm mt-3">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ImpactSection;
