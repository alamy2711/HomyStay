import {
    ArrowLeftOnRectangleIcon,
    BellIcon,
    ChevronDownIcon,
    CogIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import Select, { components } from "react-select";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const options = [
    {
        href: "/profile",
        label: "My Profile",
        icon: <UserCircleIcon className="h-5 w-5 text-gray-500" />,
    },
    {
        href: "/settings",
        label: "Settings",
        icon: <CogIcon className="h-5 w-5 text-gray-500" />,
    },
    {
        href: "/notifications",
        label: "Notifications",
        icon: <BellIcon className="h-5 w-5 text-gray-500" />,
    },
    {
        href: "/logout",
        label: "Log Out",
        icon: <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-500" />,
    },
];

// Custom Option component with icon
const Option = (props) => (
    <components.Option {...props}>
        <div className="flex items-center space-x-2">
            {props.data.icon}
            <Link to={props.data.href}>{props.data.label}</Link>
        </div>
    </components.Option>
);

// Custom ValueContainer to show user avatar and name
const ValueContainer = ({ children, ...props }) => {
  const { user } = useAuth();

  return (
    <components.ValueContainer {...props}>
        <div className="flex items-center space-x-2">
            <img
                src={user.profile_picture}
                alt="User"
                className="h-8 w-8 rounded-full"
            />
            <span className="font-medium">{user?.first_name}</span>
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
        </div>
    </components.ValueContainer>
)};

// Hide the default dropdown indicator
const DropdownIndicator = () => null;

export default function UserDrowpdownMenu() {
    

    return (
        <Select
            options={options}
            components={{
                Option,
                // ValueContainer,
                DropdownIndicator,
                IndicatorSeparator: () => null,
            }}
            isSearchable={false}
            placeholder=""
            className="react-select-container"
            classNamePrefix="react-select"
            onChange={(selectedOption) => {
                console.log("Selected:", selectedOption);
                // Handle selection here
            }}
            styles={{
                control: (provided) => ({
                    ...provided,
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    minHeight: "auto",
                }),
                menu: (provided) => ({
                    ...provided,
                    width: "200px",
                    marginTop: "8px",
                    borderRadius: "0.5rem",
                    boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }),
                option: (provided, state) => ({
                    ...provided,
                    padding: "0.5rem 1rem",
                    backgroundColor: state.isSelected
                        ? "#f3f4f6"
                        : state.isFocused
                          ? "#f9fafb"
                          : "white",
                    color: "#111827",
                    ":active": {
                        backgroundColor: "#f3f4f6",
                    },
                }),
            }}
        />
    );
}
