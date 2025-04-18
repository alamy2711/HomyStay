import Button from "@components/common/Button";
import { useAuth } from "@contexts/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationsSettings() {
    const { user } = useAuth();
    const navigate = useNavigate();

        const onSubmit = async (formData) => {
            alert(JSON.stringify(Object.fromEntries(formData)));
        };

    return (
        <form action={onSubmit}>
            <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Email Notifications
                </h2>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="flex h-5 items-center">
                            <input
                                id="emailNotifications"
                                name="emailNotifications"
                                type="checkbox"
                                defaultChecked={true}
                                className="text-primary-700 focus:ring-primary-700 h-4 w-4 rounded border-gray-300"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label
                                htmlFor="emailNotifications"
                                className="font-medium text-gray-700"
                            >
                                Email notifications
                            </label>
                            <p className="text-gray-500">
                                Receive notifications via email
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex h-5 items-center">
                            <input
                                id="newsletter"
                                name="newsletter"
                                type="checkbox"
                                defaultChecked={true}
                                className="text-primary-700 focus:ring-primary-700 h-4 w-4 rounded border-gray-300"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label
                                htmlFor="newsletter"
                                className="font-medium text-gray-700"
                            >
                                Newsletter
                            </label>
                            <p className="text-gray-500">
                                Receive our monthly newsletter
                            </p>
                        </div>
                    </div>
                </div>

                <h2 className="text-lg font-medium text-gray-900">
                    Push Notifications
                </h2>
                <div className="flex items-start">
                    <div className="flex h-5 items-center">
                        <input
                            id="pushNotifications"
                            name="pushNotifications"
                            type="checkbox"
                            defaultChecked={user.pushNotifications}
                            className="text-primary-700 focus:ring-primary-700 h-4 w-4 rounded border-gray-300"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label
                            htmlFor="pushNotifications"
                            className="font-medium text-gray-700"
                        >
                            Push notifications
                        </label>
                        <p className="text-gray-500">
                            Receive push notifications on your device
                        </p>
                    </div>
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
