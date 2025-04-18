import MobileLogin from "@assets/illustrations/MobileLogin";
import Button from "@components/common/Button";
import FloatingLabel from "@components/common/FloatingLabel";
import Section from "@components/common/Section";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../contexts/AuthContext";
import axiosClient from "../../lib/axiosClient";

const schema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password cannot exceed 100 characters"),
    rememberMe: z.boolean().optional(),
});

export default function Login() {
    const { setToken, setUser } = useAuth();
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
        try {
            // await axiosClient.get("/sanctum/csrf-cookie");
            const response = await axiosClient.post("/login", formData);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const { user, token } = response.data;

            setUser(user);
            setToken(token);
        } catch (err) {
            if (err.response) {
                console.error("Error:", err.response.data.message);
                if (err.response.status === 401) {
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
                    Welcome Back!
                </h1>
                <p className="text-center font-bold">
                    Log in to access your account and pick up where you left
                    off.
                </p>
            </div>
            {/* Body */}
            <div className="grid-cols-2 items-start lg:grid">
                {/* Image */}
                <div className="flex h-full items-center justify-center lg:order-last">
                    <MobileLogin className="h-[450px]" />
                </div>
                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mx-auto flex w-full max-w-[450px] flex-col gap-8 rounded-lg px-5 py-5 shadow-sm shadow-gray-300"
                >
                    <h3 className="text-primary-700 self-center text-2xl lg:text-3xl">
                        Log in
                    </h3>
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="ml-2 text-sm">
                            Your email
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
                    <div className="flex items-center justify-between">
                        <div className="me-4 flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="text-primary-700 focus:ring-primary-700 rounded-sm border-gray-300 bg-gray-100 focus:ring-2"
                                {...register("rememberMe")}
                            />
                            <label
                                htmlFor="remember-me"
                                className="ms-2 text-sm font-medium text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>
                        <a
                            href="#"
                            className="text-primary-700 text-sm font-medium underline"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <Button
                        type="submit"
                        className="bg-primary-700 hover:bg-primary-800 disabled:bg-primary-500 text-white"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Loading..." : "Log in"}
                    </Button>
                    {/* <a
                        href="#"
                        className="text-primary-700 self-center text-sm font-medium underline"
                    >
                        Don't have an account?
                    </a> */}
                    <Link
                        to={"/signup"}
                        className="text-primary-700 self-center text-sm font-medium underline"
                    >
                        Don't have an account?
                    </Link>
                </form>
                {/* Image */}
                {/* <div className="hidden h-[480px] items-start justify-center p-5 lg:flex"> */}
            </div>
        </Section>
    );
}
