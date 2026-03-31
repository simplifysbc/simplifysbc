import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Home, BookOpen, Briefcase, Info, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const links = [
  { href: "/", label: "Home", desc: "Back to the homepage", icon: Home },
  { href: "/about", label: "About Us", desc: "Learn our story", icon: Info },
  { href: "/resources", label: "Resources", desc: "Guides and case studies", icon: BookOpen },
  { href: "/services/automation", label: "Services", desc: "See how we help", icon: Briefcase },
  { href: "/#contact", label: "Contact", desc: "Get in touch", icon: MessageSquare },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist. Browse our services, resources, and guides for rural business automation and process improvement."
        canonical="/404"
      />
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-28 bg-background">
        <div className="container max-w-2xl text-center space-y-8">
          <div className="space-y-3">
            <span className="text-7xl md:text-9xl font-heading font-bold text-accent/20">404</span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Page Not Found
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Here are some helpful links to get you back on track.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-start gap-4 p-5 rounded-lg bg-card border border-border hover:border-accent/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <link.icon className="text-accent" size={20} />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground group-hover:text-accent transition-colors">{link.label}</p>
                  <p className="text-muted-foreground text-sm">{link.desc}</p>
                </div>
              </a>
            ))}
          </div>

          <a href="/">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 mt-4">
              Go to Homepage <ArrowRight size={18} />
            </Button>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
