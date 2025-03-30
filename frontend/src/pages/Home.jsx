import CardsSection from "../components/Home/CardsSection";
import HeroSection from "../components/Home/HeroSection";
import SearchSection from "../components/Home/SearchSection";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
    const { token, loading } = useAuth();

    if (loading)
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    return (
        <>
            {token ? <div className="h-20"></div> : <HeroSection />}

            <SearchSection />
            <CardsSection />
            <WhyChooseUs />
        </>
    );
}
