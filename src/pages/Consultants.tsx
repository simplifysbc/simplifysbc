import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { consultants } from "@/data/consultants";
import { CalendarClock, CheckCircle2, Users } from "lucide-react";

const Consultants = () => {
  return (
    <>
      <SEO
        title="Meet Our Consultants"
        description="Get to know the Simplify Business Consultancy team: what each consultant focuses on, when they are available, and the results they have delivered for small and rural businesses."
        canonical="/consultants"
      />
      <Navbar />
      <main className="min-h-screen bg-muted/30 pt-28 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-accent text-sm font-medium">
              <Users size={18} /> Our team
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mt-3">Meet our consultants</h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Every booking is with a real person. Read what each consultant works on, check when they are free, and
              book the one who fits your business best.
            </p>
          </header>

          <div className="space-y-8">
            {consultants.map((c) => (
              <article
                key={c.slug}
                id={c.slug}
                className="bg-card border border-border rounded-xl p-6 md:p-8 scroll-mt-28"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <img
                    src={c.photo}
                    alt={`${c.name}, ${c.role} at Simplify Business Consultancy`}
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="w-28 h-28 rounded-full object-cover border border-border shrink-0"
                  />
                  <div className="flex-1">
                    <h2 className="font-heading text-2xl font-bold">{c.name}</h2>
                    <p className="text-accent font-medium">{c.role}</p>
                    <p className="text-muted-foreground mt-3">{c.bio}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {c.focus.map((f) => (
                        <span key={f} className="text-xs px-3 py-1 rounded-full bg-muted text-foreground/80">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="font-heading font-semibold flex items-center gap-2">
                      <CalendarClock size={18} className="text-accent" /> Availability
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {c.availability.map((a) => (
                        <li key={a.day} className="flex justify-between text-sm border-b border-border/60 pb-2">
                          <span className="text-foreground/80">{a.day}</span>
                          <span className="text-muted-foreground">{a.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-accent" /> Past projects
                    </h3>
                    <ul className="mt-3 space-y-3">
                      {c.projects.map((p) => (
                        <li key={p.title} className="text-sm">
                          <span className="font-medium">{p.title}</span>
                          <span className="block text-muted-foreground">{p.result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to={`/booking?consultant=${encodeURIComponent(c.role)}`}>Book with {c.name.split(" ")[0]}</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-10">
            Not sure who to pick?{" "}
            <Link to="/booking" className="text-accent underline underline-offset-4">
              Book with any available consultant
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Consultants;
