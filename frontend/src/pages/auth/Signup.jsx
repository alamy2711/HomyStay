import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import MobileSignup from "@assets/illustrations/MobileSignup";
import Button from "@components/common/Button";
import FloatingLabel from "@components/common/FloatingLabel";
import Section from "@components/common/Section";

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
        .regex(/^\+?\d{10,15}$/, "Invalid phone number"), // Supports international numbers
    birthday: z
        .string()
        .nonempty("Birthday is required")
        .refine((date) => {
            const [day, month, year] = date.split("-");
            const formattedDate = `${year}-${month}-${day}`;
            const parsedDate = new Date(formattedDate);

            if (isNaN(parsedDate)) return false;

            const today = new Date();
            const minAge = 18; // Example: Require at least 18 years old
            const age = today.getFullYear() - parsedDate.getFullYear();

            return age >= minAge;
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

export default function Login() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            // email: "",
        },
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(data);
            // throw new Error();
        } catch (error) {
            setError("email", {
                message: "This email is already taken",
            });
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
                    <div className="grid grid-cols-2 px-10 gap-y-2">
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
                            <p className="ml-2 text-sm text-red-500 col-span-2 text-center">
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
                                label="Birthday"
                                icon="fa-solid fa-calendar"
                                iconClass="text-[16px]"
                                datepicker="true"
                                datepicker-format="dd-mm-yyyy"
                                datepicker-autohide="true"
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
                        className="bg-primary-700 hover:bg-primary-800 disabled:bg-primary-500 text-white"
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
