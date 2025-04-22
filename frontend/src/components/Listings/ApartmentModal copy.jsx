import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    FaConciergeBell,
    FaHotTub,
    FaLuggageCart,
    FaParking,
    FaPaw,
    FaSmokingBan,
    FaSnowflake,
    FaSwimmingPool,
    FaTv,
    FaUtensils,
    FaWheelchair,
    FaWifi,
} from "react-icons/fa";
import {
    MdOutlineAir,
    MdOutlineKitchen,
    MdOutlineLocalLaundryService,
} from "react-icons/md";
import ReactModal from "react-modal";
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
        .min(0, "Bathrooms can't be negative"),
    bathrooms: z.coerce
        .number({ invalid_type_error: "Bathrooms must be a number" })
        .int("Bathrooms must be an integer")
        .min(0, "Bathrooms can't be negative"),
    beds: z.coerce
        .number({ invalid_type_error: "Beds must be a number" })
        .int("Beds must be an integer")
        .min(0, "Bathrooms can't be negative"),
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
    amenities: z.array(z.number()).optional(), // You can make it required if needed
    images: z
        .array(z.any())
        .max(10, "You can upload a maximum of 10 images")
        .optional(),
});

const defaultValues = {
    title: "",
    price: null,
    description: "",
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
    check_in: "",
    check_out: "",
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
        maxWidth: "800px",
        width: "90%",
        borderRadius: "12px",
        border: "none",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        padding: "0",
        height: "90%",
        overflow: "hidden",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
    },
};

// Amenities data
const AMENITIES = [
    { id: "wifi", name: "WiFi", icon: <FaWifi className="text-lg" /> },
    { id: "parking", name: "Parking", icon: <FaParking className="text-lg" /> },
    { id: "pool", name: "Pool", icon: <FaSwimmingPool className="text-lg" /> },
    { id: "tv", name: "TV", icon: <FaTv className="text-lg" /> },
    {
        id: "kitchen",
        name: "Kitchen",
        icon: <MdOutlineKitchen className="text-lg" />,
    },
    {
        id: "ac",
        name: "Air Conditioning",
        icon: <FaSnowflake className="text-lg" />,
    },
    {
        id: "breakfast",
        name: "Breakfast",
        icon: <FaUtensils className="text-lg" />,
    },
    { id: "hot_tub", name: "Hot Tub", icon: <FaHotTub className="text-lg" /> },
    { id: "pets", name: "Pets Allowed", icon: <FaPaw className="text-lg" /> },
    {
        id: "no_smoking",
        name: "No Smoking",
        icon: <FaSmokingBan className="text-lg" />,
    },
    {
        id: "accessible",
        name: "Wheelchair Accessible",
        icon: <FaWheelchair className="text-lg" />,
    },
    {
        id: "laundry",
        name: "Laundry",
        icon: <MdOutlineLocalLaundryService className="text-lg" />,
    },
    {
        id: "concierge",
        name: "Concierge",
        icon: <FaConciergeBell className="text-lg" />,
    },
    {
        id: "luggage",
        name: "Luggage Storage",
        icon: <FaLuggageCart className="text-lg" />,
    },
    {
        id: "airport_shuttle",
        name: "Airport Shuttle",
        icon: <MdOutlineAir className="text-lg" />,
    },
];

export default function ApartmentModal({
    isOpen,
    onClose,
    apartment = null,
    // onSubmit,
}) {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: apartment || defaultValues,
    });

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        type: "apartment",
        rooms: 1,
        bathrooms: 1,
        beds: 1,
        guests: 1,
        area: "",
        country: "",
        city: "",
        address: "",
        check_in: "",
        check_out: "",
        status: "available",
        amenities: [],
        images: [],
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Initialize form with apartment data if editing
    useEffect(() => {
        if (apartment) {
            setFormData({
                title: apartment.title,
                description: apartment.description,
                price: apartment.price,
                type: apartment.type,
                rooms: apartment.rooms,
                bathrooms: apartment.bathrooms,
                beds: apartment.beds,
                guests: apartment.guests,
                area: apartment.area,
                country: apartment.country,
                city: apartment.city,
                address: apartment.address,
                check_in: apartment.check_in,
                check_out: apartment.check_out,
                status: apartment.status,
                amenities: apartment.amenities || [],
                images: apartment.images || [],
            });
            setPreviewImages(apartment.images || []);
        } else {
            // Reset form for new apartment
            setFormData({
                title: "",
                description: "",
                price: "",
                type: "apartment",
                rooms: 1,
                bathrooms: 1,
                beds: 1,
                guests: 1,
                area: "",
                country: "",
                city: "",
                address: "",
                check_in: "",
                check_out: "",
                status: "available",
                amenities: [],
                images: [],
            });
            setPreviewImages([]);
        }
    }, [apartment, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    };

    const handleAmenityChange = (amenityId) => {
        setFormData((prev) => {
            if (prev.amenities.includes(amenityId)) {
                return {
                    ...prev,
                    amenities: prev.amenities.filter((id) => id !== amenityId),
                };
            } else {
                return { ...prev, amenities: [...prev.amenities, amenityId] };
            }
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + previewImages.length > 10) {
            alert("You can upload a maximum of 10 images");
            return;
        }

        const newPreviewImages = files.map((file) => ({
            id: URL.createObjectURL(file),
            file,
            isNew: true,
        }));

        setPreviewImages((prev) => [...prev, ...newPreviewImages]);
    };

    const removeImage = (index) => {
        setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (values) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === "images" && Array.isArray(value)) {
                    value.forEach((file, i) => {
                        formData.append(`images[${i}]`, file);
                    });
                } else if (key === "amenities" && Array.isArray(value)) {
                    value.forEach((amenity, i) => {
                        formData.append(`amenities[${i}]`, amenity);
                    });
                } else {
                    formData.append(key, value);
                }
            });

            const endpoint = apartment
                ? `/apartments/${apartment.id}` // Update
                : `/apartments`; // Create

            const method = apartment ? "put" : "post";

            const response = await axiosClient[method](endpoint, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success(
                `Apartment ${apartment ? "updated" : "created"} successfully!`,
            );
            reset();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className="h-[100%] overflow-y-scroll p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {apartment ? "Edit Apartment" : "Add New Apartment"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-3xl text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                <input
                                    type="number"
                                    name="price"
                                    className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                    {...register("price")}
                                />
                                {errors.price && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
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

                        {/* Apartment Details */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Type*
                                </label>
                                <select
                                    name="type"
                                    className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                    {...register("type")}
                                >
                                    <option value="apartment">Apartment</option>
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
                                <input
                                    type="number"
                                    name="rooms"
                                    className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                    {...register("rooms")}
                                />
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
                                <input
                                    type="number"
                                    name="bathrooms"
                                    className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                    {...register("bathrooms")}
                                />
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
                                <input
                                    type="number"
                                    name="beds"
                                    className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                    {...register("beds")}
                                />
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
                                <input
                                    type="number"
                                    name="guests"
                                    className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                    {...register("guests")}
                                />
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
                                <input
                                    type="number"
                                    name="area"
                                    className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                    {...register("area")}
                                />
                                {errors.area && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.area.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Status*
                                </label>
                                <select
                                    name="status"
                                    className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2"
                                >
                                    <option value="available">Available</option>
                                    <option value="reserved">Reserved</option>
                                    <option value="expired">Expired</option>
                                </select>
                            </div>
                        </div>

                        {/* Location */}
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

                        {/* Availability */}
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

                        {/* Images */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Images (Max 10)
                            </label>
                            <div className="mb-3 flex flex-wrap gap-3">
                                {previewImages.map((img, index) => (
                                    <div key={index} className="group relative">
                                        <img
                                            src={img.isNew ? img.id : img}
                                            alt={`Preview ${index}`}
                                            className="h-24 w-24 rounded-md object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <label className="inline-block cursor-pointer rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
                                <span>Upload Images</span>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    {...register("images")}
                                />
                                {errors.images && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.images.message}
                                    </p>
                                )}
                            </label>
                            <p className="mt-1 text-sm text-gray-500">
                                Upload high-quality images of your property
                                (JPEG, PNG)
                            </p>
                        </div>

                        {/* Amenities */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Amenities
                            </label>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {AMENITIES.map((amenity) => (
                                    <div
                                        key={amenity.id}
                                        className="flex items-center"
                                    >
                                        <label className="inline-flex cursor-pointer items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.amenities.includes(
                                                    amenity.id,
                                                )}
                                                onChange={() =>
                                                    handleAmenityChange(
                                                        amenity.id,
                                                    )
                                                }
                                                className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300"
                                                {...register("amenities")}
                                            />
                                            <span className="ml-2 flex items-center">
                                                {amenity.icon}
                                                <span className="ml-1 text-sm text-gray-700">
                                                    {amenity.name}
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                            >
                                {isLoading
                                    ? "Saving..."
                                    : apartment
                                      ? "Update Apartment"
                                      : "Add Apartment"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </ReactModal>
    );
}
