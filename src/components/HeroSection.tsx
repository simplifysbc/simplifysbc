import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-rural.jpg";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0">
      <img src={heroImg} alt="Rural American town with digital connectivity" width={1920} height={1080} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
    </div>

    <div className="container relative z-10 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl space-y-6"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium border border-accent/30">
          AI-Powered Rural Consulting
        </span>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
          Modernize Your Rural Business with Smart Automation
        </h1>
        <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
          We help businesses in rural America cut waste, bring in more revenue, and build operations that actually scale. No matter where you're located.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
            Schedule a Free Consultation <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            See Our Results
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
