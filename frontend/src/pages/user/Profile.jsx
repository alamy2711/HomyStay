import React from "react";
import PageHeading from "../../components/common/PageHeading";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
    const { user, token } = useAuth();
    return (
        <PageHeading
            title="Profile"
            description={`ID : ${user?.id} - - - Name: ${user?.name} - - - Email: ${user?.email}`}
        ></PageHeading>
    );
}
