import CardsSection from "../components/Home/CardsSection";
import HeroSection from "../components/Home/HeroSection";
import SearchSection from "../components/Home/SearchSection";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default function Home() {
    return (
        <>
            <HeroSection />
            <SearchSection />
            <CardsSection />
            <WhyChooseUs />
        </>
    );
}
