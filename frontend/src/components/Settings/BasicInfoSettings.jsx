import Button from "@components/common/Button";
import { useAuth } from "@contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import axiosClient from "../../lib/axiosClient";
import { formatDate, parseDate } from "../../utils/dateFormatter";
import { beautifyString } from "../../utils/stringUtils";

export default function BasicInfoSettings() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(user.profile_picture);

    // Form validation
    const schema = useMemo(() => {
        if (user.role === "host" || user.role === "client") {
            return z.object({
                firstName: z
                    .string()
                    .nonempty("First name is required")
                    .min(2, "First name must be at least 2 characters")
                    .max(50, "First name cannot exceed 50 characters")
                    .regex(/^(?!\s*$)[A-Za-z\s]+$/, "Only letters allowed"),
                lastName: z
                    .string()
                    .nonempty("Last name is required")
                    .min(2, "Last name must be at least 2 characters")
                    .max(50, "Last name cannot exceed 50 characters")
                    .regex(/^(?!\s*$)[A-Za-z\s]+$/, "Only letters allowed"),
                phone: z
                    .string()
                    .nonempty("Phone number is required")
                    .regex(/^\+?\d{10,15}$/, "Invalid phone number"), // Supports international numbers
                birthday: z
                    .string()
                    .nonempty("Birthday is required")
                    .regex(
                        /^([1-9]|0[1-9]|[12][0-9]|3[01])\/([1-9]|0[1-9]|1[0-2])\/(19|20)\d{2}$/,
                        "Birthday must be in the format dd/mm/yyyy",
                    )
                    .refine((date) => {
                        const parsedBirthday = parseDate(date, "dd/MM/yyyy");

                        if (isNaN(parsedBirthday)) return false;

                        const today = new Date();
                        const minDate = new Date(
                            today.getFullYear() - 18,
                            today.getMonth(),
                            today.getDate(),
                        );

                        return parsedBirthday <= minDate;
                    }, "You must be at least 18 years old"),
                gender: z.string().nonempty("Gender is required"),
                profilePicture: z
                    .instanceof(FileList)
                    .optional()
                    .refine(
                        (files) =>
                            files.length === 0 ||
                            files[0].type.startsWith("image/"),
                        {
                            message: "The profile picture must be an image.",
                        },
                    )
                    .refine(
                        (files) => {
                            if (files.length === 0) return true; // No file selected is valid
                            const file = files[0];
                            return [
                                "image/jpeg",
                                "image/png",
                                "image/jpg",
                            ].includes(file.type);
                        },
                        {
                            message:
                                "The profile picture must be a file of type: jpeg, png, jpg.",
                        },
                    )
                    .refine(
                        (files) => {
                            if (files.length === 0) return true; // No file selected is valid
                            const file = files[0];
                            return file.size <= 2 * 1024 * 1024; // 2MB
                        },
                        {
                            message:
                                "The profile picture may not be greater than 2MB.",
                        },
                    ),
            });
        } else {
            // admin and super_admin
            return z.object({
                firstName: z
                    .string()
                    .nonempty("First name is required")
                    .min(2, "First name must be at least 2 characters")
                    .max(50, "First name cannot exceed 50 characters")
                    .regex(/^(?!\s*$)[A-Za-z\s]+$/, "Only letters allowed"),
                lastName: z
                    .string()
                    .nonempty("Last name is required")
                    .min(2, "Last name must be at least 2 characters")
                    .max(50, "Last name cannot exceed 50 characters")
                    .regex(/^(?!\s*$)[A-Za-z\s]+$/, "Only letters allowed"),
                phone: z
                    .string()
                    .optional()
                    .refine((val) => !val || /^\+?\d{10,15}$/.test(val), {
                        message: "Invalid phone number",
                    }),
                birthday: z
                    .string()
                    .optional()
                    .refine(
                        (val) => {
                            if (!val) return true;

                            const regex =
                                /^([1-9]|0[1-9]|[12][0-9]|3[01])\/([1-9]|0[1-9]|1[0-2])\/(19|20)\d{2}$/;
                            if (!regex.test(val)) return false;

                            return true;
                        },
                        {
                            message:
                                "Birthday must be in the format dd/mm/yyyy",
                        },
                    )
                    .refine(
                        (val) => {
                            if (!val) return true;

                            // Age check (must be at least 18)
                            const parsedBirthday = parseDate(val, "dd/MM/yyyy");
                            if (isNaN(parsedBirthday)) return false;

                            const today = new Date();
                            const minDate = new Date(
                                today.getFullYear() - 18,
                                today.getMonth(),
                                today.getDate(),
                            );
                            return parsedBirthday <= minDate;
                        },
                        {
                            message: "You must be at least 18 years old",
                        },
                    ),
                gender: z.string().optional(),
                profilePicture: z
                    .instanceof(FileList)
                    .optional()
                    .refine(
                        (files) =>
                            files.length === 0 ||
                            files[0].type.startsWith("image/"),
                        {
                            message: "The profile picture must be an image.",
                        },
                    )
                    .refine(
                        (files) => {
                            if (files.length === 0) return true; // No file selected is valid
                            const file = files[0];
                            return [
                                "image/jpeg",
                                "image/png",
                                "image/jpg",
                            ].includes(file.type);
                        },
                        {
                            message:
                                "The profile picture must be a file of type: jpeg, png, jpg.",
                        },
                    )
                    .refine(
                        (files) => {
                            if (files.length === 0) return true; // No file selected is valid
                            const file = files[0];
                            return file.size <= 2 * 1024 * 1024; // 2MB
                        },
                        {
                            message:
                                "The profile picture may not be greater than 2MB.",
                        },
                    ),
            });
        }
    }, [user.role]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: user.first_name || "",
            lastName: user.last_name || "",
            birthday:
                (user.birthday &&
                    formatDate(new Date(user.birthday), "dd/MM/yyyy")) ||
                "",
            gender: user.gender || "",
            phone: user.phone || "",
        },
    });

    const onSubmit = async (data) => {
        // Parse the birthday string to a Date object
        let formattedData = {
            ...data,
        };
        if (data.birthday) {
            const parsedBirthday = parseDate(data.birthday, "dd/MM/yyyy");
            formattedData = {
                ...data,
                birthday: formatDate(parsedBirthday, "yyyy-MM-dd"),
            };
        }

        // Create a new FormData instance to support file uploads.
        const formData = new FormData();
        formData.append("firstName", formattedData.firstName);
        formData.append("lastName", formattedData.lastName);

        formData.append("birthday", formattedData.birthday);
        formData.append("gender", formattedData.gender);
        formData.append("phone", formattedData.phone);

        // Append the profile picture if it exists
        if (
            formattedData.profilePicture &&
            formattedData.profilePicture.length > 0
        ) {
            formData.append(
                "profilePicture",
                formattedData.profilePicture.item(0),
            );
        }

        try {
            const response = await axiosClient.post(
                "/profile/update",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            setUser(response.data.user);
            toast.success("Profile updated successfully!");
            navigate("/profile");
        } catch (err) {
            console.error("Update error:", err);
            toast.error("Failed to update profile.");
            if (err.response) {
                console.error("Error:", err.response.data.message);
                if (err.response.status === 422) {
                    const validationErrors = err.response.data.errors;
                    Object.keys(validationErrors).forEach((field) => {
                        setError(field, {
                            message: validationErrors[field][0],
                        });
                    });
                }
            } else {
                console.error("Network error:", err.message);
            }
        }
    };

    // Handle image preview
    const watchProfilePicture = watch("profilePicture");
    useEffect(() => {
        const file = watchProfilePicture?.[0]; // because it's a FileList
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [watchProfilePicture]);

    // Handle image reset
    const handleResetImage = () => {
        setPreviewImage(user.profile_picture);

        // Create a new, empty DataTransfer object to simulate empty FileList
        const dataTransfer = new DataTransfer();
        const emptyFileList = dataTransfer.files;

        setValue("profilePicture", emptyFileList); // looks like an empty FileList
        // setValue("profilePicture", undefined);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <div className="flex flex-col items-center gap-6 sm:flex-row">
                    <div className="relative max-w-50 flex-shrink-0">
                        <div className="h-24 w-24 overflow-hidden rounded-full">
                            <img
                                className="h-full w-full object-cover object-center"
                                src={previewImage}
                                alt="Profile"
                            />
                        </div>
                        {/* ❌ Reset button */}
                        {previewImage !== user.profile_picture && (
                            <button
                                type="button"
                                onClick={handleResetImage}
                                className="absolute -top-0 -left-0 rounded-full bg-white p-1 shadow-sm shadow-gray-600 hover:bg-gray-100"
                            >
                                <IoClose className="h-4 w-4 text-red-500" />
                            </button>
                        )}
                        <button
                            type="button"
                            className="mt-2 text-sm font-medium text-[#e76f51] hover:text-[#d45d3f]"
                            onClick={() => fileInputRef.current.click()}
                        >
                            Change photo
                        </button>
                        {/* Hidden file input */}
                        <input
                            type="file"
                            accept="image/*"
                            id="profilePicture"
                            style={{ display: "none" }}
                            // ref={fileInputRef}
                            // {...register("profilePicture")}
                            {...register("profilePicture", {
                                // hook form will handle the value
                            })}
                            ref={(e) => {
                                register("profilePicture").ref(e);
                                fileInputRef.current = e;
                            }}
                        />
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e76f51] focus:ring-[#e76f51] sm:text-sm"
                                    {...register("firstName")}
                                />
                                {errors.firstName && (
                                    <p className="text-sm text-red-500">
                                        {errors.firstName.message}
                                    </p>
                                )}
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
                                    {...register("lastName")}
                                />
                                {errors.lastName && (
                                    <p className="text-sm text-red-500">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {errors.profilePicture && (
                    <p className="text-sm text-red-500">
                        {errors.profilePicture.message}
                    </p>
                )}

                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="birthday"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Date of birth
                        </label>
                        <input
                            type="text"
                            id="birthday"
                            name="birthday"
                            placeholder="mm/dd/yyyy"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e76f51] focus:ring-[#e76f51] sm:text-sm"
                            {...register("birthday")}
                        />
                        {errors.birthday && (
                            <p className="text-sm text-red-500">
                                {errors.birthday.message}
                            </p>
                        )}
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
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e76f51] focus:ring-[#e76f51] sm:text-sm"
                            {...register("gender")}
                        >
                            <option value={""} disabled hidden>
                                Select gender
                            </option>
                            <option value={"male"}>Male</option>
                            <option value={"female"}>Female</option>
                        </select>
                        {errors.gender && (
                            <p className="text-sm text-red-500">
                                {errors.gender.message}
                            </p>
                        )}
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
                            {...register("phone")}
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500">
                                {errors.phone.message}
                            </p>
                        )}
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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Saving..." : "Save changes"}
                </Button>
            </div>
        </form>
    );
}
