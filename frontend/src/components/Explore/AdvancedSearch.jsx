import AMENITIES from "@/constants/Amenities";
import PropertyStructure from "@/constants/PropertyStructure";
import axiosClient from "@/lib/axiosClient";
import { addDays, set, subDays } from "date-fns";
import { useEffect, useState } from "react";

// Components
import Accordian, {
    AccordianItem,
} from "@/components/common/Accordion/MyAccordion";
import ApartmentCard from "@components/Apartment/ApartmentCard";
import Button from "@components/common/Button";
import DatePickerInput from "@components/common/DatePickerInput";
import LoadingSpinner from "@components/common/LoadingSpinner";
import ReactModal from "react-modal";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Select from "react-select";

// Icons
import { BiArea } from "react-icons/bi";
import { BsPeople, BsSortDown } from "react-icons/bs";
import { FaBed, FaBuilding, FaHome, FaHotel, FaSearch } from "react-icons/fa";
import { HiOutlineFilter } from "react-icons/hi";
import { MdOutlineApartment } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
//
import { GiGate } from "react-icons/gi";
import { HiOutlineBuildingOffice, HiOutlineHome } from "react-icons/hi2";
import { LiaHotelSolid } from "react-icons/lia";

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
        country: "United States",
        city: "New York",
        address: "123 Main St, New York, NY 10001",
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
        country: "United States",
        city: "Miami",
        address: "456 Beach Rd, Miami, FL 33101",
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
        country: "United States",
        city: "Aspen",
        address: "789 Mountain Rd, Aspen, CO 81611",
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
        country: "United States",
        city: "New York",
        address: "321 Park Ave, New York, NY 10001",
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
        country: "United States",
        city: "Napa Valley",
        address: "987 Lake Rd, Napa Valley, CA 94559",
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
        country: "United States",
        city: "New York",
        address: "555 Fifth Ave, New York, NY 10001",
    },
];


// Modal styling
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        // width: "45%",
        maxWidth: "900px",
        height: "90%",
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

const AdvancedSearchPage = () => {
    // Search state
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [filteredProperties, setFilteredProperties] = useState([]);


    // Filter state
    const [filters, setFilters] = useState({
        searchTerm: "",
        checkIn: "",
        checkOut: "",
        types: [],
        priceRange: [0, 1000],
        rooms: 0,
        beds: 0,
        bathrooms: 0,
        guests: 0,
        area: 0,
        amenities: [],
        sortOption: {
            value: "rating_desc",
            label: "Highest Rated",
        },
    });

    const [apartments, setApartments] = useState([]);
    const [apartmentsLoading, setApartmentsLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get("/apartments/search")
            .then((response) => {
                setApartments(response.data.data);
                setFilteredProperties(response.data.data);
                setApartmentsLoading(false);
                filterProperties();
            })
            .catch((error) => {
                console.error("Error fetching apartments:", error);
                setApartmentsLoading(false);
            });
    }, []);

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
            sortOption: {
                value: "rating_desc",
                label: "Highest Rated",
            },
        });
    };

    // Apply filters and close modal
    const applyFilters = () => {
        setFilterModalOpen(false);
        filterProperties();
    };

    // Filter properties based on search and filters

    const filterProperties = () => {
        if (apartmentsLoading) return;
        let results = [...apartments];
        console.log(results)

        if (filters.searchTerm) {
            results = results.filter((property) => {
                const matchesSearch =
                    `${property.title} ${property.country} ${property.city}`
                        .toLowerCase()
                        .includes(filters.searchTerm.toLowerCase());
                return matchesSearch;
            });
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
            switch (filters.sortOption.value) {
                case "price_asc":
                    return a.price - b.price;
                case "price_desc":
                    return b.price - a.price;
                case "rating_desc":
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

        setFilteredProperties(results);
    };

    // Re-filter when any search criteria changes
    useEffect(() => {
        filterProperties();
    }, [filters]);

    if (!apartmentsLoading) {
        filterProperties();
    }

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
                            className="focus:ring-primary-700 focus:border-primary-700 w-full rounded-full border border-gray-300 py-2 pr-4 pl-10"
                            value={filters.searchTerm}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    searchTerm: e.target.value,
                                })
                            }
                        />
                    </div>

                    {/* Date Inputs */}
                    <div className="flex items-center gap-4">
                        <DatePickerInput
                            selected={filters.checkIn}
                            onChange={(date) => {
                                setFilters({
                                    ...filters,
                                    checkIn: date,
                                });
                            }}
                            selectsStart
                            startDate={filters.checkIn}
                            endDate={filters.checkOut}
                            maxDate={
                                filters.checkOut && subDays(filters.checkOut, 1)
                            }
                            openToDate={
                                filters.checkIn
                                    ? new Date(filters.checkIn)
                                    : filters.checkOut
                                      ? new Date(filters.checkOut)
                                      : new Date()
                            }
                            // Structure
                            popperPlacement="bottom-start"
                            // Input
                            id="startDate"
                            label="Check in"
                            name="startDate"
                        />
                        <DatePickerInput
                            selected={filters.checkOut}
                            onChange={(date) => {
                                setFilters({
                                    ...filters,
                                    checkOut: date,
                                });
                            }}
                            selectsEnd
                            startDate={filters.checkIn}
                            endDate={filters.checkOut}
                            minDate={
                                filters.checkIn && addDays(filters.checkIn, 1)
                            }
                            openToDate={
                                filters.checkOut
                                    ? new Date(filters.checkOut)
                                    : filters.checkIn
                                      ? new Date(filters.checkIn)
                                      : new Date()
                            }
                            // Structure
                            popperPlacement="bottom-end"
                            // Input
                            id="endDate"
                            label="Check out"
                            name="endDate"
                        />
                    </div>

                    {/* Filter Button */}
                    <button
                        onClick={() => setFilterModalOpen(true)}
                        className="flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
                    >
                        <HiOutlineFilter className="mr-2 h-5 w-5 text-gray-500" />
                        Filters
                    </button>

                    {/* Sort Dropdown */}
                    <Select
                        options={[
                            {
                                value: "rating_desc",
                                label: "Highest Rated",
                            },
                            {
                                value: "price_asc",
                                label: "Price: Low to High",
                            },
                            {
                                value: "price_desc",
                                label: "Price: High to Low",
                            },
                        ]}
                        components={{}}
                        value={filters.sortOption}
                        onChange={(selectedOption) => {
                            setFilters({
                                ...filters,
                                sortOption: selectedOption,
                            });
                        }}
                        isSearchable={false}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                height: "100%",
                                width: "200px",
                                borderRadius: "100px",
                                borderColor: state.isFocused
                                    ? "var(--color-primary-700)"
                                    : base.borderColor,
                                boxShadow: state.isFocused
                                    ? "0 0 0 1px var(--color-primary-700)"
                                    : base.boxShadow,
                                "&:hover": {
                                    borderColor: "var(--color-primary-700)",
                                },
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected
                                    ? "var(--color-primary-700)" // selected
                                    : state.isFocused
                                      ? "var(--color-primary-100)" // hover
                                      : "white",
                                color: state.isSelected ? "white" : "#000",
                                ":active": {
                                    backgroundColor: "var(--color-primary-700)",
                                    color: "white",
                                },
                            }),
                            menuPortal: (base) => ({
                                ...base,
                                zIndex: 150,
                            }),
                        }}
                    />
                </div>
            </div>

            {/* Property Results */}
            {apartmentsLoading ? (
                <LoadingSpinner className="h-[80vh]" />
            ) : (
                <section className="my-15 px-4 lg:my-30 lg:px-6">
                    <div className="mx-auto grid max-w-screen-xl grid-cols-1 place-items-center gap-2 gap-y-5 rounded-lg bg-white px-4 py-10 shadow-sm md:grid-cols-2 lg:grid-cols-3">
                        {/* Heading */}
                        <div className="mb-4 text-center font-bold md:col-span-2 lg:col-span-3">
                            <h1 className="text-2xl text-nowrap text-(--secondary) lg:text-3xl">
                                Find Your Perfect
                                <span className="text-primary-700">
                                    {" "}
                                    Apartment
                                </span>
                            </h1>
                            <p className="text-sm text-gray-500 lg:text-base">
                                {filteredProperties.length === 0
                                    ? "You have no favorite apartments."
                                    : " Discover the best apartments available for your next stay."}
                            </p>
                        </div>
                        {/* <!-- Card --> */}
                        {filteredProperties.map((apartment) => (
                            <ApartmentCard
                                key={apartment.id}
                                apartment={apartment}
                                setApartments={setApartments}
                            />
                        ))}
                    </div>
                </section>
            )}
            {false && (
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
            )}

            {/* Filter Modal */}
            <ReactModal
                isOpen={filterModalOpen}
                onRequestClose={() => setFilterModalOpen(false)}
                style={customStyles}
                ariaHideApp={false}
            >
                {/* Fixed Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                    <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                    <button
                        onClick={() => setFilterModalOpen(false)}
                        className="text-3xl text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>

                {/* Scrollable Content */}
                <div
                    className="h-full overflow-y-scroll p-1"
                    style={{ maxHeight: "calc(90vh - 120px)" }}
                >
                    {/* Accommodation Filter */}
                    <Accordian
                        multiple
                        value={["1", "2", "3", "4"]}
                        className="mb-4"
                    >
                        {/* Type Filter */}
                        <AccordianItem value="1" trigger="Property Type">
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <button
                                    type="button"
                                    onClick={() => toggleType("apartment")}
                                    className={`flex items-center justify-center gap-2 rounded-full border p-3 ${filters.types.includes("apartment") ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-300 hover:border-gray-400"}`}
                                >
                                    <HiOutlineBuildingOffice className="mb-1 h-6 w-6" />
                                    <span>Apartment</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toggleType("house")}
                                    className={`flex items-center justify-center gap-2 rounded-full border p-3 ${filters.types.includes("house") ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-300 hover:border-gray-400"}`}
                                >
                                    <HiOutlineHome className="mb-1 h-6 w-6" />
                                    <span>House</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toggleType("mansion")}
                                    className={`flex items-center justify-center gap-2 rounded-full border p-3 ${filters.types.includes("mansion") ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-300 hover:border-gray-400"}`}
                                >
                                    <GiGate className="mb-1 h-6 w-6" />
                                    <span>Mansion</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toggleType("hotel")}
                                    className={`flex items-center justify-center gap-2 rounded-full border p-3 ${filters.types.includes("hotel") ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-300 hover:border-gray-400"}`}
                                >
                                    <LiaHotelSolid className="mb-1 h-6 w-6" />
                                    <span>Hotel</span>
                                </button>
                            </div>
                        </AccordianItem>

                        {/* Price Filter */}
                        <AccordianItem value="2" trigger="Price Range">
                            <div className="mb-2 flex items-center justify-between gap-5">
                                <div className="relative">
                                    <span className="absolute top-2 left-3 text-gray-500">
                                        $
                                    </span>
                                    <input
                                        type="number"
                                        value={filters.priceRange[0]}
                                        onChange={(e) =>
                                            handleFilterChange("priceRange", [
                                                parseInt(e.target.value) || 0,
                                                filters.priceRange[1],
                                            ])
                                        }
                                        className="focus:ring-primary-700 focus:border-primary-700 w-24 rounded-full border border-gray-300 py-2 pr-3 pl-8"
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
                                            handleFilterChange("priceRange", [
                                                filters.priceRange[0],
                                                parseInt(e.target.value) ||
                                                    1000,
                                            ])
                                        }
                                        className="focus:ring-primary-700 focus:border-primary-700 w-24 rounded-full border border-gray-300 py-2 pr-3 pl-8"
                                    />
                                </div>
                            </div>
                            <RangeSlider
                                id="price-range-silder"
                                className="my-5"
                                min={0}
                                max={1000}
                                step={1}
                                value={filters.priceRange}
                                onInput={(e) =>
                                    handleFilterChange("priceRange", e)
                                }
                            />
                        </AccordianItem>

                        {/* Structure */}
                        <AccordianItem value="3" trigger="Structure">
                            <div className="flex flex-col gap-5">
                                {/* Rooms */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 font-semibold text-gray-700">
                                        <span className="text-primary-700 text-xl">
                                            {PropertyStructure["rooms"].icon}
                                        </span>
                                        Rooms
                                    </label>
                                    <div className="flex h-10 items-center rounded-full border border-gray-200">
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
                                            className="flex h-full items-center rounded-l-full bg-white p-2 text-xl font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={filters.rooms}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "rooms",
                                                    parseInt(e.target.value) ||
                                                        0,
                                                )
                                            }
                                            className="h-full w-20 border-none px-3 py-2 text-center focus:ring-0"
                                        />
                                        <button
                                            onClick={() =>
                                                handleFilterChange(
                                                    "rooms",
                                                    filters.rooms + 1,
                                                )
                                            }
                                            className="flex h-full items-center rounded-r-full bg-white p-2 text-xl font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                {/* Beds */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 font-semibold text-gray-700">
                                        <span className="text-primary-700 text-xl">
                                            {PropertyStructure["beds"].icon}
                                        </span>
                                        Beds
                                    </label>
                                    <div className="flex h-10 items-center rounded-full border border-gray-200">
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
                                            className="flex h-full items-center rounded-l-full bg-white p-2 text-xl font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={filters.beds}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "beds",
                                                    parseInt(e.target.value) ||
                                                        0,
                                                )
                                            }
                                            className="h-full w-20 border-none px-3 py-2 text-center focus:ring-0"
                                        />
                                        <button
                                            onClick={() =>
                                                handleFilterChange(
                                                    "beds",
                                                    filters.beds + 1,
                                                )
                                            }
                                            className="flex h-full items-center rounded-r-full bg-white p-2 text-xl font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                {/* Bathrooms */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 font-semibold text-gray-700">
                                        <span className="text-primary-700 text-xl">
                                            {
                                                PropertyStructure["bathrooms"]
                                                    .icon
                                            }
                                        </span>
                                        Bathrooms
                                    </label>
                                    <div className="flex h-10 items-center rounded-full border border-gray-200">
                                        <button
                                            onClick={() =>
                                                handleFilterChange(
                                                    "bathrooms",
                                                    Math.max(
                                                        0,
                                                        filters.bathrooms - 1,
                                                    ),
                                                )
                                            }
                                            className="flex h-full items-center rounded-l-full bg-white p-2 text-xl font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={filters.bathrooms}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "bathrooms",
                                                    parseInt(e.target.value) ||
                                                        0,
                                                )
                                            }
                                            className="h-full w-20 border-none px-3 py-2 text-center focus:ring-0"
                                        />
                                        <button
                                            onClick={() =>
                                                handleFilterChange(
                                                    "bathrooms",
                                                    filters.bathrooms + 1,
                                                )
                                            }
                                            className="flex h-full items-center rounded-r-full bg-white p-2 text-xl font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                {/* Guests */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 font-semibold text-gray-700">
                                        <span className="text-primary-700 text-xl">
                                            {PropertyStructure["guests"].icon}
                                        </span>
                                        Guests
                                    </label>
                                    <div className="flex h-10 items-center rounded-full border border-gray-200">
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
                                            className="flex h-full items-center rounded-l-full bg-white p-2 text-xl font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={filters.guests}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "guests",
                                                    parseInt(e.target.value) ||
                                                        0,
                                                )
                                            }
                                            className="h-full w-20 border-none px-3 py-2 text-center focus:ring-0"
                                        />
                                        <button
                                            onClick={() =>
                                                handleFilterChange(
                                                    "guests",
                                                    filters.guests + 1,
                                                )
                                            }
                                            className="flex h-full items-center rounded-r-full bg-white p-2 text-xl font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                {/* Area */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 font-semibold text-gray-700">
                                        <span className="text-primary-700 text-xl">
                                            {PropertyStructure["area"].icon}
                                        </span>
                                        Area
                                    </label>
                                    <div className="flex h-10 items-center rounded-full border border-gray-200">
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
                                            className="flex h-full items-center rounded-l-full bg-white p-2 text-xl font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={filters.area}
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    "area",
                                                    parseInt(e.target.value) ||
                                                        0,
                                                )
                                            }
                                            className="h-full w-20 border-none px-3 py-2 text-center focus:ring-0"
                                        />
                                        <button
                                            onClick={() =>
                                                handleFilterChange(
                                                    "area",
                                                    filters.area + 100,
                                                )
                                            }
                                            className="flex h-full items-center rounded-r-full bg-white p-2 text-xl font-medium text-gray-600 hover:bg-gray-50"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </AccordianItem>

                        {/* Amenities */}
                        <AccordianItem value="4" trigger="Amenities">
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                                {AMENITIES.map((amenity) => (
                                    <button
                                        key={amenity.id}
                                        type="button"
                                        onClick={() =>
                                            toggleAmenity(amenity.id)
                                        }
                                        className={`flex items-center justify-center rounded-full border p-3 ${
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
                        </AccordianItem>
                    </Accordian>
                </div>

                {/* Fixed Footer */}
                <div className="sticky bottom-0 flex justify-end space-x-3 border-t border-gray-200 bg-white px-6 py-4">
                    <Button
                        onClick={clearFilters}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Clear All
                    </Button>
                    <Button
                        onClick={applyFilters}
                        className="bg-primary-700 hover:bg-primary-800 border border-transparent text-white"
                    >
                        Apply Filters
                    </Button>
                </div>
            </ReactModal>
        </div>
    );
};

export default AdvancedSearchPage;
