import React from "react";
import PageHeading from "../components/common/PageHeading";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

export default function Login() {
    return (
        <>
            <Header />
            <PageHeading
                title="Welcome Back!"
                description="Sign in to access your account and continue booking your favorite apartments."
            />
            <Footer />
        </>
    );
}
