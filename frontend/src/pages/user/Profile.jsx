import React from "react";
import PageHeading from "../../components/common/PageHeading";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
    const { user, token } = useAuth();
    return (
        <PageHeading
            title="Profile"
            description={`ID : ${user?.id} - - - Name: ${user?.name} - - - Email: ${user?.email}`}
        >
            {" "}
            <div className="h-300"></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, consectetur?</p>
        </PageHeading>
    );
}
