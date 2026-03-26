import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CtaSection = () => (
  <section id="csr" className="py-24 bg-primary">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto space-y-6"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
          Get Involved
        </h2>
        <p className="text-primary-foreground/70 text-lg">
          Together, we can realize a new era of prosperity for rural America in the age of innovation. Join our nationwide network of communities, partners, and innovators.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
            Join Us <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            Subscribe to Newsletter
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
