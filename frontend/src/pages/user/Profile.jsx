import Button from "@components/common/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { formatDate } from "../../utils/dateFormatter";
import { beautifyString } from "../../utils/stringUtils";

export default function Profile() {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate("/settings");
    };

    return (
        // <section className="my-15 px-4  lg:px-6">
        //     <div className="mx-auto max-w-4xl rounded-lg bg-white shadow-sm">
        //         <div className="overflow-hidden rounded-lg bg-white shadow">
        //             {/* Profile Header */}
        //             <div className="bg-primary-700z from-primary-700 to-primary-500 bg-gradient-to-r px-6 py-8 sm:px-10 sm:py-12">
        //                 <div className="flex flex-col items-center sm:flex-row">
        //                     <div className="mb-6 flex-shrink-0 sm:mr-6 sm:mb-0">
        //                         <img
        //                             className="h-24 w-24 rounded-full border-4 border-white object-cover"
        //                             src={user.profile_picture}
        //                             alt="Profile"
        //                         />
        //                     </div>
        //                     <div className="text-center sm:text-left">
        //                         <h1 className="text-2xl font-bold text-white">
        //                             {user.first_name} {user.last_name}
        //                         </h1>
        //                         <p className="text-primary-50">
        //                             {beautifyString(user.role)}
        //                         </p>
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* Profile Details */}
        //             <div className="px-6 py-8 sm:px-10">
        //                 <div className="mb-8">
        //                     <h2 className="mb-6 text-xl font-semibold text-(--secondary)">
        //                         Personal Information
        //                     </h2>
        //                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        //                         <div>
        //                             <p className="text-sm font-medium text-gray-500">
        //                                 Full Name
        //                             </p>
        //                             <p className="mt-1 text-gray-900">
        //                                 {user.first_name} {user.last_name}
        //                             </p>
        //                         </div>
        //                         <div>
        //                             <p className="text-sm font-medium text-gray-500">
        //                                 Email Address
        //                             </p>
        //                             <p className="mt-1 text-gray-900">
        //                                 {user.email}
        //                             </p>
        //                         </div>
        //                         <div>
        //                             <p className="text-sm font-medium text-gray-500">
        //                                 Date of Birth
        //                             </p>
        //                             <p className="mt-1 text-gray-900">
        //                                 {(user.birthday &&
        //                                     formatDate(
        //                                         new Date(user.birthday),
        //                                         "dd MMM yyyy",
        //                                     )) ||
        //                                     "N/A"}
        //                             </p>
        //                         </div>
        //                         <div>
        //                             <p className="text-sm font-medium text-gray-500">
        //                                 Gender
        //                             </p>
        //                             <p className="mt-1 text-gray-900">
        //                                 {beautifyString(user.gender) || "N/A"}
        //                             </p>
        //                         </div>
        //                         <div>
        //                             <p className="text-sm font-medium text-gray-500">
        //                                 Phone Number
        //                             </p>
        //                             <p className="mt-1 text-gray-900">
        //                                 {user.phone || "N/A"}
        //                             </p>
        //                         </div>
        //                         <div>
        //                             <p className="text-sm font-medium text-gray-500">
        //                                 Role
        //                             </p>
        //                             <p className="mt-1 text-gray-900">
        //                                 {beautifyString(user.role)}
        //                             </p>
        //                         </div>
        //                     </div>
        //                 </div>

        //                 <div className="flex justify-end">
        //                     <Button
        //                         onClick={handleEditProfile}
        //                         className="bg-primary-700 hover:bg-primary-800 text-white"
        //                     >
        //                         Edit Profile
        //                     </Button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>

        <section className="my-15 px-4 lg:px-6">
            <div className="mx-auto max-w-4xl rounded-xl bg-white shadow-lg">
                {/* Profile Header */}
                <div className="from-primary-600 to-primary-700 rounded-t-xl bg-gradient-to-br px-6 py-8 sm:px-10 sm:py-12">
                    <div className="flex flex-col items-center space-y-6 sm:flex-row sm:space-y-0 sm:space-x-6">
                        <div className="relative">
                            <img
                                className="h-32 w-32 rounded-full border-4 border-white/80 object-cover shadow-lg"
                                src={user.profile_picture}
                                alt="Profile"
                            />
                            <div className="absolute -bottom-2 left-[52%] flex items-center rounded-full bg-white px-3 py-1.5 text-nowrap shadow-sm">
                                <span className="text-primary-700 text-sm font-medium">
                                    {beautifyString(user.role)}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2 text-center sm:text-left">
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                {user.first_name} {user.last_name}
                            </h1>
                            <p className="text-primary-100 font-medium">
                                Member since{" "}
                                {formatDate(
                                    new Date(user.created_at),
                                    "MMM yyyy",
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="px-6 py-8 sm:px-10 sm:py-10">
                    <div className="mb-8">
                        <h2 className="mb-8 border-b border-gray-100 pb-4 text-2xl font-semibold text-gray-800">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {[
                                {
                                    label: "Full Name",
                                    value: `${user.first_name} ${user.last_name}`,
                                },
                                { label: "Email Address", value: user.email },
                                {
                                    label: "Date of Birth",
                                    value: user.birthday
                                        ? formatDate(
                                              new Date(user.birthday),
                                              "dd MMM yyyy",
                                          )
                                        : "N/A",
                                },
                                {
                                    label: "Gender",
                                    value: user.gender
                                        ? beautifyString(user.gender)
                                        : "N/A",
                                },
                                {
                                    label: "Phone Number",
                                    value: user.phone || "N/A",
                                },
                                {
                                    label: "Account Type",
                                    value: beautifyString(user.role),
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="hover:bg-primary-50/80 rounded-lg bg-gray-50 p-4 transition-colors duration-300 ease-in-out"
                                >
                                    <p className="text-primary-700 mb-1 text-xs font-semibold tracking-wide uppercase">
                                        {item.label}
                                    </p>
                                    <p className="font-medium break-words text-gray-700">
                                        {item.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end border-t border-gray-100 pt-8">
                        <Button
                            onClick={handleEditProfile}
                            className="bg-primary-700 hover:bg-primary-800 text-white"
                        >
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
