import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CtaSection = () => (
  <section id="contact" className="py-24 bg-primary">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto space-y-6"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
          Ready to Transform Your Operations?
        </h2>
        <p className="text-primary-foreground/70 text-lg">
          Book a free 30-minute call. We'll look at how your business runs today and show you exactly where you can cut costs, grow revenue, and free up your time.
        </p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
          Book Your Free Call <ArrowRight size={18} />
        </Button>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
