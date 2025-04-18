import Button from "@components/common/Button";
import { useAuth } from "@contexts/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SecuritySettings() {
    const { user } = useAuth();
    const navigate = useNavigate();

     const onSubmit = async (formData) => {
         alert(JSON.stringify(Object.fromEntries(formData)));
     };


    return (
        <form action={onSubmit}>
            <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Change Email
                </h2>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={user.email}
                        className="focus:border-primary-700 focus:ring-primary-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    />
                </div>

                <h2 className="text-lg font-medium text-gray-900">
                    Change Password
                </h2>
                <div>
                    <label
                        htmlFor="currentPassword"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Current password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        autoComplete="on"
                        className="focus:border-primary-700 focus:ring-primary-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    />
                </div>

                <div>
                    <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700"
                    >
                        New password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        autoComplete="on"
                        className="focus:border-primary-700 focus:ring-primary-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    />
                </div>

                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Confirm new password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        autoComplete="on"
                        className="focus:border-primary-700 focus:ring-primary-700 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    />
                </div>
            </div>
            {/* Cancel and Save Buttons */}
            <div className="mt-8 flex justify-end gap-3">
                <Button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="hover:bg-primary-50 border border-gray-300 bg-white text-gray-700"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-primary-700 hover:bg-primary-800 border border-transparent text-white"
                >
                    Save changes
                </Button>
            </div>
        </form>
    );
}
