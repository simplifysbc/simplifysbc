import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import Testimonials from "@/components/Testimonials";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <ServicesSection />
    <WhyUsSection />
    <Testimonials />
    <FaqSection />
    <CtaSection />
    <Footer />
    <ChatBot />
  </div>
);

export default Index;
