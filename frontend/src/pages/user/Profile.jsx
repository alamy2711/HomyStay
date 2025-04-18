import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "@components/common/Button";
import { beautifyString } from "../../utils/stringUtils";

export default function Profile() {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate("/settings");
    };

    return (
        <section className="my-15 px-4 lg:my-30 lg:px-6">
            <div className="mx-auto max-w-4xl rounded-lg bg-white shadow-sm">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    {/* Profile Header */}
                    <div className="bg-primary-700z from-primary-700 to-primary-500 bg-gradient-to-r px-6 py-8 sm:px-10 sm:py-12">
                        <div className="flex flex-col items-center sm:flex-row">
                            <div className="mb-6 flex-shrink-0 sm:mr-6 sm:mb-0">
                                <img
                                    className="h-24 w-24 rounded-full border-4 border-white object-cover"
                                    src={user.profile_picture}
                                    alt="Profile"
                                />
                            </div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl font-bold text-white">
                                    {user.first_name} {user.last_name}
                                </h1>
                                <p className="text-primary-50">
                                    {beautifyString(user.role)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="px-6 py-8 sm:px-10">
                        <div className="mb-8">
                            <h2 className="mb-6 text-xl font-semibold text-(--secondary)">
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Full Name
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                        {user.first_name} {user.last_name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Email Address
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                        {user.email}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Date of Birth
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                        {user.birthday || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Gender
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                        {user.gender || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Phone Number
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                        {user.phone || "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Role
                                    </p>
                                    <p className="mt-1 text-gray-900">
                                        {beautifyString(user.role)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                onClick={handleEditProfile}
                                className="bg-primary-700 hover:bg-primary-800 text-white"
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        // <PageHeading
        //     title="Profile"
        //     // description={`ID : ${user?.id} - - - Name: ${user?.first_name} - - - Email: ${user?.email}`}
        // >
        //     <div className="my-15 flex flex-col items-center justify-center gap-3">
        //         <img
        //             src={user.profile_picture}
        //             className="h-25 w-25 rounded-full"
        //             alt=""
        //         />
        //         <p>
        //             {user.first_name} {user.last_name}
        //         </p>
        //         <p>{user.email}</p>
        //         <p>{user.role}</p>
        //         <p>{user.phone}</p>
        //         <p>
        //             {formatDate(
        //                 parseDate(user.birthday, "yyyy-MM-dd"),
        //                 "dd MMMM yyyy",
        //             )}
        //         </p>
        //     </div>{" "}
        //     <div className="h-300"></div>
        //     <p>
        //         Lorem ipsum dolor sit amet consectetur adipisicing elit.
        //         Consequatur, consectetur?
        //     </p>
        // </PageHeading>
    );
}
