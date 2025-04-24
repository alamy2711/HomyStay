import { FaWifi, FaParking, FaSwimmingPool, FaTv, FaSnowflake, FaUtensils, FaHotTub, FaPaw, FaSmokingBan, FaWheelchair, FaConciergeBell, FaLuggageCart } from "react-icons/fa";
import { MdOutlineKitchen, MdOutlineLocalLaundryService, MdOutlineAir } from "react-icons/md";

const AMENITIES = [
    { id: "wifi", name: "WiFi", icon: <FaWifi /> },
    { id: "parking", name: "Parking", icon: <FaParking /> },
    { id: "pool", name: "Pool", icon: <FaSwimmingPool /> },
    { id: "tv", name: "TV", icon: <FaTv /> },
    { id: "kitchen", name: "Kitchen", icon: <MdOutlineKitchen /> },
    { id: "ac", name: "Air Conditioning", icon: <FaSnowflake /> },
    { id: "breakfast", name: "Breakfast", icon: <FaUtensils /> },
    { id: "hot_tub", name: "Hot Tub", icon: <FaHotTub /> },
    { id: "pets", name: "Pets Allowed", icon: <FaPaw /> },
    { id: "no_smoking", name: "No Smoking", icon: <FaSmokingBan /> },
    { id: "accessible", name: "Wheelchair Accessible", icon: <FaWheelchair /> },
    { id: "laundry", name: "Laundry", icon: <MdOutlineLocalLaundryService /> },
    { id: "concierge", name: "Concierge", icon: <FaConciergeBell /> },
    { id: "luggage", name: "Luggage Storage", icon: <FaLuggageCart /> },
    { id: "airport_shuttle", name: "Airport Shuttle", icon: <MdOutlineAir /> },
];

export default AMENITIES;