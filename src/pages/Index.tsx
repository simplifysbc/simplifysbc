import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import OurWorkSection from "@/components/OurWorkSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import ImpactSection from "@/components/ImpactSection";
import ValuesSection from "@/components/ValuesSection";
import GoalsSection from "@/components/GoalsSection";
import NewsSection from "@/components/NewsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <MissionSection />
    <OurWorkSection />
    <HowWeWorkSection />
    <ImpactSection />
    <ValuesSection />
    <GoalsSection />
    <NewsSection />
    <CtaSection />
    <Footer />
  </div>
);

export default Index;
