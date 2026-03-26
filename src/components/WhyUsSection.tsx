import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const stats = [
  { value: "150+", label: "Rural Businesses Served" },
  { value: "40%", label: "Avg. Cost Reduction" },
  { value: "2.5×", label: "Avg. Revenue Growth" },
  { value: "12", label: "States Covered" },
];

const reasons = [
  "We know how rural businesses actually operate",
  "AI tools sized and priced for small and mid-size companies",
  "On-site and remote support wherever you are",
  "Clients see real profit growth within the first 90 days",
  "Straight talk, real results, no buzzwords",
];

const WhyUsSection = () => (
  <section id="about" className="py-24 bg-card">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-accent font-medium text-sm uppercase tracking-widest"><span className="text-accent font-medium text-sm uppercase tracking-widest">Why Simplify</span></span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
            Built for Businesses That Build America
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Big consulting firms don't get rural America. We do. Our team grew up in small towns and has worked across agriculture, manufacturing, and local government. We pair that real-world experience with modern AI and automation.
          </p>
          <ul className="space-y-4">
            {reasons.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <CheckCircle2 className="text-success mt-0.5 shrink-0" size={20} />
                <span className="text-foreground text-sm">{r}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-5"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-background rounded-lg p-8 text-center border border-border">
              <div className="font-heading text-3xl md:text-4xl font-bold text-accent">{s.value}</div>
              <div className="text-muted-foreground text-sm mt-2">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhyUsSection;
