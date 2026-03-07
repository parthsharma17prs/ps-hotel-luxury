import HeroScroll from "@/components/canvas/HeroScroll";
import About from "@/components/sections/About";
import Accommodations from "@/components/sections/Accommodations";
import Destinations from "@/components/sections/Destinations";
import BannerCarousel from "@/components/sections/BannerCarousel";
import Specials from "@/components/sections/Specials";
import PromotionalBanner from "@/components/sections/PromotionalBanner";
import Amenities from "@/components/sections/Amenities";
import Features from "@/components/sections/Features";
import DestinationGlobe from "@/components/sections/DestinationGlobe";
import Experiences from "@/components/sections/Experiences";
import PromotionalRibbon from "@/components/ui/PromotionalRibbon";
import Reviews from "@/components/sections/Reviews";
import Location from "@/components/sections/Location";
import Booking from "@/components/sections/Booking";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/global/Footer";

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Canvas Scroll (Sequence 1) */}
      <HeroScroll />

      {/* About Section */}
      <About />

      {/* Accommodations - Rooms, Suites, Villas */}
      <Accommodations />

      {/* Features Section */}
      <Features />

      {/* Destinations */}
      <Destinations />

      {/* Auto Swapping Banner Section */}
      <BannerCarousel />

      {/* Specials & Exclusive Offers */}
      <Specials />

      {/* Hero Ads / Promotions */}
      <PromotionalBanner />

      {/* Amenities */}
      <Amenities />

      {/* Globe Video Section */}
      <DestinationGlobe />

      {/* Experiences with Parallax */}
      <Experiences />

      {/* Promotional Ribbon */}
      <PromotionalRibbon />

      {/* Reviews / Testimonials */}
      <Reviews />

      {/* Global Locations */}
      <Location />

      {/* Booking Form */}
      <Booking />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
