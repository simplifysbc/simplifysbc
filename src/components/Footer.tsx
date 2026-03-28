import sbcLogo from "@/assets/sbc-logo.png";

const Footer = () => (
  <footer className="py-12 bg-foreground text-primary-foreground/60">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-2">
          <img src={sbcLogo} alt="Simplify Business Consultancy" width={44} height={44} className="h-11 w-auto brightness-0 invert" />
          <span className="font-heading text-lg font-bold text-primary-foreground">Simplify Business Consultancy</span>
        </a>
        <div className="flex gap-8 text-sm">
          <a href="#services" className="hover:text-primary-foreground transition-colors">Services</a>
          <a href="#about" className="hover:text-primary-foreground transition-colors">About</a>
          <a href="/resources" className="hover:text-primary-foreground transition-colors">Resources</a>
          <a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a>
          <a href="#" className="hover:text-primary-foreground transition-colors">Privacy</a>
        </div>
        <p className="text-xs">© 2026 Simplify Business Consultancy. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
