import axiosClient from "@/lib/axiosClient";
import MobileSignup from "@assets/illustrations/MobileSignup";
import Button from "@components/common/Button";
import FloatingLabel from "@components/common/FloatingLabel";
import Section from "@components/common/Section";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../contexts/AuthContext";
import { formatDate, parseDate } from "../../utils/dateFormatter";

const schema = z.object({
    role: z.enum(["client", "host"], {
        errorMap: () => ({ message: "Please make a selection to continue" }),
    }),
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
        .regex(
            /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
            "Invalid phone number",
        ), // Supports international numbers
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

export default function Signup() {
    const { setToken, setUser } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            password: "123456789",
        },
        resolver: zodResolver(schema),
    });

    const onSubmit = async (formData) => {
        const parsedBirthday = parseDate(formData.birthday, "dd/MM/yyyy");
        const formattedData = {
            ...formData,
            birthday: formatDate(parsedBirthday, "yyyy-MM-dd"),
        };

        try {
            // await axiosClient.get("/sanctum/csrf-cookie");
            const response = await axiosClient.post("/signup", formattedData);
            const { user, token } = response.data;

            setToken(token);
            setUser(user);

            navigate("/settings");
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

    return (
        <Section className="flex flex-col gap-20">
            {/* Heading */}
            <div>
                <h1 className="text-center text-3xl text-(--secondary)">
                    Create an Account
                </h1>
                <p className="text-center font-bold">
                    Sign up to start your journey and enjoy all the benefits we
                    offer.
                </p>
            </div>
            {/* Body */}
            <div className="grid-cols-2 items-start lg:grid">
                {/* Image */}
                <div className="flex h-full items-center justify-center">
                    <MobileSignup className="h-[500px]" />
                </div>
                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mx-auto flex w-full max-w-[450px] flex-col gap-8 rounded-lg px-5 py-5 shadow-sm shadow-gray-300"
                >
                    <h3 className="text-primary-700 self-center text-2xl lg:text-3xl">
                        Sign up As
                    </h3>
                    {/* Client OR Host */}
                    <div className="grid grid-cols-2 gap-y-2 px-10">
                        <input
                            type="radio"
                            id="client"
                            name="role"
                            value="client"
                            className="peer/client hidden"
                            {...register("role")}
                        />
                        <label
                            htmlFor="client"
                            className="peer-checked/client:border-primary-700 peer-checked/client:text-primary-700 hover:bg-primary-100 hover:text-primary-700 peer-checked/client:bg-primary-100 text-md w-full cursor-pointer rounded-l-full border border-gray-200 bg-white py-1 text-center font-semibold"
                        >
                            Client
                        </label>
                        <input
                            type="radio"
                            id="host"
                            name="role"
                            value="host"
                            className="peer/host hidden"
                            {...register("role")}
                        />
                        <label
                            htmlFor="host"
                            className="peer-checked/host:border-primary-700 peer-checked/host:text-primary-700 hover:bg-primary-100 hover:text-primary-700 peer-checked/host:bg-primary-100 text-md w-full cursor-pointer rounded-r-full border border-gray-200 bg-white py-1 text-center font-semibold"
                        >
                            Host
                        </label>
                        {errors.role && (
                            <p className="col-span-2 ml-2 text-center text-sm text-red-500">
                                {errors.role.message}
                            </p>
                        )}
                    </div>

                    {/* First - Last Name */}
                    <div className="grid grid-cols-2 gap-5">
                        {/* First Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="ml-2 text-sm">
                                First name
                            </label>
                            <FloatingLabel
                                id="first-name"
                                type="text"
                                label="First name"
                                icon="fa-solid fa-user"
                                iconClass="text-md"
                                {...register("firstName")}
                            />
                            {errors.firstName && (
                                <p className="ml-2 text-sm text-red-500">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>
                        {/* Second Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="ml-2 text-sm">
                                Last name
                            </label>
                            <FloatingLabel
                                id="Last-name"
                                type="text"
                                label="Last name"
                                icon="fa-solid fa-user"
                                iconClass="text-md"
                                {...register("lastName")}
                            />
                            {errors.lastName && (
                                <p className="ml-2 text-sm text-red-500">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Phone & Birthday */}
                    <div className="grid grid-cols-2 gap-5">
                        {/* Phone */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="ml-2 text-sm">
                                Phone number
                            </label>
                            <FloatingLabel
                                id="phone"
                                type="tel"
                                label="Phone"
                                icon="fa-solid fa-phone"
                                iconClass="text-md"
                                {...register("phone")}
                            />
                            {errors.phone && (
                                <p className="ml-2 text-sm text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                        {/* Birthday */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="ml-2 text-sm">
                                Birthday
                            </label>
                            <FloatingLabel
                                id="birthday"
                                type="text"
                                label="dd/mm/yyyy"
                                placeholder="dd/mm/yyyy"
                                icon="fa-solid fa-calendar"
                                iconClass="text-[16px]"
                                {...register("birthday")}
                            />
                            {errors.birthday && (
                                <p className="ml-2 text-sm text-red-500">
                                    {errors.birthday.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="ml-2 text-sm">
                            Email Address
                        </label>
                        <FloatingLabel
                            id="email"
                            type="email"
                            label="Email"
                            icon="fa-solid fa-envelope"
                            iconClass="text-md"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p className="ml-2 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="ml-2 text-sm">
                            Password
                        </label>
                        <FloatingLabel
                            id="password"
                            type="password"
                            label="Password"
                            icon="fa-solid fa-lock"
                            iconClass="text-md"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="ml-2 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    {/* Sign up Button */}
                    <Button
                        type="submit"
                        className="bg-primary-700 hover:bg-primary-800 text-white"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Loading..." : "Sign up"}
                    </Button>
                    {/* Already have an account? */}
                    <Link
                        to={"/login"}
                        className="text-primary-700 self-center text-sm font-medium underline"
                    >
                        Already have an account?
                    </Link>
                </form>
            </div>
        </Section>
    );
}
