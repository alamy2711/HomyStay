import { BsDoorClosed } from "react-icons/bs";
import { TbBed } from "react-icons/tb";
import { LuBath } from "react-icons/lu";
import { HiOutlineUsers } from "react-icons/hi2";
import { RxRulerSquare } from "react-icons/rx";

const PropertyStructureArray = [
    { id: "rooms", name: "Rooms", icon: <BsDoorClosed /> },
    { id: "beds", name: "Beds", icon: <TbBed /> },
    { id: "bathrooms", name: "Bathrooms", icon: <LuBath /> },
    { id: "guests", name: "Guests", icon: <HiOutlineUsers /> },
    { id: "area", name: "Area", icon: <RxRulerSquare /> },
];

// PropertyStructure object
const PropertyStructure = {
    rooms: { name: "Rooms", icon: <BsDoorClosed /> },
    beds: { name: "Beds", icon: <TbBed /> },
    bathrooms: { name: "Bathrooms", icon: <LuBath /> },
    guests: { name: "Guests", icon: <HiOutlineUsers /> },
    area: { name: "Area", icon: <RxRulerSquare /> },
};

export default PropertyStructure;
