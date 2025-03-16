import HeroSection from "@/containers/home/hero-section";
import { HomeHeader } from "@/components/layouts/headers/home-headers";
import LogoCloudSection from "@/containers/home/logo-cloud-section";
import FeaturesSection from "@/containers/home/features-section";
import FooterSection from "@/components/layouts/footers/footer";
import StatsSection from "@/containers/home/stats-section";
import CanvasCursor from "@/components/canvas-cursor";
import { StepsSection } from "@/containers/home/steps-section";
import FaqsSection from "@/containers/home/faqs-section";
import TestimonialsSection from "@/containers/home/testimonials-section";

export default function Home() {
  return (
    <>
    <CanvasCursor />
      <HomeHeader />
      <HeroSection />
      <LogoCloudSection />
      <StatsSection/>
      <FeaturesSection />
      <StepsSection />
      <FaqsSection />
      <TestimonialsSection />
      <FooterSection />
    </>
  );
}
