import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

const news = [
  {
    date: "November 13, 2025",
    title: "Recap: Small Towns, Big Ideas 2025 Pitch Event",
    desc: "Rural founders pitch their ideas at the 5th annual Small Towns, Big Ideas pitch event, showcasing innovation from across America.",
    category: "Event",
  },
  {
    date: "November 3, 2025",
    title: "Bridging the Divide: A Tech-Based Economic Development Model for Rural America",
    desc: "New report explores how technology-driven strategies can close the economic gap between rural and urban communities.",
    category: "Report",
  },
  {
    date: "October 16, 2025",
    title: "Built For Place: The Impact of Rural Incubators",
    desc: "What rural incubators reveal about community innovation, connection, and opportunity in small-town America.",
    category: "Research",
  },
];

const NewsSection = () => (
  <section id="news" className="py-24 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-accent font-medium text-sm uppercase tracking-widest">Latest News</span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-3">
          Collaborating with Rural Leaders
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {news.map((n, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow bg-card"
          >
            <div className="bg-primary/5 p-8 flex items-center justify-center">
              <Newspaper className="text-accent" size={48} />
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">{n.category}</span>
                <span className="text-xs text-muted-foreground">{n.date}</span>
              </div>
              <h3 className="font-heading text-base font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
                {n.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{n.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default NewsSection;
