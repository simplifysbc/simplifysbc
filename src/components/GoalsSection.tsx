import { motion } from "framer-motion";

const goals = [
  { target: "10,000+", label: "rural SMEs empowered with AI practices" },
  { target: "$500M+", label: "in operational cost savings for businesses" },
  { target: "500+", label: "NGOs & governments partnered with" },
  { target: "5,000+", label: "rural businesses launched onto global e-commerce" },
];

const GoalsSection = () => (
  <section className="py-24 bg-background">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-accent font-medium text-sm uppercase tracking-widest">Vision 2030</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            By 2030, We Aim To
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Together, we're shaping a stronger, more inclusive economic future for rural America — powered by technology, partnerships, and community-first thinking.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-5"
        >
          {goals.map((g, i) => (
            <div key={i} className="bg-card rounded-lg p-6 border border-border">
              <div className="font-heading text-2xl md:text-3xl font-bold text-accent">{g.target}</div>
              <div className="text-muted-foreground text-sm mt-2">{g.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default GoalsSection;
