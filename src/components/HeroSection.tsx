import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-rural.jpg";

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImg} alt="Rural American communities connected through technology" width={1920} height={1080} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />
    </div>

    <div className="container relative z-10 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl space-y-6"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium border border-accent/30">
          Simplifying Business, Empowering Communities
        </span>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
          Driving Rural America into the Modern Tech Landscape
        </h1>
        <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
          SBC bridges the urban-rural divide by making cutting-edge technology and e-commerce accessible to underserved communities — empowering small businesses with AI, digital tools, and strategic partnerships.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
            Get Started <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
            Explore Our Work
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
