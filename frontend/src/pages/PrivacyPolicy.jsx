import React from "react";
import PageHeading from "../components/common/PageHeading";

export default function PrivacyPolicy() {
    return (
        <>
            <PageHeading title="Privacy Policy">
                TESTING...
                <div
                    style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
                >
                    <h1>Privacy Policy</h1>
                    <p>
                        Welcome to our Privacy Policy page. Your privacy is
                        critically important to us.
                    </p>
                    <h2>Information We Collect</h2>
                    <p>
                        We collect personal information that you provide to us
                        directly, such as when you create an account, fill out a
                        form, or contact us for support. This may include your
                        name, email address, phone number, and other details.
                    </p>
                    <h2>How We Use Your Information</h2>
                    <div>
                        We use the information we collect to:
                        <ul>
                            <li>Provide and improve our services.</li>
                            <li>
                                Communicate with you about updates, promotions,
                                or support.
                            </li>
                            <li>Ensure the security of our platform.</li>
                        </ul>
                    </div>
                    <h2>Sharing Your Information</h2>
                    <p>
                        We do not share your personal information with third
                        parties except as necessary to provide our services or
                        comply with legal obligations.
                    </p>
                    <h2>Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your
                        personal information. Please contact us if you wish to
                        exercise these rights.
                    </p>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy,
                        please contact us at support@example.com.
                    </p>
                </div>
            </PageHeading>
        </>
    );
}
