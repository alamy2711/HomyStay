import { GiGate } from "react-icons/gi";
import { HiOutlineBuildingOffice, HiOutlineHome } from "react-icons/hi2";
import { LiaHotelSolid } from "react-icons/lia";

export const iconMap = {
    // Apartment Types
    apartment: {
        label: "Apartment",
        // icon: <i className="fa-solid fa-building"></i>,
        icon: <HiOutlineBuildingOffice className="h-5 w-5" />,
    },
    house: {
        label: "House",
        // icon: <i className="fa-solid fa-house"></i>,
        icon: <HiOutlineHome className="h-5 w-5" />,
    },
    mansion: {
        label: "Mansion",
        // icon: <i className="fa-solid fa-dungeon"></i>,
        icon: <GiGate className="h-5 w-5" />,
    },
    hotel: {
        label: "Hotel",
        // icon: <i className="fa-solid fa-hotel"></i>,
        icon: <LiaHotelSolid className="h-5 w-5" />,
    },
    // Amenities
    wifi: {
        label: "Wi-Fi",
        icon: <i className="fa-solid fa-wifi"></i>,
    },
    tv: {
        label: "TV",
        icon: <i className="fa-solid fa-tv"></i>,
    },
    air_conditioning: {
        label: "Air Conditioning",
        icon: <i className="fa-solid fa-wind"></i>,
    },
    pool: {
        label: "Swimming Pool",
        icon: <i className="fa-solid fa-water-ladder"></i>,
    },
    parking: {
        label: "Free Parking",
        icon: <i className="fa-solid fa-square-parking"></i>,
    },
    heating: {
        label: "Heating",
        icon: <i className="fa-solid fa-fire"></i>,
    },
    kitchen: {
        label: "Kitchen",
        icon: <i className="fa-solid fa-utensils"></i>,
    },
    washer: {
        label: "Washing Machine",
        icon: <i className="fa-solid fa-basket-shopping"></i>,
    },
    elevator: {
        label: "Elevator",
        icon: <i className="fa-solid fa-person-elevator"></i>,
        icon: <i className="fa-solid fa-elevator"></i>,
    },
    // Other
    // Add more as needed
};
