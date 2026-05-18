import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const posts = [
  {
    title: "Why Rural Businesses and SMB Farms Need Operational Automation in 2026",
    excerpt:
      "Rural business automation in 2026: how SMB farms and small operators cut downtime, gain visibility, and boost ROI with workflow automation.",
    date: "May 22, 2026",
    readTime: "10 min read",
    slug: "rural-business-automation-2026",
  },
  {
    title: "How Smart Irrigation Automation Is Transforming Small and Mid-Sized Farms in the USA",
    excerpt:
      "Smart irrigation and agtech automation are helping small and mid-sized USA farms cut water waste, lower labor costs, and run fields remotely.",
    date: "May 15, 2026",
    readTime: "9 min read",
    slug: "smart-irrigation-automation-usa-farms",
  },
  {
    title: "Why Rural Businesses Lose Hours to Manual Paperwork (and How to Fix It)",
    excerpt:
      "Paperwork is silently draining time from small town businesses. Here is a simple weekly habit to cut hours of admin work and free your team for real work.",
    date: "May 8, 2026",
    readTime: "5 min read",
    slug: "manual-paperwork-fix",
  },
  {
    title: "Automating Customer Follow Ups for Small Town Service Businesses",
    excerpt:
      "Follow ups close more deals than cold leads. Learn how a simple automated follow up system can lift repeat business in your community.",
    date: "May 1, 2026",
    readTime: "6 min read",
    slug: "customer-follow-ups",
  },
  {
    title: "Three Process Wins We Delivered for a Family Run Hardware Store",
    excerpt:
      "Real story from the field. We helped a hardware store cut inventory checks from 4 hours to 30 minutes a week using affordable tools.",
    date: "April 24, 2026",
    readTime: "7 min read",
    slug: "hardware-store-process-wins",
  },
  {
    title: "Cloud Tools That Actually Work With Slow Rural Internet",
    excerpt:
      "Spotty internet does not have to block your automation goals. Here are the tools we trust when bandwidth is limited.",
    date: "April 17, 2026",
    readTime: "5 min read",
    slug: "cloud-tools-slow-internet",
  },
  {
    title: "How to Map Your Business Process in One Afternoon",
    excerpt:
      "You cannot improve what you cannot see. This simple mapping exercise reveals the bottlenecks costing you time and money.",
    date: "April 10, 2026",
    readTime: "6 min read",
    slug: "map-your-process",
  },
  {
    title: "Five Signs Your Rural Business Is Ready for Automation",
    excerpt:
      "Not sure if automation is right for you? These five signs tell you it is time to take a serious look.",
    date: "April 3, 2026",
    readTime: "4 min read",
    slug: "ready-for-automation",
  },
];

const Blog = () => (
  <div className="min-h-screen">
    <SEO
      title="Blog – Weekly Tips on Automation & Process Improvement"
      description="Fresh weekly posts on process improvements and automation for rural and small town businesses across the USA. Practical, plain English advice."
      canonical="/blog"
    />
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
            Blog
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Weekly Posts on Automation and Process Improvement
          </h1>
          <p className="text-muted-foreground text-lg">
            Practical tips, real stories, and step by step guides for rural
            businesses ready to work smarter. New post every week.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="pb-16 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-lg bg-card border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <Link to={`/blog/${p.slug}`} className="p-6 flex flex-col flex-1">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {p.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {p.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {p.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {p.readTime}
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                  Read post <ArrowRight size={14} />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-primary text-center">
      <div className="container max-w-2xl space-y-6">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground">
          Ready to Simplify Your Business?
        </h2>
        <p className="text-primary-foreground/80">
          Book a free call and we will show you exactly where automation can
          save you time and grow revenue.
        </p>
        <a href="/#contact">
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
          >
            Book Your Free Call <ArrowRight size={18} />
          </Button>
        </a>
      </div>
    </section>

    <Footer />
  </div>
);

export default Blog;
