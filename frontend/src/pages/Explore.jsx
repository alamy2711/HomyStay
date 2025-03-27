import PageHeading from "../components/common/PageHeading";
import AdvancedSearch from "../components/Explore/AdvancedSearch";
import CardsSection from "../components/Home/CardsSection";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default function Home() {
    return (
        <>
            <PageHeading
                title={"Explore Apartments"}
                description={
                    "Browse through a wide variety of apartments and find the perfect one for you!"
                }
            />
            <AdvancedSearch />
            <CardsSection />
        </>
    );
}
