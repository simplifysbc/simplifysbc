import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is automation for small businesses?",
    answer:
      "Automation for small businesses means using simple digital tools to handle repetitive tasks like invoicing, scheduling, data entry, and customer follow ups. Instead of doing these things manually every day, the software takes care of them for you. This saves time, reduces errors, and lets you focus on growing your business.",
  },
  {
    question: "How can rural businesses use AI?",
    answer:
      "Rural businesses can use AI in many practical ways. AI chatbots can answer customer questions around the clock. AI tools can predict inventory needs based on past sales. AI writing assistants can help create marketing content. AI accounting tools can categorize expenses and flag issues automatically. You do not need technical skills to get started with most of these tools.",
  },
  {
    question: "Is automation expensive for small companies?",
    answer:
      "Not at all. Many automation tools offer free plans or very affordable monthly subscriptions starting at $10 to $30 per month. Tools like Zapier, Wave Accounting, Trello, and HubSpot CRM all have free tiers. The money you save in time and reduced errors usually pays for the tools many times over within the first month.",
  },
  {
    question: "What processes should a small business automate first?",
    answer:
      "Start with the tasks you do most often that follow a predictable pattern. The best candidates are invoicing and billing, appointment scheduling, email follow ups with customers, inventory tracking, and basic report generation. Pick one, automate it, measure the time saved, and then move on to the next.",
  },
  {
    question: "How long does it take to see results from automation?",
    answer:
      "Most businesses see measurable time savings within the first two weeks of implementing automation. Cost reductions typically become visible within 30 to 90 days. Our clients report saving an average of 15 to 20 hours per week after their core processes are automated.",
  },
  {
    question: "Do I need technical skills to automate my business?",
    answer:
      "No. Most modern automation tools are designed for people without a technical background. They use simple visual interfaces where you can set up workflows by clicking and selecting options. And if you work with us, we handle all the setup and training so you can focus on running your business.",
  },
  {
    question: "Will automation replace my employees?",
    answer:
      "Automation is not about replacing people. It is about freeing your team from repetitive, low value tasks so they can focus on work that requires human judgment, creativity, and relationship building. Most of our clients find that automation makes their existing team more productive and more satisfied with their work.",
  },
  {
    question: "What if my internet connection is unreliable?",
    answer:
      "We understand that many rural areas have inconsistent internet access. That is why we recommend tools that work offline or sync data when a connection becomes available. Your business operations keep running smoothly even when the internet does not. We have helped businesses in some of the most remote areas of the country set up reliable digital systems.",
  },
  {
    question: "How is Simplify Business Consultancy different from other consultants?",
    answer:
      "We focus exclusively on small and rural businesses. We do not push expensive enterprise software or overcomplicate things. We listen to how your business works, fix what is broken, and set up simple tools that make a real difference. Our approach is practical, hands on, and designed for businesses that need results without the complexity.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free call with our team. We will ask you a few questions about your business, learn about your biggest challenges, and show you exactly where you can save time and money. There is no pressure and no obligation. We just want to help you see what is possible.",
  },
];

const FaqSection = () => (
  <section className="py-20 bg-background" id="faq">
    <div className="container max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <HelpCircle className="text-accent" size={22} />
          <span className="text-accent font-medium text-sm uppercase tracking-widest">
            FAQ
          </span>
        </div>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground mt-4">
          Answers to the most common questions about automation, AI, and how we help small businesses.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-lg px-6 data-[state=open]:border-accent/40 transition-colors"
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FaqSection;
