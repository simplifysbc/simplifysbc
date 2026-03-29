import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

const ArticleStreamlineOperations = () => (
  <div className="min-h-screen">
    <Navbar />

    <article className="pt-28 pb-16 bg-background">
      <div className="container max-w-3xl">
        <a href="/resources" className="inline-flex items-center gap-2 text-accent text-sm mb-8 hover:underline">
          <ArrowLeft size={16} /> Back to Resources
        </a>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              <Tag size={12} className="inline mr-1" />Guide
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar size={12} /> February 2026</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={12} /> 6 min read</span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
            How to Streamline Operations in a Small Rural Business
          </h1>

          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
            <p>
              Running a small rural business often means wearing many hats. You handle sales, operations, customer service, and bookkeeping all at once. Streamlining your operations is not about doing less. It is about doing things in a smarter way so you have more time for what matters.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">Step 1: Map Out Your Current Processes</h2>
            <p>
              Before you can improve anything, you need to see it clearly. Write down every step involved in your most important tasks, from taking an order to delivering a product or service. Most business owners are surprised by how many unnecessary steps they find.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">Step 2: Identify Bottlenecks</h2>
            <p>
              Look for the points where things slow down or get stuck. Common bottlenecks include manual data entry, waiting for approvals, searching for information across multiple systems, and duplicating work that has already been done.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">Step 3: Eliminate Unnecessary Steps</h2>
            <p>
              Not every step in a process adds value. Some are leftovers from how things were done years ago. Remove anything that does not directly contribute to the end result. This alone can save hours every week.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">Step 4: Standardize What Works</h2>
            <p>
              Create simple checklists and templates for recurring tasks. When everyone follows the same process, there are fewer mistakes and less time spent figuring out what to do next. Standardization also makes it easier to train new team members.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">Step 5: Automate Repetitive Tasks</h2>
            <p>
              Once your processes are clean and standardized, look for tasks that happen on a schedule or follow a pattern. These are perfect candidates for automation. Invoicing, appointment reminders, inventory updates, and report generation can all be automated with simple tools.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">Real Results</h2>
            <p>
              A family owned landscaping company in rural Georgia followed these steps and cut their administrative time by 60 percent. They went from spending three hours a day on paperwork to less than one hour. The owner now spends that extra time on site with clients, which has led to a 25 percent increase in referrals.
            </p>

            <h2 className="font-heading text-2xl font-bold text-foreground mt-10">Start Today</h2>
            <p>
              You do not need to hire a consultant or buy expensive software to start streamlining. Pick your most time consuming process, map it out, and look for steps you can cut or automate. Small changes add up to big results.
            </p>
          </div>
        </motion.div>
      </div>
    </article>

    <Testimonials />

    <section className="py-16 bg-primary text-center">
      <div className="container max-w-2xl space-y-6">
        <h2 className="font-heading text-3xl font-bold text-primary-foreground">Need Help Streamlining Your Operations?</h2>
        <p className="text-primary-foreground/80">We walk you through the entire process and set up systems that save you time every day.</p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Book Your Free Call</Button>
      </div>
    </section>

    <Footer />
  </div>
);

export default ArticleStreamlineOperations;
