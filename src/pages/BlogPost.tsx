import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ShareBar from "@/components/ShareBar";
import NotFound from "./NotFound";

import imgPaperwork from "@/assets/blog/manual-paperwork-fix.jpg?w=1280&format=webp";
import imgPaperworkSet from "@/assets/blog/manual-paperwork-fix.jpg?w=480;800;1280&format=webp&as=srcset";
import imgFollowUps from "@/assets/blog/customer-follow-ups.jpg?w=1280&format=webp";
import imgFollowUpsSet from "@/assets/blog/customer-follow-ups.jpg?w=480;800;1280&format=webp&as=srcset";
import imgHardware from "@/assets/blog/hardware-store-process-wins.jpg?w=1280&format=webp";
import imgHardwareSet from "@/assets/blog/hardware-store-process-wins.jpg?w=480;800;1280&format=webp&as=srcset";
import imgCloud from "@/assets/blog/cloud-tools-slow-internet.jpg?w=1280&format=webp";
import imgCloudSet from "@/assets/blog/cloud-tools-slow-internet.jpg?w=480;800;1280&format=webp&as=srcset";
import imgMap from "@/assets/blog/map-your-process.jpg?w=1280&format=webp";
import imgMapSet from "@/assets/blog/map-your-process.jpg?w=480;800;1280&format=webp&as=srcset";
import imgReady from "@/assets/blog/ready-for-automation.jpg?w=1280&format=webp";
import imgReadySet from "@/assets/blog/ready-for-automation.jpg?w=480;800;1280&format=webp&as=srcset";

type Section = { heading?: string; body: string };
type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  image: string;
  imageSrcSet: string;
  imageAlt: string;
  intro: string;
  sections: Section[];
  closing: string;
};

const POSTS: Post[] = [
  {
    slug: "manual-paperwork-fix",
    title: "Why Rural Businesses Lose Hours to Manual Paperwork (and How to Fix It)",
    description:
      "A simple weekly habit to cut hours of admin work in your rural business and free your team for real work.",
    date: "May 8, 2026",
    publishedDate: "2026-05-08",
    readTime: "5 min read",
    image: imgPaperwork,
    imageAlt: "Stacks of paper invoices and a vintage calculator on a wooden desk in a small rural office",
    tags: ["paperwork", "admin", "small business", "rural business"],
    intro:
      "Most small town businesses we visit are losing four to ten hours every week to paperwork that nobody really reads. Invoices get re-typed. Job sheets get re-entered. Receipts get filed twice. The work feels normal because it has always been done that way.",
    sections: [
      {
        heading: "Where the hours actually go",
        body:
          "Track your team for one week. Mark every time someone copies the same number from one place to another. You will be surprised. The pattern is almost always the same: a paper form, a spreadsheet, an accounting tool, and an email confirmation. That is the same data entered four times.",
      },
      {
        heading: "The fifteen minute weekly fix",
        body:
          "Pick the one paper form you fill out the most. Replace it with a simple online form (Google Forms or Jotform both have free plans). Send the answers straight into a spreadsheet. That single change can save two hours a week with no extra cost.",
      },
      {
        heading: "Why it sticks",
        body:
          "Big software rollouts fail in small businesses because the team has no time to learn them. Tiny changes stick because they fit into your day. Replace one form a month and in a year you will have a paperless back office.",
      },
    ],
    closing:
      "If you want help finding the biggest paperwork drain in your business, we offer a free 30 minute call. We will look at your real workflow, no slides, no jargon.",
  },
  {
    slug: "customer-follow-ups",
    title: "Automating Customer Follow Ups for Small Town Service Businesses",
    description:
      "How a simple automated follow up system can lift repeat business for service businesses in small towns.",
    date: "May 1, 2026",
    publishedDate: "2026-05-01",
    readTime: "6 min read",
    image: imgFollowUps,
    imageAlt: "Friendly small town service worker waving goodbye to a customer with a smartphone in hand",
    tags: ["customer follow up", "CRM", "service business", "automation"],
    intro:
      "Most service jobs end the same way. The customer pays, you say thanks, and you both move on. Six months later they need the same service and call somebody else because your name slipped their mind.",
    sections: [
      {
        heading: "The cost of silence",
        body:
          "Returning customers cost almost nothing to win back. New ones cost money in ads, time, and effort. If half your past customers came back once a year your revenue would jump without a single new lead.",
      },
      {
        heading: "A three message follow up that works",
        body:
          "Send a thank you the day after the job. Send a short check in two weeks later asking if everything is still working. Send a friendly reminder six months later with a clear next step. Three messages, one customer, no awkward sales pitch.",
      },
      {
        heading: "Tools that fit a small town budget",
        body:
          "HubSpot CRM is free and handles all three messages. Mailchimp works if you only need email. For one person shops a simple Google Sheet plus a calendar reminder is enough to start.",
      },
    ],
    closing:
      "Want us to set up your first follow up sequence with you? Book a free call and we will walk through your customer list together.",
  },
  {
    slug: "hardware-store-process-wins",
    title: "Three Process Wins We Delivered for a Family Run Hardware Store",
    description:
      "Real story from a family run hardware store. Three small process changes that saved hours every week.",
    date: "April 24, 2026",
    publishedDate: "2026-04-24",
    readTime: "7 min read",
    image: imgHardware,
    imageAlt: "Family run rural hardware store interior with wooden shelves of tools and paint cans",
    tags: ["case study", "hardware store", "process improvement", "rural business"],
    intro:
      "A family hardware store in a town of 4,000 people asked us for help. They were busy, profitable, and exhausted. The owners worked twelve hour days, six days a week. Here is what changed in 90 days.",
    sections: [
      {
        heading: "Win one: inventory checks dropped from four hours to thirty minutes",
        body:
          "We swapped a clipboard for a free barcode scanner app on an old phone. The shelves got barcoded once. After that the weekly stock check became a quick walk through with the phone. The numbers landed straight in a spreadsheet.",
      },
      {
        heading: "Win two: contractor accounts moved off paper",
        body:
          "Their best customers (local contractors) had paper accounts that took a full afternoon every month to total up. We moved the accounts into Wave, which is free. Contractors now get clean invoices by email and the owners no longer fight with a calculator on Sundays.",
      },
      {
        heading: "Win three: a Saturday rest day",
        body:
          "Time saved from the first two wins gave the owners enough breathing room to close at noon on Saturdays. Sales did not drop. The team came back fresher on Monday. The owners got their weekends back.",
      },
    ],
    closing:
      "If you run a family business and feel stuck in the daily grind, the answer is rarely a bigger team. It is usually a few small process changes. We can help you find them.",
  },
  {
    slug: "cloud-tools-slow-internet",
    title: "Cloud Tools That Actually Work With Slow Rural Internet",
    description:
      "Cloud tools that keep working when your rural internet does not. Built for small towns with limited bandwidth.",
    date: "April 17, 2026",
    publishedDate: "2026-04-17",
    readTime: "5 min read",
    image: imgCloud,
    imageAlt: "Laptop on a farmhouse table with a barn and rural fields visible through the window",
    tags: ["cloud tools", "rural internet", "offline mode", "small business software"],
    intro:
      "Rural internet is a real thing. Speeds drop, connections cut out, and big software updates can take a full day. The good news is plenty of cloud tools are built to work even when your bars are low.",
    sections: [
      {
        heading: "Look for offline mode",
        body:
          "Google Docs, Sheets, and Gmail all keep working without internet if you turn on offline access. Your changes save locally and sync the next time you are online. This single setting saves a lot of frustration.",
      },
      {
        heading: "Pick lightweight tools",
        body:
          "Notion, Wave, and HubSpot CRM all load quickly even on slow connections. Avoid heavy video based tools when you can. A clear written checklist beats a 200 megabyte training video every time.",
      },
      {
        heading: "Use mobile data as a backup",
        body:
          "A cheap second SIM and a small mobile hotspot can keep your business running through outages. Pair it with the right tools and you will rarely lose a sale to a dropped connection.",
      },
    ],
    closing:
      "Bandwidth should not block your automation goals. We help rural businesses pick the tools that keep working when the internet does not.",
  },
  {
    slug: "map-your-process",
    title: "How to Map Your Business Process in One Afternoon",
    description:
      "A simple afternoon exercise to map your business process and uncover the bottlenecks costing you time.",
    date: "April 10, 2026",
    publishedDate: "2026-04-10",
    readTime: "6 min read",
    image: imgMap,
    imageAlt: "Wall covered in colorful sticky notes and arrows mapping a business workflow",
    tags: ["process mapping", "small business", "operations", "automation"],
    intro:
      "You cannot improve what you cannot see. A simple process map shows every step a job takes from the first phone call to the final invoice. Most owners discover three or four wasted steps in the first hour.",
    sections: [
      {
        heading: "Step one: pick one job",
        body:
          "Do not try to map the whole business. Pick the single most common job you do. For a plumber that might be a service call. For a baker it might be a wholesale order. One clear example is enough.",
      },
      {
        heading: "Step two: list every touch point",
        body:
          "Write down every step from start to finish on sticky notes. One step per note. Include the boring parts: the phone rings, the order goes in the diary, the invoice gets printed. The boring parts are usually where time is lost.",
      },
      {
        heading: "Step three: mark the pain",
        body:
          "Put a red dot on every step that is slow, repeated, or annoying. The red dots are your automation targets. You will usually find two or three obvious wins before dinner.",
      },
    ],
    closing:
      "If you want a second pair of eyes on your process map, we offer a free 30 minute review call. No slides, just a real look at your work.",
  },
  {
    slug: "ready-for-automation",
    title: "Five Signs Your Rural Business Is Ready for Automation",
    description:
      "Five clear signs your rural business is ready to automate, and what to do next when you see them.",
    date: "April 3, 2026",
    publishedDate: "2026-04-03",
    readTime: "4 min read",
    image: imgReady,
    imageAlt: "Rural small business owner in a flannel shirt looking thoughtfully at a tablet in a workshop",
    tags: ["automation", "rural business", "readiness", "small business"],
    intro:
      "Automation is not just for big companies. The trick is knowing when your business is ready. Here are five honest signs we look for before we recommend it.",
    sections: [
      {
        heading: "1. You enter the same data twice",
        body:
          "If a job takes the same number from one place to another more than once, you are ready. This is the cheapest, easiest win in any small business.",
      },
      {
        heading: "2. You miss follow ups",
        body:
          "If quotes, callbacks, or service reminders slip through the cracks, a simple automated reminder system pays for itself in weeks.",
      },
      {
        heading: "3. You work weekends on admin",
        body:
          "Saturday paperwork is a sign the weekly process is broken. A few hours of setup can give you most of those weekends back.",
      },
      {
        heading: "4. You cannot answer simple questions about your business",
        body:
          "How many jobs did you do last month? What is your repeat customer rate? If the answers take more than a minute to find, your data is too scattered.",
      },
      {
        heading: "5. You are growing and feeling stretched",
        body:
          "Growth that hurts is usually a sign that the process built for two people is now being asked to handle five. Automate before you hire and you will hire smarter.",
      },
    ],
    closing:
      "If three or more of these signs feel true for you, automation is a smart next step. Book a free call and we will help you pick the right place to start.",
  },
];

export const blogPosts = POSTS;

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  const url = `/blog/${post.slug}`;

  return (
    <div className="min-h-screen">
      <SEO
        title={`${post.title} | Simplify Business Consultancy Blog`}
        description={post.description}
        canonical={url}
        type="article"
        article={{
          author: "Simplify Business Consultancy",
          publishedDate: post.publishedDate,
          section: "Blog",
          tags: post.tags,
        }}
      />
      <Navbar />

      <article className="pt-28 pb-16 bg-background">
        <div className="container max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-accent text-sm mb-8 hover:underline"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} /> {post.readTime}
              </span>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>

            <div className="rounded-lg overflow-hidden border border-border mb-6 aspect-[16/9] bg-muted">
              <img
                src={post.image}
                alt={post.imageAlt}
                width={1280}
                height={720}
                className="w-full h-full object-cover"
              />
            </div>

            <ShareBar title={post.title} url={url} />

            <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
              <p>{post.intro}</p>

              {post.sections.map((s, i) => (
                <div key={i}>
                  {s.heading && (
                    <h2 className="font-heading text-2xl font-bold text-foreground mt-10">
                      {s.heading}
                    </h2>
                  )}
                  <p>{s.body}</p>
                </div>
              ))}

              <p className="mt-10">{post.closing}</p>
            </div>
          </motion.div>
        </div>
      </article>

      <section className="py-16 bg-primary text-center">
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
};

export default BlogPost;
