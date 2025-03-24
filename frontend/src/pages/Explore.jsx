import PageHeading from "../components/common/PageHeading";
import CardsSection from "../components/Home/CardsSection";
import SearchSection from "../components/Home/SearchSection";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default function Home() {
    return (
        <>
            <Header />
            <PageHeading
                title={"Explore Apartments"}
                description={
                    "Browse through a wide variety of apartments and find the perfect one for you!"
                }
            />
            <SearchSection />
            <CardsSection />
            <Footer />
        </>
    );
}
