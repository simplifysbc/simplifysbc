const Footer = () => (
  <footer className="py-12 bg-foreground text-primary-foreground/60">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-heading text-lg font-bold text-primary-foreground">
          Simplify<span className="text-accent">.</span>
        </div>
        <div className="flex gap-8 text-sm">
          {["Services", "About", "Contact", "Privacy"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-primary-foreground transition-colors">
              {item}
            </a>
          ))}
        </div>
        <p className="text-xs"><p className="text-xs">© 2026 Simplify Business Consultancy. All rights reserved.</p></p>
      </div>
    </div>
  </footer>
);

export default Footer;
