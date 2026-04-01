import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Digital Starter",
    best: "Best for small businesses just getting started with systems and automation",
    price: "$300",
    features: [
      "Basic business process review",
      "Identify time wasting tasks",
      "Setup of 1 to 2 simple automations",
      "Tool recommendations (easy to use and affordable)",
      "Email support",
    ],
  },
  {
    name: "Growth Accelerator",
    best: "For businesses that want to improve operations and save more time",
    price: "$800",
    featured: true,
    features: [
      "Full workflow review",
      "Process improvement plan",
      "Setup of multiple automations",
      "Help choosing the right tools",
      "Step by step guidance",
      "Support for 3 to 4 weeks",
    ],
  },
  {
    name: "Enterprise Pro",
    best: "For businesses ready to scale and run smoothly with strong systems",
    price: "Custom",
    features: [
      "Complete business operations audit",
      "Advanced process optimization",
      "Custom automation systems",
      "Integration of tools and platforms",
      "Ongoing consulting and support",
      "Priority communication",
    ],
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24 bg-card">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-accent font-medium text-sm uppercase tracking-widest">Pricing</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">
          Simple Plans That Fit Your Business
        </h2>
        <p className="text-muted-foreground mt-4">
          We keep things clear and practical. No confusing packages. No unnecessary extras. Choose what fits your business today. You can always grow later.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl p-8 flex flex-col border ${
              plan.featured
                ? "bg-primary text-primary-foreground border-accent shadow-xl scale-[1.02]"
                : "bg-background border-border"
            }`}
          >
            {plan.featured && (
              <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">Most Popular</span>
            )}
            <h3 className="font-heading text-xl font-bold">{plan.name}</h3>
            <p className={`text-sm mt-2 ${plan.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              {plan.best}
            </p>
            <p className={`text-sm mt-4 mb-6 italic ${plan.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
              Contact us for a customized quote tailored to your business needs
            </p>
            <ul className="space-y-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check className={`shrink-0 mt-0.5 ${plan.featured ? "text-accent" : "text-accent"}`} size={18} />
                  <span className={`text-sm ${plan.featured ? "text-primary-foreground/90" : "text-foreground/80"}`}>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-8 block">
              <Button
                size="lg"
                className={`w-full gap-2 ${
                  plan.featured
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                Get Started <ArrowRight size={18} />
              </Button>
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16 max-w-lg mx-auto"
      >
        <h3 className="font-heading text-xl font-semibold text-foreground">Not Sure What You Need?</h3>
        <p className="text-muted-foreground mt-2">
          That's okay. Every business is different. We are happy to guide you.
        </p>
        <a href="#contact">
          <Button size="lg" className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
            Send Message <ArrowRight size={18} />
          </Button>
        </a>
      </motion.div>
    </div>
  </section>
);

export default PricingSection;
