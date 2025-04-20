// src/components/UserManagement/AdminCreationModal.jsx
import Button from "@components/common/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { z } from "zod";
import axiosClient from "../../../lib/axiosClient";

const schema = z.object({
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

    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password cannot exceed 100 characters"),
});

const AdminCreationModal = ({ isOpen, onClose, setLoading }) => {
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            // firstName: "Rachid",
            // lastName: "Raiss",
            // email: "rachidraiss@email.com",
            password: "123456789",
        },
        resolver: zodResolver(schema),
    });

    const onSubmit = async (formData) => {
        try {
            const payload = { ...formData, role: "admin" }; // Add "admin" role
            const response = await axiosClient.post(
                "/super-admin/create-admin",
                payload,
            );
            reset();
            onClose();
            toast.success("Admin created successfully!");
            setLoading(true);
        } catch (err) {
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

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Create Admin Modal"
            className={{
                base: "modal-content",
                afterOpen: "modal-content--after-open",
                beforeClose: "modal-content--before-close",
            }}
            overlayClassName={{
                base: "modal-overlay",
                afterOpen: "modal-overlay--after-open",
                beforeClose: "modal-overlay--before-close",
            }}
            closeTimeoutMS={300}
        >
            <div className="mx-auto min-w-2xs rounded-lg border border-gray-200 bg-white p-6 shadow-sm shadow-gray-300 md:min-w-md">
                <div className="mb-4 flex items-start justify-between">
                    <h2 className="text-lg font-bold">Create New Admin</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <FiX size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 grid grid-cols-1 gap-4">
                        <div className="flex flex-row gap-4">
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="mb-1 block text-sm font-medium text-gray-700"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                                    {...register("firstName")}
                                />
                                {errors.firstName && (
                                    <p className="ml-2 text-sm text-red-500">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="mb-1 block text-sm font-medium text-gray-700"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                                    {...register("lastName")}
                                />
                                {errors.lastName && (
                                    <p className="ml-2 text-sm text-red-500">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="ml-2 text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                                autoComplete="on"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="ml-2 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Loading..." : "Create Admin"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AdminCreationModal;
