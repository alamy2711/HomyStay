import CardsSection from "../components/Home/CardsSection";
import HeroSection from "../components/Home/HeroSection";
import SearchSection from "../components/Home/SearchSection";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
    const { token, loading } = useAuth();

    if (loading)
        return (
            <div className="flex h-screen items-center justify-center rounded-lg bg-(--bg-gray)">
                <div className="border-primary-700 h-12 w-12 animate-spin rounded-full border-4 border-solid border-t-transparent"></div>
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
