import sbcLogo from "@/assets/sbc-logo.png";
import { ShieldCheck, Award, Headphones } from "lucide-react";

const Footer = () => (
  <>
    {/* Pre-footer CTA */}
    <section className="w-full py-16 px-6 md:px-12 border-t border-border text-center bg-background">
      <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-foreground">
        Ready to Grow Your Business with Confidence?
      </h2>
      <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
        Get expert guidance tailored to your business goals.
      </p>
      <a
        href="/#contact"
        className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition hover:opacity-90 bg-primary text-primary-foreground"
      >
        Request a Free Consultation
      </a>
    </section>

    <footer className="py-12 bg-foreground text-primary-foreground/60">
      <div className="container">
        <p className="text-center text-sm italic text-primary-foreground/40 mb-6">Simplifying Business, Empowering Communities</p>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="/" className="flex items-center gap-2">
            <img src={sbcLogo} alt="Simplify Business Consultancy" width={44} height={44} className="h-11 w-auto brightness-0 invert" />
            <span className="font-heading text-lg font-bold text-primary-foreground">Simplify Business Consultancy</span>
          </a>
          <div className="flex flex-wrap gap-8 text-sm">
            <a href="/#services" className="hover:text-primary-foreground transition-colors">Services</a>
            <a href="/about" className="hover:text-primary-foreground transition-colors">About</a>
            <a href="/resources" className="hover:text-primary-foreground transition-colors">Resources</a>
            <a href="/#packages" className="hover:text-primary-foreground transition-colors">Packages</a>
            <a href="/#contact" className="hover:text-primary-foreground transition-colors">Contact</a>
            <a href="/#careers" className="hover:text-primary-foreground transition-colors">Careers</a>
          </div>
          <p className="text-xs">© 2026 Simplify Business Consultancy. All rights reserved.</p>
        </div>

        {/* Trust strip */}
        <div className="py-10 px-6 md:px-12 border-t border-primary-foreground/10 mt-8">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <ShieldCheck className="text-accent" size={28} />
              <h3 className="text-primary-foreground font-semibold text-base">Secure Payments</h3>
              <p className="text-sm">Encrypted transactions via SSL</p>
            </div>
            <div className="flex flex-col gap-2 items-center md:items-start">
              <Award className="text-accent" size={28} />
              <h3 className="text-primary-foreground font-semibold text-base">Proven Expertise</h3>
              <p className="text-sm">Trusted consulting for business growth</p>
            </div>
            <div className="flex flex-col gap-2 items-center md:items-start">
              <Headphones className="text-accent" size={28} />
              <h3 className="text-primary-foreground font-semibold text-base">Dedicated Support</h3>
              <p className="text-sm">Responsive and reliable assistance</p>
            </div>
          </div>
        </div>

        {/* Payment section */}
        <div className="mt-8 text-center">
          <p className="text-sm font-medium mb-1 text-primary-foreground">Pay Safely With Us</p>
          <p className="text-xs text-primary-foreground/50 mb-4">
            Payments are encrypted and securely transmitted over SSL.
          </p>
          <div className="flex justify-center gap-5 items-center opacity-80 flex-wrap">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 grayscale hover:grayscale-0 transition duration-300 brightness-0 invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 grayscale hover:grayscale-0 transition duration-300" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 grayscale hover:grayscale-0 transition duration-300 brightness-0 invert" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-6 grayscale hover:grayscale-0 transition duration-300" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Discover_Card_logo.svg" alt="Discover" className="h-6 grayscale hover:grayscale-0 transition duration-300" />
          </div>
        </div>

        {/* Micro-conversion block */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center md:text-left">
          <p className="text-sm text-primary-foreground/60 mb-3">Need help choosing the right service?</p>
          <a
            href="/#contact"
            className="text-sm font-medium underline hover:opacity-80 text-primary-foreground"
          >
            Request a Free Consultation
          </a>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
