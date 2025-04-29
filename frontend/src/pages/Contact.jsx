import React from "react";
import Accordian, {
    AccordianItem,
} from "../components/common/Accordion/MyAccordion";
import PageHeading from "../components/common/PageHeading";

export default function Contact() {
    return (
        <>
            <PageHeading
                title={"Contact Us"}
                description="We'd love to hear from you! Reach out with any questions or feedback."
            />
            {/* TEST */}
            <div className="mx-auto w-[80%]">
                <Accordian >
                    <AccordianItem value="1" trigger="How can I contact you?">
                        text 1
                    </AccordianItem>

                    <AccordianItem
                        value="2"
                        trigger="What are your hours of operation?"
                    >
                        text 2
                    </AccordianItem>
                </Accordian>
            </div>
        </>
    );
}
