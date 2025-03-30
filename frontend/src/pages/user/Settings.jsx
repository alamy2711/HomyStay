import React from "react";
import PageHeading from "../../components/common/PageHeading";
import { useAuth } from "../../contexts/AuthContext";

export default function Settings() {
    const { user, token } = useAuth();
    return (
        <PageHeading
            title="Settings"
            description={`ID : ${user?.id} - - - Name: ${user?.name} - - - Email: ${user?.email}`}
        />
    );
}
