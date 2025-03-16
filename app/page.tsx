import HeroSection from "@/containers/home/hero-section";
import { HomeHeader } from "@/components/layouts/headers/home-headers";
import LogoCloudSection from "@/containers/home/logo-cloud-section";
import FeaturesSection from "@/containers/home/features-section";
import FooterSection from "@/components/layouts/footers/footer";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <HeroSection />
      <LogoCloudSection />
      <FeaturesSection />
      <FooterSection />
    </>
  );
}
