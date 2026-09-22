import Hero from "@/assets/home/Hero";
import HowItWorks from "@/assets/home/HowItWorks";
import PopularServices from "@/assets/home/PopularServices";
import ProviderCTA from "@/assets/home/ProviderCTA";
import WhyHandyHub from "@/assets/home/WhyHandyHub";


export default function Home() {
  return (
    <div className="">
      <Hero />
      <PopularServices />
      <HowItWorks />
      <WhyHandyHub />
      <ProviderCTA />
    </div>
  );
}
