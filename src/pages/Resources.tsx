import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const articles = [
  {
    title: "How a Small Farm in Iowa Saved 20 Hours a Week with Automation",
    excerpt:
      "Mitchell Family Farms was buried in paperwork. We helped them set up automated inventory tracking, order management, and invoicing. Here is what changed.",
    category: "Case Study",
    date: "March 2026",
    readTime: "5 min read",
  },
  {
    title: "5 Signs Your Rural Business Is Ready for Digital Tools",
    excerpt:
      "Not sure if it is time to go digital? If you recognize any of these five patterns in your day to day, the answer is probably yes.",
    category: "Guide",
    date: "February 2026",
    readTime: "4 min read",
  },
  {
    title: "Why Process Optimization Matters More Than New Technology",
    excerpt:
      "Most businesses rush to buy new software before fixing what is already broken. We explain why getting your processes right comes first.",
    category: "Insight",
    date: "February 2026",
    readTime: "6 min read",
  },
  {
    title: "From Paper to Profit: A Manufacturing Company's Digital Journey",
    excerpt:
      "Redford Manufacturing in Kentucky went from clipboards and spreadsheets to a fully connected operation. Their costs dropped 35% in the first quarter.",
    category: "Case Study",
    date: "January 2026",
    readTime: "7 min read",
  },
  {
    title: "Low Bandwidth, Big Results: Going Digital in Areas with Spotty Internet",
    excerpt:
      "Rural does not mean disconnected. We share practical strategies for building digital systems that work reliably even when the internet does not.",
    category: "Guide",
    date: "January 2026",
    readTime: "5 min read",
  },
  {
    title: "The True Cost of Manual Processes (And How to Fix It)",
    excerpt:
      "We break down exactly how much time and money the average small business loses to manual work, and what to do about it.",
    category: "Insight",
    date: "December 2025",
    readTime: "4 min read",
  },
];

const categoryColors: Record<string, string> = {
  "Case Study": "bg-accent/10 text-accent",
  Guide: "bg-primary/10 text-primary",
  Insight: "bg-muted text-muted-foreground",
};

const Resources = () => (
  <div className="min-h-screen">
    <Navbar />

    <section className="pt-28 pb-16 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center space-y-4"
        >
          <span className="text-accent font-medium text-sm uppercase tracking-widest">
            Resources
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Guides, Case Studies, and Practical Insights
          </h1>
          <p className="text-muted-foreground text-lg">
            Real stories and hands on advice to help rural businesses grow
            smarter. No fluff, just what works.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="py-16 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-lg bg-card border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[a.category] || ""}`}
                >
                  <Tag size={12} className="inline mr-1" />
                  {a.category}
                </span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                {a.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {a.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {a.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {a.readTime}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-primary text-center">
      <div className="container max-w-2xl space-y-6">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground">
          Want Results Like These?
        </h2>
        <p className="text-primary-foreground/80">
          Book a free call and we will show you exactly where your business can
          save time and grow revenue.
        </p>
        <Button
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
        >
          Book Your Free Call <ArrowRight size={18} />
        </Button>
      </div>
    </section>

    <Footer />
  </div>
);

export default Resources;
