import React from "react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import PageHeading from "../components/common/PageHeading";
export default function About() {
    return (
        <>
            <PageHeading
                title={"About Us"}
                description={
                    "Learn more about our mission, values, and how we help you find the best apartments."
                }
            />
        </>
    );
}
