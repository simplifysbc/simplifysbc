import logo from "@/assets/sbc-logo.png";

const Footer = () => (
  <footer className="py-12 bg-foreground">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img src={logo} alt="SBC" className="h-8 w-8" />
            <span className="font-heading text-lg font-bold text-primary-foreground">SBC</span>
          </div>
          <p className="text-primary-foreground/50 text-sm max-w-xs">
            Simplifying Business, Empowering Communities. Driving rural America into the modern tech landscape.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-primary-foreground text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["About", "Our Work", "CSR", "Resources", "News", "Contact Us"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="text-primary-foreground/50 text-sm hover:text-primary-foreground transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-primary-foreground text-sm font-semibold uppercase tracking-wider">Connect</h4>
          <p className="text-primary-foreground/50 text-sm">
            Have questions? Reach out to our team.
          </p>
          <a href="https://simplifybusinessconsultancy.com/about/contact-us/" className="text-accent text-sm hover:underline">
            Contact Us →
          </a>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center">
        <p className="text-primary-foreground/40 text-xs">© 2025 Simplify Business Consultancy. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
