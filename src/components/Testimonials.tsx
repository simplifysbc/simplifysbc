import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Owner, Mitchell Family Farms",
    location: "Granville, Iowa",
    quote:
      "Before working with SBC, we were tracking everything on paper. Now our inventory updates itself, orders come in automatically, and we saved over 20 hours a week. That time goes right back into the farm.",
    result: "20+ hours saved weekly",
    stars: 5,
  },
  {
    name: "James Redford",
    role: "General Manager, Redford Manufacturing",
    location: "Pikeville, Kentucky",
    quote:
      "They looked at our whole operation and found problems we didn't even know we had. Within 90 days our costs dropped by 35%. The team was hands on and never made us feel like we were behind.",
    result: "35% cost reduction in 90 days",
    stars: 5,
  },
  {
    name: "Maria Gonzalez",
    role: "Founder, Valley Health Clinic",
    location: "Las Cruces, New Mexico",
    quote:
      "Going digital felt overwhelming for a small clinic. SBC walked us through every step, set up systems that work even when our internet is spotty, and trained all our staff. Patients love the new scheduling system.",
    result: "Patient wait times cut by 50%",
    stars: 5,
  },
];

const Testimonials = () => (
  <section className="py-20 bg-card">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <span className="text-accent font-medium text-sm uppercase tracking-widest">
          Client Stories
        </span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">
          Real Results from Rural Businesses
        </h2>
        <p className="text-muted-foreground mt-4">
          These are the kinds of outcomes we deliver every day for businesses
          across rural America.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative p-8 rounded-lg bg-background border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300"
          >
            <Quote
              className="text-accent/15 absolute top-4 right-4"
              size={40}
            />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.stars }).map((_, j) => (
                <Star
                  key={j}
                  className="text-accent fill-accent"
                  size={16}
                />
              ))}
            </div>
            <p className="text-foreground text-sm leading-relaxed mb-6">
              "{t.quote}"
            </p>
            <div className="pt-4 border-t border-border">
              <p className="font-heading font-semibold text-foreground text-sm">
                {t.name}
              </p>
              <p className="text-muted-foreground text-xs">{t.role}</p>
              <p className="text-muted-foreground text-xs">{t.location}</p>
            </div>
            <div className="mt-4 inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
              {t.result}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
