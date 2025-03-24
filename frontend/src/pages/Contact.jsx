import React from "react";
import PageHeading from "../components/common/PageHeading";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default function Contact() {
    return (
        <>
            <Header />
            <PageHeading
                title={"Contact Us"}
                description="We'd love to hear from you! Reach out with any questions or feedback."
            />
            <Footer />
        </>
    );
}
