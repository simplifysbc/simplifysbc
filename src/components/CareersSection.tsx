import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import CareerForm from "@/components/CareerForm";

const CareersSection = () => (
  <section id="careers" className="py-24 bg-card">
    <div className="container">
      <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <Briefcase className="text-accent" size={28} />
            <span className="text-accent font-medium text-sm uppercase tracking-widest">Careers</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Join Our Team
          </h2>
          <p className="text-muted-foreground text-lg">
            We are always looking for talented people who share our passion for helping rural businesses grow. If you believe in making things simpler and better, we want to hear from you.
          </p>
          <div className="space-y-4 text-foreground/80">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Remote friendly positions available</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Work with small businesses across rural America</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Make a real impact in communities that need it</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-background rounded-xl p-6 md:p-8 border border-border"
        >
          <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
            Submit Your Application
          </h3>
          <CareerForm />
        </motion.div>
      </div>
    </div>
  </section>
);

export default CareersSection;
