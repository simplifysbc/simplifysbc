import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import CareersSection from "@/components/CareersSection";

const CtaSection = () => (
  <>
    <section id="contact" className="py-24 bg-primary">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-primary-foreground/70 text-lg">
              Book a free 30 minute call. We will look at how your business runs today and show you exactly where you can cut costs, grow revenue, and free up your time.
            </p>
            <div className="space-y-4 text-primary-foreground/80">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>No obligation, just a friendly conversation</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>Get a personalized action plan for your business</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>We respond within 24 hours</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-primary-foreground/5 rounded-xl p-6 md:p-8 border border-primary-foreground/10"
          >
            <h3 className="text-xl font-heading font-semibold text-primary-foreground mb-6">
              Send Us a Message
            </h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>

    <CareersSection />
  </>
);

export default CtaSection;
