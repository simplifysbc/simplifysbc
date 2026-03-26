import { motion } from "framer-motion";
import aboutImg from "@/assets/about-team.jpg";

const MissionSection = () => (
  <section id="about" className="py-24 bg-background">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-widest">Our Mission</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Empowering Rural Economies Through Technology & Innovation
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Simplify Business Consultancy (SBC) is a mission-led consultancy firm dedicated to transforming rural communities across North America through AI-powered business optimization, digital commerce, and strategic capacity-building.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            By working hand-in-hand with local governments, entrepreneurs, and NGOs, we build sustainable digital ecosystems designed to uplift communities and create lasting impact.
          </p>
          <div className="bg-card border border-border rounded-lg p-6 mt-4">
            <p className="text-sm text-muted-foreground italic font-body">
              "While 12% of the U.S. workforce is rural, only 5% of tech jobs exist there. By 2030, we aim to elevate rural America's share of the tech economy to match workforce representation."
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img
            src={aboutImg}
            alt="SBC team consulting with rural business owners"
            width={1280}
            height={854}
            loading="lazy"
            className="rounded-lg shadow-xl w-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default MissionSection;
