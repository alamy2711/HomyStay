import React from "react";
import PageHeading from "../components/common/PageHeading";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default function Signup() {
    return (
        <>
            <Header />
            <PageHeading
                title="Create an Account"
                description="Join us today and find the best apartments for your stay!"
            />
            <Footer />
        </>
    );
}
