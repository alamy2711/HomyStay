import AMENITIES from "@/constants/amenities";
import axiosClient from "@/lib/axiosClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    FaCalendarAlt,
    FaConciergeBell,
    FaHome,
    FaImage,
    FaMapMarkerAlt,
    FaMinus,
    FaPlus,
    FaRulerCombined,
    FaTimes,
} from "react-icons/fa";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
    title: z
        .string()
        .nonempty("Title is required")
        .min(5, "Title must be at least 5 characters"),
    price: z.coerce
        .number("Price must be a number")
        .positive("Price must be a positive number")
        .min(1, "Price must be at least $1"),
    description: z
        .string()
        .nonempty("Description is required")
        .min(10, "Description must be at least 10 characters"),
    type: z.enum(["apartment", "house", "mansion", "hotel"], {
        errorMap: () => ({ message: "Select a valid apartment type" }),
    }),
    rooms: z.coerce
        .number({ invalid_type_error: "Rooms must be a number" })
        .int("Rooms must be an integer")
        .min(1, "At least 1 room required"),
    bathrooms: z.coerce
        .number({ invalid_type_error: "Bathrooms must be a number" })
        .int("Bathrooms must be an integer")
        .min(0, "Bathrooms can't be negative"),
    beds: z.coerce
        .number({ invalid_type_error: "Beds must be a number" })
        .int("Beds must be an integer")
        .min(0, "Beds can't be negative"),
    guests: z.coerce
        .number({ invalid_type_error: "Guests must be a number" })
        .int("Guests must be an integer")
        .min(1, "At least 1 guest required"),
    area: z.coerce
        .number({ invalid_type_error: "Area must be a number" })
        .positive("Area must be a positive number")
        .int("Area must be an integer")
        .min(1, "Area must be at least 1 sq ft"),
    country: z.string().nonempty("Country is required"),
    city: z.string().nonempty("City is required"),
    address: z.string().nonempty("Address is required"),
    check_in: z.string().nonempty("Check-in date is required"),
    check_out: z.string().nonempty("Check-out date is required"),
    amenities: z.any(),
    images: z
        .any()
        .refine(
            (files) => files?.length >= 1,
            "You must upload at least 3 images",
        )
        .refine(
            (files) => files?.length <= 10,
            "You can upload up to 10 images",
        ),
});

const mydefaultValues = {
    title: "",
    price: null,
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit",
    type: "apartment",
    rooms: 1,
    bathrooms: 0,
    beds: 0,
    guests: 1,
    area: null,
    status: "available",
    country: "",
    city: "",
    address: "",
    check_in: "2025-01-01",
    check_out: "2025-05-05",
    amenities: [],
    images: [],
};

// Modal styling
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "900px",
        width: "90%",
        maxHeight: "90vh",
        borderRadius: "12px",
        border: "none",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        padding: "0",
        overflow: "hidden",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
    },
};

const ApartmentModal = ({
    isOpen,
    onClose,
    apartment = null,
    setListingsLoading,
}) => {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        getValues,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: apartment || mydefaultValues,
    });
    // register("amenities");

    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        if (apartment) {
            // Prepare the existing images for preview
            const existingImages =
                apartment.pictures?.map((img) => ({
                    url: img.path,
                    path: img.path,
                    file: null, // Mark as existing image
                    isNew: false,
                })) || [];

            const formatted = {
                ...apartment,
                amenities: apartment.amenities?.map((am) => am.name) || [],
                images: existingImages,
            };

            reset(formatted);
            setPreviewImages(existingImages);
        } else {
            reset(mydefaultValues);
            setPreviewImages([]);
        }
    }, [apartment, reset, isOpen]);

    const incrementNumber = (name) => {
        setValue(name, getValues(name) + 1, { shouldValidate: true });
    };

    const decrementNumber = (name) => {
        if ((name === "rooms" || name === "guests") && getValues(name) === 1) {
            return;
        }
        if (getValues(name) > 0) {
            setValue(name, getValues(name) - 1, { shouldValidate: true });
        }
    };

    const handleAmenityChange = (amenityId) => {
        try {
            const current = getValues("amenities") || [];
            let updated;

            if (current.includes(amenityId)) {
                updated = current.filter((id) => id !== amenityId);
            } else {
                updated = [...current, amenityId];
            }
            setValue("amenities", updated, { shouldValidate: true });
        } catch (error) {
            console.error("Error updating amenities:", error);
        }
    };

    const watchImages = watch("images", []);

    // Handle Image Uplaod
    const handleImageUpload = (e) => {
        const newFiles = Array.from(e.target.files);

        // Combine old and new files (if not already included)
        const allFiles = [...watch("images"), ...newFiles];

        if (allFiles.length > 5) {
            toast.error("You can upload a maximum of 10 images");
            e.target.value = null;
            return;
        }

        setValue("images", allFiles, { shouldValidate: true });

        const newPreviewImages = newFiles.map((file) => ({
            url: URL.createObjectURL(file),
            file,
            isNew: true,
        }));

        setPreviewImages((prev) => [...prev, ...newPreviewImages]);

        e.target.value = null;
    };

    const handleImageRemove = (index) => {
        const newFiles = watchImages.filter((_, i) => i !== index);
        setValue("images", newFiles, { shouldValidate: true });

        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (values) => {
        setListingsLoading(true);
        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === "images" && Array.isArray(value)) {
                    value.forEach((image) => {
                        // formData.append(`images[]`, file);
                        if (image instanceof File) {
                            formData.append("images[]", image);
                        } else {
                            formData.append("existingImages[]", image.path);
                        }
                    });
                } else if (key === "amenities" && Array.isArray(value)) {
                    value.forEach((amenity, i) => {
                        formData.append("amenities[]", amenity);
                    });
                } else {
                    formData.append(key, value);
                }
            });

            const endpoint = apartment
                ? `/apartments/${apartment.id}` // Update
                : `/apartments`; // Create
            const method = apartment ? "post" : "post";

            const response = await axiosClient[method](endpoint, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            reset();
            onClose();
            toast.success(
                `Apartment ${apartment ? "updated" : "created"} successfully!`,
            );
            setListingsLoading(false);
        } catch (error) {
            console.error(error);
            if (error.response.status === 403) {
                toast.error(error.response.data.message);
            } else if (error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                Object.keys(validationErrors).forEach((field) => {
                    if ((field.includes("images"))) {
                        setError("images", {
                            message: validationErrors[field],
                        });
                    } else {
                        setError(field, {
                            message: validationErrors[field],
                        });
                    }
                });
                setError();
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setPreviewImages([]);
            reset();
        }
    }, [isOpen, reset]);

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            ariaHideApp={false}
        >
            {/* Fixed Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800">
                    {apartment ? "Update Apartment" : "Add New Apartment"}
                </h2>
                <button
                    onClick={onClose}
                    className="text-3xl text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
            </div>

            {/* Scrollable Content */}
            <div
                className="overflow-y-auto p-6"
                style={{ maxHeight: "calc(90vh - 120px)" }}
            >
                <form onSubmit={handleSubmit(onSubmit)} id="apartment-form">
                    <div className="space-y-8">
                        {/* Basic Information Section */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900">
                                <FaHome className="text-primary-600 mr-2" />
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Title*
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                        {...register("title")}
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.title.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Price per night ($)*
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                            $
                                        </span>
                                        <input
                                            type="number"
                                            name="price"
                                            className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 py-2 pr-3 pl-8"
                                            {...register("price")}
                                        />
                                    </div>
                                    {errors.price && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.price.message}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Description*
                                    </label>
                                    <textarea
                                        name="description"
                                        rows={4}
                                        className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                        {...register("description")}
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.description.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Apartment Structure Section */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900">
                                <FaRulerCombined className="text-primary-600 mr-2" />
                                Apartment Structure
                            </h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Type*
                                    </label>
                                    <select
                                        name="type"
                                        className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                        {...register("type")}
                                    >
                                        <option value="apartment">
                                            Apartment
                                        </option>
                                        <option value="house">House</option>
                                        <option value="mansion">Mansion</option>
                                        <option value="hotel">Hotel</option>
                                    </select>
                                    {errors.type && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.type.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Rooms*
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                decrementNumber("rooms");
                                            }}
                                            className="rounded-l-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                        >
                                            <FaMinus className="h-3 w-3" />
                                        </button>
                                        <input
                                            type="number"
                                            name="rooms"
                                            className="w-full border-t border-b border-gray-300 px-3 py-2 text-center"
                                            {...register("rooms")}
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                incrementNumber("rooms")
                                            }
                                            className="rounded-r-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                        >
                                            <FaPlus className="h-3 w-3" />
                                        </button>
                                    </div>
                                    {errors.rooms && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.rooms.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Bathrooms*
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                decrementNumber("bathrooms")
                                            }
                                            className="rounded-l-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                        >
                                            <FaMinus className="h-3 w-3" />
                                        </button>
                                        <input
                                            type="number"
                                            name="bathrooms"
                                            className="w-full border-t border-b border-gray-300 px-3 py-2 text-center"
                                            {...register("bathrooms")}
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                incrementNumber("bathrooms")
                                            }
                                            className="rounded-r-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                        >
                                            <FaPlus className="h-3 w-3" />
                                        </button>
                                    </div>
                                    {errors.bathrooms && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.bathrooms.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Beds*
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                decrementNumber("beds")
                                            }
                                            className="rounded-l-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                        >
                                            <FaMinus className="h-3 w-3" />
                                        </button>
                                        <input
                                            type="number"
                                            name="beds"
                                            className="w-full border-t border-b border-gray-300 px-3 py-2 text-center"
                                            {...register("beds")}
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                incrementNumber("beds")
                                            }
                                            className="rounded-r-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                        >
                                            <FaPlus className="h-3 w-3" />
                                        </button>
                                    </div>
                                    {errors.beds && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.beds.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Guests*
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                decrementNumber("guests")
                                            }
                                            className="rounded-l-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                        >
                                            <FaMinus className="h-3 w-3" />
                                        </button>
                                        <input
                                            type="number"
                                            name="guests"
                                            className="w-full border-t border-b border-gray-300 px-3 py-2 text-center"
                                            {...register("guests")}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                incrementNumber("guests")
                                            }
                                            className="rounded-r-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                        >
                                            <FaPlus className="h-3 w-3" />
                                        </button>
                                    </div>
                                    {errors.guests && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.guests.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Area (sq ft)*
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="area"
                                            className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 py-2 pr-3 pl-3"
                                            {...register("area")}
                                        />
                                        <span className="absolute top-2 right-3 text-gray-500">
                                            sq ft
                                        </span>
                                    </div>
                                    {errors.area && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.area.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900">
                                <FaMapMarkerAlt className="text-primary-600 mr-2" />
                                Location
                            </h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Country*
                                    </label>
                                    <input
                                        type="text"
                                        name="country"
                                        className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                        {...register("country")}
                                    />
                                    {errors.country && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.country.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        City*
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                        {...register("city")}
                                    />
                                    {errors.city && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.city.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Address*
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                        {...register("address")}
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.address.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Availability Section */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900">
                                <FaCalendarAlt className="text-primary-600 mr-2" />
                                Availability
                            </h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Check-in Date*
                                    </label>
                                    <input
                                        type="date"
                                        name="check_in"
                                        className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                        {...register("check_in")}
                                    />
                                    {errors.check_in && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.check_in.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Check-out Date*
                                    </label>
                                    <input
                                        type="date"
                                        name="check_out"
                                        className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                        {...register("check_out")}
                                    />
                                    {errors.check_out && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.check_out.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Images Section */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900">
                                <FaImage className="text-primary-600 mr-2" />
                                Images (Max 10)
                            </h3>
                            <div className="mb-3 flex flex-wrap gap-3">
                                {previewImages.map((img, index) => (
                                    <div
                                        key={index}
                                        className="group relative h-24 w-24"
                                    >
                                        <img
                                            src={img.url}
                                            alt={`Preview ${index}`}
                                            className="h-full w-full rounded-md object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleImageRemove(index)
                                            }
                                            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                                        >
                                            <FaTimes className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {errors.images && (
                                <p className="my-1 text-sm text-red-500">
                                    {errors.images.message}
                                </p>
                            )}
                            <label className="inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                                <FaPlus className="mr-2 h-4 w-4" />
                                Upload Images
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                            <p className="mt-2 text-sm text-gray-500">
                                Upload high-quality images of your property
                                (JPEG, PNG)
                            </p>
                        </div>

                        {/* Amenities Section */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 flex items-center text-lg font-medium text-gray-900">
                                <FaConciergeBell className="text-primary-600 mr-2" />
                                Amenities
                            </h3>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {AMENITIES.map((amenity) => (
                                    <button
                                        key={amenity.id}
                                        type="button"
                                        onClick={() => {
                                            handleAmenityChange(amenity.id);
                                        }}
                                        className={`flex items-center justify-center rounded-lg border p-3 transition-colors ${
                                            // formData.amenities.includes(
                                            getValues("amenities").includes(
                                                amenity.id,
                                            )
                                                ? "border-primary-500 bg-primary-50 text-primary-700"
                                                : "border-gray-300 hover:border-gray-400"
                                        }`}
                                    >
                                        <span className="mr-2">
                                            {amenity.icon}
                                        </span>
                                        <span className="text-sm">
                                            {amenity.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            {errors.amenities && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.amenities.message}
                                </p>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* Fixed Footer */}
            <div className="sticky bottom-0 flex justify-end space-x-3 border-t border-gray-200 bg-white px-6 py-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    form="apartment-form"
                    disabled={isSubmitting}
                    className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <span className="flex items-center">
                            <svg
                                className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            {apartment ? "Updating..." : "Creating..."}
                        </span>
                    ) : apartment ? (
                        "Update Apartment"
                    ) : (
                        "Create Apartment"
                    )}
                </button>
            </div>
        </ReactModal>
    );
};

export default ApartmentModal;
