import { Instagram, Linkedin } from "lucide-react";
import sbcLogo from "@/assets/sbc-logo.png";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/simplifysbc",
    Icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/simplify.sbc/",
    Icon: Instagram,
  },
];

const Footer = () => (
  <>
    <section aria-labelledby="follow-us-heading" className="py-10 bg-secondary">
      <div className="container flex flex-col items-center gap-4 text-center">
        <h2 id="follow-us-heading" className="font-heading text-2xl font-semibold text-foreground">
          Follow us
        </h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Stay connected for tips, updates, and stories from rural businesses we serve.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${name}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-foreground border border-border transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </section>

    <footer className="py-12 bg-foreground text-primary-foreground/60">
      <div className="container">
        <p className="text-center text-sm italic text-primary-foreground/40 mb-6">Simplifying Business, Empowering Communities</p>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="/" className="flex items-center gap-2">
            <img src={sbcLogo} alt="Simplify Business Consultancy" width={44} height={44} className="h-11 w-auto brightness-0 invert" />
            <span className="font-heading text-lg font-bold text-primary-foreground">Simplify Business Consultancy</span>
          </a>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/#services" className="hover:text-primary-foreground transition-colors">Services</a>
            <a href="/about" className="hover:text-primary-foreground transition-colors">About</a>
            <a href="/resources" className="hover:text-primary-foreground transition-colors">Resources</a>
            <a href="/#packages" className="hover:text-primary-foreground transition-colors">Packages</a>
            <a href="/#contact" className="hover:text-primary-foreground transition-colors">Contact</a>
            <a href="/#careers" className="hover:text-primary-foreground transition-colors">Careers</a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-3">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${name}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/70 transition-all duration-200 hover:text-accent hover:border-accent hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="text-xs">© 2026 Simplify Business Consultancy. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
