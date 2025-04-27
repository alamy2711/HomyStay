import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import {
    FaSearch,
    FaCalendarAlt,
    FaFilter,
    FaChevronDown,
    FaChevronUp,
    FaHome,
    FaBuilding,
    FaHotel,
    FaCity,
    FaWifi,
    FaParking,
    FaSwimmingPool,
    FaTv,
    FaSnowflake,
    FaHotTub,
    FaPaw,
    FaSmokingBan,
    FaWheelchair,
    FaTimes,
    FaPlus,
    FaMinus,
    FaBed
} from "react-icons/fa";

import {
    MdOutlineApartment,
    MdOutlineKitchen,
    MdOutlineLocalLaundryService,
} from "react-icons/md";
import { BiArea } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsPeople, BsSortDown } from "react-icons/bs";

// Dummy property data
const PROPERTIES = [
    {
        id: 1,
        title: "Modern Downtown Loft",
        type: "apartment",
        price: 150,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
        rooms: 2,
        beds: 3,
        bathrooms: 1,
        guests: 4,
        area: 850,
        amenities: ["wifi", "ac", "tv"],
        description: "Stylish apartment in the heart of downtown",
    },
    {
        id: 2,
        title: "Beachfront Villa",
        type: "house",
        price: 300,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        rooms: 4,
        beds: 5,
        bathrooms: 3,
        guests: 8,
        area: 1800,
        amenities: ["wifi", "parking", "pool", "ac", "hot_tub"],
        description: "Luxury villa with private beach access",
    },
    {
        id: 3,
        title: "Cozy Mountain Cabin",
        type: "house",
        price: 200,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b",
        rooms: 3,
        beds: 4,
        bathrooms: 2,
        guests: 6,
        area: 1200,
        amenities: ["wifi", "kitchen", "hot_tub"],
        description: "Rustic cabin with stunning mountain views",
    },
    {
        id: 4,
        title: "Luxury Penthouse Suite",
        type: "apartment",
        price: 400,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
        rooms: 3,
        beds: 3,
        bathrooms: 2,
        guests: 6,
        area: 1500,
        amenities: ["wifi", "ac", "tv", "parking", "concierge"],
        description: "Ultra-luxurious penthouse with panoramic views",
    },
    {
        id: 5,
        title: "Grand Lakeside Mansion",
        type: "mansion",
        price: 800,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
        rooms: 8,
        beds: 10,
        bathrooms: 6,
        guests: 16,
        area: 5000,
        amenities: [
            "wifi",
            "parking",
            "pool",
            "ac",
            "hot_tub",
            "kitchen",
            "laundry",
        ],
        description: "Stunning mansion on the lake with all amenities",
    },
    {
        id: 6,
        title: "Boutique Hotel Suite",
        type: "hotel",
        price: 250,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        rooms: 1,
        beds: 1,
        bathrooms: 1,
        guests: 2,
        area: 600,
        amenities: ["wifi", "ac", "tv", "breakfast", "concierge"],
        description: "Elegant hotel suite with premium services",
    },
];

// Amenities data
const AMENITIES = [
    { id: "wifi", name: "WiFi", icon: <FaWifi /> },
    { id: "parking", name: "Parking", icon: <FaParking /> },
    { id: "pool", name: "Pool", icon: <FaSwimmingPool /> },
    { id: "tv", name: "TV", icon: <FaTv /> },
    { id: "ac", name: "Air Conditioning", icon: <FaSnowflake /> },
    { id: "hot_tub", name: "Hot Tub", icon: <FaHotTub /> },
    { id: "kitchen", name: "Kitchen", icon: <MdOutlineKitchen /> },
    { id: "laundry", name: "Laundry", icon: <MdOutlineLocalLaundryService /> },
];

// Sort options
const SORT_OPTIONS = [
    {
        id: "price_asc",
        label: "Price: Low to High",
        icon: <RiMoneyDollarCircleLine />,
    },
    {
        id: "price_desc",
        label: "Price: High to Low",
        icon: <RiMoneyDollarCircleLine />,
    },
    { id: "rating_desc", label: "Highest Rated", icon: <BsSortDown /> },
    { id: "area_desc", label: "Largest Space", icon: <BiArea /> },
];

const AdvancedSearchPage = () => {
    // Search state
    const [searchTerm, setSearchTerm] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [sortOption, setSortOption] = useState("rating_desc");
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState(PROPERTIES);

    // Filter state
    const [filters, setFilters] = useState({
        types: [],
        priceRange: [0, 1000],
        rooms: 0,
        beds: 0,
        bathrooms: 0,
        guests: 0,
        area: 0,
        amenities: [],
    });

    // Accordion state
    const [openAccordions, setOpenAccordions] = useState({
        type: true,
        price: true,
        structure: true,
        amenities: true,
    });

    // Toggle accordion
    const toggleAccordion = (key) => {
        setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // Handle filter changes
    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // Handle amenity toggle
    const toggleAmenity = (amenityId) => {
        setFilters((prev) => {
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

    // Handle type toggle
    const toggleType = (type) => {
        setFilters((prev) => {
            if (prev.types.includes(type)) {
                return { ...prev, types: prev.types.filter((t) => t !== type) };
            } else {
                return { ...prev, types: [...prev.types, type] };
            }
        });
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            types: [],
            priceRange: [0, 1000],
            rooms: 0,
            beds: 0,
            bathrooms: 0,
            guests: 0,
            area: 0,
            amenities: [],
        });
    };

    // Apply filters and close modal
    const applyFilters = () => {
        setFilterModalOpen(false);
        filterProperties();
    };

    // Filter properties based on search and filters
    const filterProperties = () => {
        let results = [...PROPERTIES];

        // Apply search term filter
        if (searchTerm) {
            results = results.filter(
                (property) =>
                    property.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    property.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()),
            );
        }

        // Apply type filter
        if (filters.types.length > 0) {
            results = results.filter((property) =>
                filters.types.includes(property.type),
            );
        }

        // Apply price range filter
        results = results.filter(
            (property) =>
                property.price >= filters.priceRange[0] &&
                property.price <= filters.priceRange[1],
        );

        // Apply structure filters
        if (filters.rooms > 0) {
            results = results.filter(
                (property) => property.rooms >= filters.rooms,
            );
        }
        if (filters.beds > 0) {
            results = results.filter(
                (property) => property.beds >= filters.beds,
            );
        }
        if (filters.bathrooms > 0) {
            results = results.filter(
                (property) => property.bathrooms >= filters.bathrooms,
            );
        }
        if (filters.guests > 0) {
            results = results.filter(
                (property) => property.guests >= filters.guests,
            );
        }
        if (filters.area > 0) {
            results = results.filter(
                (property) => property.area >= filters.area,
            );
        }

        // Apply amenities filter
        if (filters.amenities.length > 0) {
            results = results.filter((property) =>
                filters.amenities.every((amenity) =>
                    property.amenities.includes(amenity),
                ),
            );
        }

        // Apply sorting
        results.sort((a, b) => {
            switch (sortOption) {
                case "price_asc":
                    return a.price - b.price;
                case "price_desc":
                    return b.price - a.price;
                case "rating_desc":
                    return b.rating - a.rating;
                case "area_desc":
                    return b.area - a.area;
                default:
                    return 0;
            }
        });

        setFilteredProperties(results);
    };

    // Re-filter when any search criteria changes
    useEffect(() => {
        filterProperties();
    }, [searchTerm, checkIn, checkOut, sortOption, filters]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Fixed Search/Filter Bar */}
            <div className="sticky top-0 z-10 bg-white p-4 shadow-sm">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search properties..."
                            className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Date Inputs */}
                    <div className="flex gap-2">
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="date"
                                placeholder="Check-in"
                                className="focus:ring-primary-500 focus:border-primary-500 rounded-lg border border-gray-300 py-2 pr-4 pl-10"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="date"
                                placeholder="Check-out"
                                className="focus:ring-primary-500 focus:border-primary-500 rounded-lg border border-gray-300 py-2 pr-4 pl-10"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Filter Button */}
                    <button
                        onClick={() => setFilterModalOpen(true)}
                        className="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
                    >
                        <FaFilter className="mr-2 h-5 w-5 text-gray-500" />
                        Filters
                    </button>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            className="focus:ring-primary-500 focus:border-primary-500 appearance-none rounded-lg border border-gray-300 py-2 pr-10 pl-3"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <BsSortDown className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Property Results */}
            <div className="mx-auto max-w-7xl p-4">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProperties.map((property) => (
                        <div
                            key={property.id}
                            className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
                        >
                            <img
                                src={property.image}
                                alt={property.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {property.title}
                                    </h3>
                                    <div className="flex items-center">
                                        <span className="text-yellow-500">
                                            ★
                                        </span>
                                        <span className="ml-1 text-gray-700">
                                            {property.rating}
                                        </span>
                                    </div>
                                </div>
                                <p className="mt-1 flex items-center text-sm text-gray-500">
                                    {property.type === "apartment" && (
                                        <MdOutlineApartment className="mr-1" />
                                    )}
                                    {property.type === "house" && (
                                        <FaHome className="mr-1" />
                                    )}
                                    {property.type === "mansion" && (
                                        <FaBuilding className="mr-1" />
                                    )}
                                    {property.type === "hotel" && (
                                        <FaHotel className="mr-1" />
                                    )}
                                    {property.type.charAt(0).toUpperCase() +
                                        property.type.slice(1)}
                                </p>
                                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                    <p className="flex items-center">
                                        <FaBed className="mr-1 text-gray-400" />{" "}
                                        {property.beds} beds
                                    </p>
                                    <p className="flex items-center">
                                        <FaHome className="mr-1 text-gray-400" />{" "}
                                        {property.rooms} rooms
                                    </p>
                                    <p className="flex items-center">
                                        <FaBuilding className="mr-1 text-gray-400" />{" "}
                                        {property.bathrooms} baths
                                    </p>
                                    <p className="flex items-center">
                                        <BsPeople className="mr-1 text-gray-400" />{" "}
                                        {property.guests} guests
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-lg font-semibold text-gray-900">
                                        ${property.price}{" "}
                                        <span className="text-sm font-normal text-gray-500">
                                            / night
                                        </span>
                                    </p>
                                    <button className="bg-primary-600 hover:bg-primary-700 rounded-lg px-3 py-1 text-sm text-white">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter Modal */}
            <ReactModal
                isOpen={filterModalOpen}
                onRequestClose={() => setFilterModalOpen(false)}
                className="fixed inset-0 flex items-center justify-center p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                contentLabel="Filter properties"
            >
                <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl bg-white shadow-xl">
                    {/* Fixed Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4">
                        <h2 className="text-xl font-bold text-gray-900">
                            Filters
                        </h2>
                        <button
                            onClick={() => setFilterModalOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto p-4">
                        {/* Type Filter */}
                        <div className="mb-6">
                            <button
                                onClick={() => toggleAccordion("type")}
                                className="mb-2 flex w-full items-center justify-between"
                            >
                                <h3 className="text-lg font-medium text-gray-900">
                                    Property Type
                                </h3>
                                {openAccordions.type ? (
                                    <FaChevronUp />
                                ) : (
                                    <FaChevronDown />
                                )}
                            </button>
                            {openAccordions.type && (
                                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                    <button
                                        type="button"
                                        onClick={() => toggleType("apartment")}
                                        className={`flex flex-col items-center rounded-lg border p-3 ${filters.types.includes("apartment") ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-300 hover:border-gray-400"}`}
                                    >
                                        <MdOutlineApartment className="mb-1 h-6 w-6" />
                                        <span>Apartment</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => toggleType("house")}
                                        className={`flex flex-col items-center rounded-lg border p-3 ${filters.types.includes("house") ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-300 hover:border-gray-400"}`}
                                    >
                                        <FaHome className="mb-1 h-6 w-6" />
                                        <span>House</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => toggleType("mansion")}
                                        className={`flex flex-col items-center rounded-lg border p-3 ${filters.types.includes("mansion") ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-300 hover:border-gray-400"}`}
                                    >
                                        <FaBuilding className="mb-1 h-6 w-6" />
                                        <span>Mansion</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => toggleType("hotel")}
                                        className={`flex flex-col items-center rounded-lg border p-3 ${filters.types.includes("hotel") ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-300 hover:border-gray-400"}`}
                                    >
                                        <FaHotel className="mb-1 h-6 w-6" />
                                        <span>Hotel</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Price Filter */}
                        <div className="mb-6">
                            <button
                                onClick={() => toggleAccordion("price")}
                                className="mb-2 flex w-full items-center justify-between"
                            >
                                <h3 className="text-lg font-medium text-gray-900">
                                    Price Range
                                </h3>
                                {openAccordions.price ? (
                                    <FaChevronUp />
                                ) : (
                                    <FaChevronDown />
                                )}
                            </button>
                            {openAccordions.price && (
                                <div>
                                    <div className="mb-2 flex justify-between">
                                        <div className="relative">
                                            <span className="absolute top-2 left-3 text-gray-500">
                                                $
                                            </span>
                                            <input
                                                type="number"
                                                value={filters.priceRange[0]}
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        "priceRange",
                                                        [
                                                            parseInt(
                                                                e.target.value,
                                                            ) || 0,
                                                            filters
                                                                .priceRange[1],
                                                        ],
                                                    )
                                                }
                                                className="w-24 rounded-lg border border-gray-300 py-2 pr-3 pl-8"
                                            />
                                        </div>
                                        <div className="relative">
                                            <span className="absolute top-2 left-3 text-gray-500">
                                                $
                                            </span>
                                            <input
                                                type="number"
                                                value={filters.priceRange[1]}
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        "priceRange",
                                                        [
                                                            filters
                                                                .priceRange[0],
                                                            parseInt(
                                                                e.target.value,
                                                            ) || 1000,
                                                        ],
                                                    )
                                                }
                                                className="w-24 rounded-lg border border-gray-300 py-2 pr-3 pl-8"
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={filters.priceRange[0]}
                                        onChange={(e) =>
                                            handleFilterChange("priceRange", [
                                                parseInt(e.target.value),
                                                filters.priceRange[1],
                                            ])
                                        }
                                        className="mb-2 w-full"
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={filters.priceRange[1]}
                                        onChange={(e) =>
                                            handleFilterChange("priceRange", [
                                                filters.priceRange[0],
                                                parseInt(e.target.value),
                                            ])
                                        }
                                        className="w-full"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Structure Filter */}
                        <div className="mb-6">
                            <button
                                onClick={() => toggleAccordion("structure")}
                                className="mb-2 flex w-full items-center justify-between"
                            >
                                <h3 className="text-lg font-medium text-gray-900">
                                    Property Structure
                                </h3>
                                {openAccordions.structure ? (
                                    <FaChevronUp />
                                ) : (
                                    <FaChevronDown />
                                )}
                            </button>
                            {openAccordions.structure && (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Rooms
                                        </label>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "rooms",
                                                        Math.max(
                                                            0,
                                                            filters.rooms - 1,
                                                        ),
                                                    )
                                                }
                                                className="rounded-l-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                            >
                                                <FaMinus className="h-3 w-3" />
                                            </button>
                                            <input
                                                type="number"
                                                value={filters.rooms}
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        "rooms",
                                                        parseInt(
                                                            e.target.value,
                                                        ) || 0,
                                                    )
                                                }
                                                className="w-full border-t border-b border-gray-300 px-3 py-2 text-center"
                                            />
                                            <button
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "rooms",
                                                        filters.rooms + 1,
                                                    )
                                                }
                                                className="rounded-r-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                            >
                                                <FaPlus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Beds
                                        </label>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "beds",
                                                        Math.max(
                                                            0,
                                                            filters.beds - 1,
                                                        ),
                                                    )
                                                }
                                                className="rounded-l-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                            >
                                                <FaMinus className="h-3 w-3" />
                                            </button>
                                            <input
                                                type="number"
                                                value={filters.beds}
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        "beds",
                                                        parseInt(
                                                            e.target.value,
                                                        ) || 0,
                                                    )
                                                }
                                                className="w-full border-t border-b border-gray-300 px-3 py-2 text-center"
                                            />
                                            <button
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "beds",
                                                        filters.beds + 1,
                                                    )
                                                }
                                                className="rounded-r-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                            >
                                                <FaPlus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Bathrooms
                                        </label>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "bathrooms",
                                                        Math.max(
                                                            0,
                                                            filters.bathrooms -
                                                                1,
                                                        ),
                                                    )
                                                }
                                                className="rounded-l-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                            >
                                                <FaMinus className="h-3 w-3" />
                                            </button>
                                            <input
                                                type="number"
                                                value={filters.bathrooms}
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        "bathrooms",
                                                        parseInt(
                                                            e.target.value,
                                                        ) || 0,
                                                    )
                                                }
                                                className="w-full border-t border-b border-gray-300 px-3 py-2 text-center"
                                            />
                                            <button
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "bathrooms",
                                                        filters.bathrooms + 1,
                                                    )
                                                }
                                                className="rounded-r-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                            >
                                                <FaPlus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Guests
                                        </label>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "guests",
                                                        Math.max(
                                                            0,
                                                            filters.guests - 1,
                                                        ),
                                                    )
                                                }
                                                className="rounded-l-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                            >
                                                <FaMinus className="h-3 w-3" />
                                            </button>
                                            <input
                                                type="number"
                                                value={filters.guests}
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        "guests",
                                                        parseInt(
                                                            e.target.value,
                                                        ) || 0,
                                                    )
                                                }
                                                className="w-full border-t border-b border-gray-300 px-3 py-2 text-center"
                                            />
                                            <button
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "guests",
                                                        filters.guests + 1,
                                                    )
                                                }
                                                className="rounded-r-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                            >
                                                <FaPlus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            Minimum Area (sq ft)
                                        </label>
                                        <div className="flex items-center">
                                            <button
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "area",
                                                        Math.max(
                                                            0,
                                                            filters.area - 100,
                                                        ),
                                                    )
                                                }
                                                className="rounded-l-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                            >
                                                <FaMinus className="h-3 w-3" />
                                            </button>
                                            <input
                                                type="number"
                                                value={filters.area}
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        "area",
                                                        parseInt(
                                                            e.target.value,
                                                        ) || 0,
                                                    )
                                                }
                                                className="w-full border-t border-b border-gray-300 px-3 py-2 text-center"
                                            />
                                            <button
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "area",
                                                        filters.area + 100,
                                                    )
                                                }
                                                className="rounded-r-md border border-gray-300 bg-gray-100 p-2 hover:bg-gray-200"
                                            >
                                                <FaPlus className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Amenities Filter */}
                        <div>
                            <button
                                onClick={() => toggleAccordion("amenities")}
                                className="mb-2 flex w-full items-center justify-between"
                            >
                                <h3 className="text-lg font-medium text-gray-900">
                                    Amenities
                                </h3>
                                {openAccordions.amenities ? (
                                    <FaChevronUp />
                                ) : (
                                    <FaChevronDown />
                                )}
                            </button>
                            {openAccordions.amenities && (
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                                    {AMENITIES.map((amenity) => (
                                        <button
                                            key={amenity.id}
                                            type="button"
                                            onClick={() =>
                                                toggleAmenity(amenity.id)
                                            }
                                            className={`flex items-center rounded-lg border p-3 ${
                                                filters.amenities.includes(
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
                            )}
                        </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="sticky bottom-0 flex justify-between border-t border-gray-200 bg-white p-4">
                        <button
                            onClick={clearFilters}
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={applyFilters}
                            className="bg-primary-600 hover:bg-primary-700 rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
};

export default AdvancedSearchPage;
