import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const articles = [
  {
    title: "How Automation Can Transform Rural Businesses in the USA",
    excerpt:
      "Rural businesses face unique challenges. Limited staff, tight budgets, and manual processes eat up valuable hours. Automation is changing the game for small town companies across America.",
    category: "Case Study",
    date: "March 2026",
    readTime: "7 min read",
    slug: "/resources/how-automation-can-transform-rural-businesses",
  },
  {
    title: "10 Affordable Automation Tools for Small Rural Businesses",
    excerpt:
      "You do not need a massive budget to start automating. Here are ten powerful tools that cost little or nothing to get started and can save your business hours every week.",
    category: "Guide",
    date: "March 2026",
    readTime: "6 min read",
    slug: "/resources/affordable-automation-tools",
  },
  {
    title: "How AI Is Helping Small Town Businesses Compete in 2026",
    excerpt:
      "AI is no longer reserved for tech giants. Small town businesses across America are using AI powered tools to work smarter, serve customers better, and grow revenue.",
    category: "Case Study",
    date: "March 2026",
    readTime: "8 min read",
    slug: "/resources/ai-helping-small-town-businesses",
  },
  {
    title: "How to Streamline Operations in a Small Rural Business",
    excerpt:
      "Running a small rural business means wearing many hats. Streamlining your operations is about doing things smarter so you have more time for what matters.",
    category: "Guide",
    date: "February 2026",
    readTime: "6 min read",
    slug: "/resources/streamline-operations-rural-business",
  },
  {
    title: "Common Inefficiencies in Rural Businesses (and How to Fix Them)",
    excerpt:
      "Every business has inefficiencies. But in rural businesses where teams are small and resources are tight, those inefficiencies hit harder. Here is how to fix them.",
    category: "Insight",
    date: "February 2026",
    readTime: "5 min read",
    slug: "/resources/common-inefficiencies-rural-businesses",
  },
  {
    title: "How to Reduce Operational Costs in Small Town Companies",
    excerpt:
      "Cutting costs does not mean cutting corners. There are practical ways to reduce what you spend on operations while improving the quality of your work.",
    category: "Insight",
    date: "January 2026",
    readTime: "5 min read",
    slug: "/resources/reduce-operational-costs",
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
            <motion.a
              key={a.title}
              href={a.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-lg bg-card border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
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
            </motion.a>
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
