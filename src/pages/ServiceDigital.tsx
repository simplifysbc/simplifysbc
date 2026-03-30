import { motion } from "framer-motion";
import { ArrowLeft, Cloud, Smartphone, Database, Shield, Wifi, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImg from "@/assets/service-digital.jpg";
import SEO from "@/components/SEO";

const pillars = [
  { icon: Cloud, title: "Cloud Migration", desc: "Move from local servers and spreadsheets to secure cloud platforms accessible from anywhere, even with limited bandwidth." },
  { icon: Smartphone, title: "Mobile First Tools", desc: "Equip your team with apps that work on any device, so they can manage operations from the field, the shop floor, or the road." },
  { icon: Database, title: "Centralized Data", desc: "Bring all your business data into one place. Sales, inventory, customers, and finances. One source of truth." },
  { icon: Shield, title: "Security and Compliance", desc: "We make sure your digital systems meet industry standards and keep your business data safe from threats." },
  { icon: Wifi, title: "Low Bandwidth Solutions", desc: "We design systems that work reliably even in areas with limited internet connectivity. Rural should never mean disconnected." },
];

const testimonial = {
  name: "Maria Gonzalez",
  role: "Founder, Valley Health Clinic",
  location: "Las Cruces, New Mexico",
  quote: "Going digital felt overwhelming for a small clinic. SBC walked us through every step, set up systems that work even when our internet is spotty, and trained all our staff. Patients love the new scheduling system.",
  result: "Patient wait times cut by 50%",
};

const ServiceDigital = () => (
  <div className="min-h-screen">
    <SEO
      title="Digital Transformation for Rural Companies in the USA"
      description="Go digital without losing what makes your business special. Cloud migration, mobile-first tools, and low-bandwidth solutions designed for rural companies across America."
      canonical="/services/digital-transformation"
    />
    <Navbar />

    <section className="relative min-h-[60vh] flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Digital transformation for rural companies" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />
      </div>
      <div className="container relative z-10 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl space-y-5">
          <a href="/" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </a>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground leading-tight">
            Digital Transformation for Rural Companies
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
            Going digital doesn't mean losing what makes your business special. We help rural companies adopt modern technology that fits their unique challenges, from limited connectivity to lean teams.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Start Your Digital Journey
          </Button>
        </motion.div>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-4">The Five Pillars of Rural Digital Transformation</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">We tailor every engagement around these core areas to make sure your transformation is practical, affordable, and lasting.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="p-8 rounded-lg bg-card border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <p.icon className="text-accent" size={24} />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-card">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative p-10 rounded-lg bg-background border border-border">
          <Quote className="text-accent/15 absolute top-6 right-6" size={48} />
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} className="text-accent fill-accent" size={16} />
            ))}
          </div>
          <p className="text-foreground leading-relaxed mb-6">"{testimonial.quote}"</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-muted-foreground text-sm">{testimonial.role}</p>
              <p className="text-muted-foreground text-xs">{testimonial.location}</p>
            </div>
            <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">{testimonial.result}</span>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-20 bg-primary text-center">
      <div className="container max-w-2xl space-y-6">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground">Your Location Should Never Limit Your Potential</h2>
        <p className="text-primary-foreground/80">Let's build a digital foundation that puts your rural business on equal footing with anyone, anywhere.</p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Book a Free Strategy Call</Button>
      </div>
    </section>

    <Footer />
  </div>
);

export default ServiceDigital;
