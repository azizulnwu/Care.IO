import Footer from "@/components/footer/Footer";
import AboutSection from "@/components/main-layout-components/AboutSection";
import CareBanner from "@/components/main-layout-components/CareBanner";
import Navbar from "@/components/main-layout-components/Navbar";
import ServiceOverviewSection from "@/components/main-layout-components/ServiceOverviewSection";
import Testimonials from "@/components/service/Testimonials";

export default function MainLayout() {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <CareBanner></CareBanner>
      <AboutSection></AboutSection>
      <ServiceOverviewSection></ServiceOverviewSection>
      <Testimonials></Testimonials>
      {/* <main> {children}</main> */}
      <Footer></Footer>
    </div>
  );
}
