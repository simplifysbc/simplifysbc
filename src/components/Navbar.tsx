import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import sbcLogo from "@/assets/sbc-logo.png";

const serviceLinks = [
  { label: "Automation for Small Rural Businesses", href: "/services/automation" },
  { label: "Business Process Optimization", href: "/services/optimization" },
  { label: "Digital Transformation", href: "/services/digital-transformation" },
  { label: "Workflow Automation Consulting", href: "/services/workflow-consulting" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2">
          <img src={sbcLogo} alt="Simplify Business Consultancy" width={44} height={44} className="h-11 w-auto" />
          <span className="font-heading text-lg font-bold text-primary tracking-tight hidden sm:inline">Simplify Business Consultancy</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Services <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-background border border-border rounded-lg shadow-lg py-2 w-72">
                  {serviceLinks.map((s) => (
                    <a key={s.href} href={s.href} className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="/resources" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Resources</a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          <Button size="sm">Get Started</Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Services</span>
            {serviceLinks.map((s) => (
              <a key={s.href} href={s.href} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground pl-2">
                {s.label}
              </a>
            ))}
          </div>
          <a href="#about" onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">About</a>
          <a href="/resources" onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">Resources</a>
          <a href="#contact" onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">Contact</a>
          <Button size="sm" className="w-full">Get Started</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
