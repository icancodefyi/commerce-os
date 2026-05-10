import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { HeritageSection } from "@/components/sections/heritage-section";
import { CollectionsSection } from "@/components/sections/collections-section";
import { MembershipSection } from "@/components/sections/membership-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <HeritageSection />
      <CollectionsSection />
      <MembershipSection />
      <TestimonialsSection />
      <NewsletterSection />
    </main>
  );
}
