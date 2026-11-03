import Footer from "@/components/footer/Footer";
import AboutSection from "../../main-layout-components/AboutSection";
import CareBanner from "../../main-layout-components/CareBanner";
import Navbar from "../../main-layout-components/Navbar";
import ServiceOverviewSection from "../../main-layout-components/ServiceOverviewSection";
import Testimonials from "@/components/service/Testimonials";
import ScrollToTop from "@/components/ScrollToTop";


export default function MainLayout() {
  return (
    <div>
      <header className="sticky top-0  z-40">
        <Navbar></Navbar><ScrollToTop />
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
