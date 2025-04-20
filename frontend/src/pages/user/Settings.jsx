import BasicInfoSettings from "@components/Settings/BasicInfoSettings";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationsSettings from "../../components/Settings/NotificationsSettings";
import SecuritySettings from "../../components/Settings/SecuritySettings";

export default function Settings() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("basic");

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate("/profile");
    };

    return (
        <section className="my-15 px-4 lg:px-6">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
                    {/* Settings Header */}
                    <div className="from-primary-600 to-primary-700 bg-gradient-to-br px-6 py-6">
                        <h1 className="text-2xl font-bold text-white">
                            Account Settings
                        </h1>
                        <p className="text-primary-50 mt-1">
                            Manage your profile and preferences
                        </p>
                    </div>

                    {/* Settings Tabs */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex">
                            <button
                                onClick={() => setActiveTab("basic")}
                                className={`border-b-2 px-6 py-4 text-center text-sm font-medium text-nowrap ${activeTab === "basic" ? "border-primary-700 text-primary-700" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
                            >
                                Basic Info
                            </button>
                            <button
                                onClick={() => setActiveTab("security")}
                                className={`border-b-2 px-6 py-4 text-center text-sm font-medium ${activeTab === "security" ? "border-primary-700 text-primary-700" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
                            >
                                Security
                            </button>
                            <button
                                onClick={() => setActiveTab("notifications")}
                                className={`border-b-2 px-6 py-4 text-center text-sm font-medium ${activeTab === "notifications" ? "border-primary-700 text-primary-700" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
                            >
                                Notifications
                            </button>
                        </nav>
                    </div>

                    {/* Settings Content */}
                    <div className="px-6 py-8 sm:px-10">
                        {/* Basic Info Tab */}
                        {activeTab === "basic" && <BasicInfoSettings />}

                        {/* Security Tab */}
                        {activeTab === "security" && <SecuritySettings />}

                        {/* Notifications Tab */}
                        {activeTab === "notifications" && (
                            <NotificationsSettings />
                        )}
                    </div>
            </div>
        </section>
    );
}
