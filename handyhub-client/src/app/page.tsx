import Hero from "@/Components/home/Hero";
import HowItWorks from "@/Components/home/HowItWorks";
import PopularServices from "@/Components/home/PopularServices";
import ProviderCTA from "@/Components/home/ProviderCTA";
import WhyHandyHub from "@/Components/home/WhyHandyHub";


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
