import Button from "@components/common/Button";
import { useAuth } from "@contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { beautifyString } from "../../utils/stringUtils";

export default function BasicInfoSettings() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        alert(JSON.stringify(Object.fromEntries(formData)));
    };

    return (
        <form action={onSubmit}>
            <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <div className="flex flex-col items-center gap-6 sm:flex-row">
                    <div className="flex-shrink-0">
                        <img
                            className="h-24 w-24 rounded-full object-cover"
                            src={user.profile_picture}
                            alt="Profile"
                        />
                        <button
                            type="button"
                            className="mt-2 text-sm font-medium text-[#e76f51] hover:text-[#d45d3f]"
                        >
                            Change photo
                        </button>
                    </div>
                    <div className="w-full flex-grow space-y-4">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    First name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    defaultValue={user.first_name}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e76f51] focus:ring-[#e76f51] sm:text-sm"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    defaultValue={user.last_name}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e76f51] focus:ring-[#e76f51] sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="birthday"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Date of birth
                        </label>
                        <input
                            type="date"
                            id="birthday"
                            name="birthday"
                            defaultValue={user.birthday}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e76f51] focus:ring-[#e76f51] sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            defaultValue={user.gender}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e76f51] focus:ring-[#e76f51] sm:text-sm"
                        >
                            <option value={null}>Select gender</option>
                            <option value={"male"}>Male</option>
                            <option value={"female"}>Female</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            defaultValue={user.phone}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e76f51] focus:ring-[#e76f51] sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Role
                        </label>
                        <input
                            type="text"
                            id="role"
                            name="role"
                            value={beautifyString(user.role)}
                            readOnly
                            className="mt-1 block w-full cursor-not-allowed rounded-md border-gray-300 bg-gray-100 shadow-sm ring-0 focus:border-gray-300 sm:text-sm"
                        />
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
