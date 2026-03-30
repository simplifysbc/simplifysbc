import { motion } from "framer-motion";
import { Users, Target, Lightbulb, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

const About = () => (
  <div className="min-h-screen">
    <Navbar />

    <section className="pt-28 pb-16 bg-background">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-4 mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-widest">About Us</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
            We Make Business Simpler
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>We started Simplify Business Consultancy with a simple idea.</p>
          <p>
            Small businesses in rural areas work very hard. They serve their communities. They build trust over the years. But many of them still run on old systems. A lot of work is done by hand. It takes time. It creates stress.
          </p>
          <p>We saw this again and again.</p>
          <p>
            Big companies use smart tools. They automate tasks. They save time and money. Small businesses should be able to do the same. But most of them do not know where to start. That is the gap we wanted to fill.
          </p>
          <p className="text-xl font-semibold text-foreground">That is why we built this company.</p>
        </motion.div>
      </div>
    </section>

    <section className="py-16 bg-card">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="text-accent" size={28} />
            <h2 className="font-heading text-3xl font-bold text-foreground">What We Believe</h2>
          </div>
          <div className="text-foreground/90 space-y-4 text-lg">
            <p>We believe business should be clear. Not confusing.</p>
            <p>You should not have to work longer hours just to keep things running. You should not feel stuck doing the same tasks every day.</p>
            <p>With the right systems, things can be easier.</p>
            <p>You can save time. You can reduce mistakes. You can focus on growing your business.</p>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-16 bg-background">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-accent" size={28} />
            <h2 className="font-heading text-3xl font-bold text-foreground">What We Do</h2>
          </div>
          <div className="text-foreground/90 space-y-4 text-lg">
            <p>We help you look at how your business runs today.</p>
            <p>We find what is slowing you down. We fix what is not working well.</p>
            <p>Then we bring in simple tools to make things easier.</p>
            <p>We do not push complex tech. We do not overcomplicate things. We keep it simple and practical.</p>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-16 bg-card">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
          <h2 className="font-heading text-3xl font-bold text-foreground">How We Work</h2>

          <div className="grid gap-6">
            {[
              { step: "First, we listen", desc: "We learn how your business works. We understand your daily tasks and your challenges." },
              { step: "Then we improve", desc: "We clean up your processes. We remove steps that waste time." },
              { step: "Then we automate", desc: "We set up tools that handle repeat work. This saves you hours every week." },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4 p-6 rounded-lg bg-background border border-border">
                <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-lg">{item.step}</h3>
                  <p className="text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-16 bg-background">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-accent" size={28} />
            <h2 className="font-heading text-3xl font-bold text-foreground">Who We Help</h2>
          </div>
          <div className="text-foreground/90 space-y-4 text-lg">
            <p>We work with small and rural businesses across the United States. Many of our clients are:</p>
            <ul className="space-y-3">
              {["Family owned businesses", "Local service providers", "Small shops and growing companies"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="text-accent shrink-0" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>If your business feels busy but not efficient, we can help.</p>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-16 bg-card">
      <div className="container max-w-3xl text-center space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-heading text-3xl font-bold text-foreground">Our Goal</h2>
          <p className="text-foreground/90 text-lg mt-4">
            Our goal is simple. We want to help you run a business that feels easier to manage. Less stress. Less manual work. More time to grow.
          </p>
        </motion.div>
      </div>
    </section>

    <Testimonials />

    <section className="py-20 bg-primary text-center">
      <div className="container max-w-2xl space-y-6">
        <p className="text-primary-foreground/50 italic text-sm">Simplifying Business, Empowering Communities</p>
        <h2 className="font-heading text-3xl font-bold text-primary-foreground">Let's Keep It Simple</h2>
        <p className="text-primary-foreground/80 text-lg">
          We believe you do not need complicated systems to grow. You need the right ones. If you are ready to make your business run more smoothly, we are here to help.
        </p>
        <a href="/#contact">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
            Book Your Free Call <ArrowRight size={18} />
          </Button>
        </a>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
