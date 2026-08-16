import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import ManufacturingSpecs from "@/components/ManufacturingSpecs";
import ProductPortfolio from "@/components/ProductPortfolio";
import TechnicalMaterials from "@/components/TechnicalMaterials";
import InquiryForm from "@/components/InquiryForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ValueProps />
      <ManufacturingSpecs />
      <ProductPortfolio />
      <TechnicalMaterials />
      <InquiryForm />
      <Footer />
    </main>
  );
}
