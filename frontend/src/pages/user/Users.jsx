import { useAuth } from "@contexts/AuthContext";
import { useEffect, useState } from "react";
import { FiEye, FiMail, FiSearch, FiTrash2 } from "react-icons/fi";
import { RiUserAddLine } from "react-icons/ri";
import Modal from "react-modal";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import { Tooltip as ReactTooltip } from "react-tooltip";

// Components
import AdminCreationModal from "@/components/Users/modals/AdminCreationModal";
import ApartmentsModal from "@/components/Users/modals/ApartmentsModal";
import ConfirmationModal from "@/components/Users/modals/ConfirmationModal";
import NotificationModal from "@/components/Users/modals/NotificationModal";
import Button from "@components/common/Button";
import ReportsBadge from "@components/Users/ReportsBadge";
import RoleBadge from "@components/Users/RoleBadge";

// Set app element for react-modal
Modal.setAppElement("#root");

export default function Users() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState({
        value: "all",
        label: "All Roles",
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [modalState, setModalState] = useState({
        deleteUser: { isOpen: false, user: null },
        deleteApartment: { isOpen: false, apartment: null },
        notifyUser: { isOpen: false, user: null },
        createAdmin: { isOpen: false },
        viewApartments: { isOpen: false, apartments: [] },
    });
    const usersPerPage = 5;

    // Mock data - replace with API calls in production
    useEffect(() => {
        const mockUsers = [
            {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                profile_picture:
                    "https://randomuser.me/api/portraits/men/1.jpg",
                email: "john@example.com",
                role: "client",
                reports: 2,
                joinDate: "2023-01-15",
                apartments: [],
            },
            {
                id: 14,
                firstName: "John",
                lastName: "Doe",
                profile_picture:
                    "https://randomuser.me/api/portraits/men/2.jpg",
                email: "john@example.com",
                role: "host",
                reports: 5,
                joinDate: "2023-01-15",
                apartments: [],
            },
            {
                id: 24,
                firstName: "Jane",
                lastName: "Smith",
                profile_picture:
                    "https://randomuser.me/api/portraits/men/3.jpg",
                email: "jane@example.com",
                role: "host",
                reports: 0,
                joinDate: "2023-02-20",
                apartments: [
                    { id: 1, title: "Cozy Studio", link: "/apartments/1" },
                    { id: 2, title: "Luxury Penthouse", link: "/apartments/2" },
                ],
            },
            {
                id: 3,
                firstName: "Admin",
                lastName: "One",
                profile_picture:
                    "https://randomuser.me/api/portraits/men/4.jpg",
                email: "admin1@example.com",
                role: "admin",
                reports: null,
                joinDate: "2023-03-10",
                apartments: [],
            },
            {
                id: 4,
                firstName: "Super",
                lastName: "Admin",
                email: "super@example.com",
                role: "super_admin",
                reports: null,
                joinDate: "2023-01-05",
                apartments: [],
            },
            {
                id: 5,
                firstName: "Super",
                lastName: "Admin",
                email: "super@example.com",
                role: "super_admin",
                reports: null,
                joinDate: "2023-01-05",
                apartments: [],
            },
            {
                id: 144,
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                role: "client",
                reports: 55,
                joinDate: "2023-01-15",
                apartments: [],
            },
            {
                id: 134,
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                role: "client",
                reports: 0,
                joinDate: "2023-01-15",
                apartments: [],
            },
            // Add more mock users as needed
        ];
        setUsers(mockUsers);

        setLoading(false);
    }, []);

    // Role options for react-select
    const roleOptions = [
        { value: "all", label: "All Roles" },
        { value: "client", label: "Clients" },
        { value: "host", label: "Hosts" },
        ...(currentUser?.role === "super_admin"
            ? [
                  { value: "admin", label: "Admins" },
                //   { value: "super_admin", label: "Super Admins" },
              ]
            : []),
    ];

    // Filter and search logic
    const filteredUsers = users
        .filter((user) => {
            const matchesSearch =
                `${user.firstName} ${user.lastName} ${user.email}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesRole =
                selectedRole.value === "all" ||
                user.role === selectedRole.value;
            return matchesSearch && matchesRole;
        })
        .filter((user) => {
            // Access control based on authUser.role
            if (currentUser.role === "super_admin") {
                return user.role !== "super_admin"; // hide other super_admins
            }
            if (currentUser.role === "admin") {
                return user.role === "client" || user.role === "host";
            }
            return false; // deny all if not admin or super_admin
        });

    // Pagination logic
    const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
    const offset = currentPage * usersPerPage;
    const currentUsers = filteredUsers.slice(offset, offset + usersPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    // Modal handlers
    const openModal = (modalName, data = {}) => {
        setModalState((prev) => ({
            ...prev,
            [modalName]: { isOpen: true, ...data },
        }));
    };

    const closeModal = (modalName) => {
        setModalState((prev) => ({
            ...prev,
            [modalName]: { ...prev[modalName], isOpen: false },
        }));
    };

    // Action handlers
    const handleDeleteUser = () => {
        const userId = modalState.deleteUser.user?.id;
        if (userId) {
            setUsers(users.filter((user) => user.id !== userId));
        }
        closeModal("deleteUser");
    };

    const handleSendNotification = (messageData) => {
        // API call to send notification
        alert("Notification sent:", messageData);
        closeModal("notifyUser");
    };

    const handleDeleteApartment = (apartmentId) => {
        // API call to delete apartment
        console.log("Apartment deleted:", apartmentId);
        setModalState((prev) => ({
            ...prev,
            viewApartments: {
                ...prev.viewApartments,
                apartments: prev.viewApartments.apartments.filter(
                    (a) => a.id !== apartmentId,
                ),
            },
        }));
        closeModal("deleteApartment");
    };

    return (
        <section className="my-15 px-4 lg:px-6">
            <div className="mx-auto max-w-screen-xl overflow-hidden rounded-lg bg-white shadow-sm">
                {/* Header */}
                <div className="bg-primary-700z from-primary-700 to-primary-500 bg-gradient-to-r px-6 py-4">
                    <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-0">
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Users Management
                            </h1>
                            {currentUser?.role === "super_admin" && (
                                <p className="text-primary-100 mt-1">
                                    Super Admin Mode - Full access
                                </p>
                            )}
                        </div>
                        {currentUser?.role === "super_admin" && (
                            <Button
                                onClick={() => openModal("createAdmin")}
                                className="bg-primary-700 hover:bg-primary-800 te inline-flex items-center text-white shadow-sm"
                            >
                                <RiUserAddLine className="mr-2 h-4 w-4" />
                                Add New Admin
                            </Button>
                        )}
                    </div>
                </div>

                {/* Controls Section */}
                <div className="border-b border-gray-200 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Search */}
                        <div className="w-full md:w-1/3">
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <FiSearch className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-md border-gray-300 pl-10 sm:text-sm"
                                    placeholder="Search by name or email..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* Role Filter */}
                        <div className="w-full md:w-1/4">
                            <Select
                                options={roleOptions}
                                value={selectedRole}
                                onChange={setSelectedRole}
                                isSearchable={false}
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        borderColor: state.isFocused
                                            ? "var(--color-primary-700)"
                                            : base.borderColor,
                                        boxShadow: state.isFocused
                                            ? "0 0 0 1px var(--color-primary-700)"
                                            : base.boxShadow,
                                        "&:hover": {
                                            borderColor:
                                                "var(--color-primary-700)",
                                        },
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isSelected
                                            ? "var(--color-primary-700)" // selected
                                            : state.isFocused
                                              ? "var(--color-primary-100)" // hover
                                              : "white",
                                        color: state.isSelected
                                            ? "white"
                                            : "#000",
                                        ":active": {
                                            backgroundColor:
                                                "var(--color-primary-700)",
                                            color: "white",
                                        },
                                    }),
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-6 text-center">Loading users...</div>
                    ) : (
                        <>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            User
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            Join Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            Role
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            Reports
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            Apartments
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {currentUsers.length > 0 ? (
                                        currentUsers.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="duration-300 hover:bg-gray-100"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 overflow-hidden rounded-full">
                                                            <img
                                                                src={
                                                                    user.profile_picture ||
                                                                    "/images/defaultPFP.png"
                                                                }
                                                                alt="Profile"
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                                {user.firstName}{" "}
                                                                {user.lastName}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                    {new Date(
                                                        user.joinDate,
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <RoleBadge
                                                        role={user.role}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.role === "client" ||
                                                    user.role === "host" ? (
                                                        <ReportsBadge
                                                            reports={
                                                                user.reports
                                                            }
                                                        />
                                                    ) : (
                                                        <span className="text-base text-gray-700">
                                                            -
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                    {user.role === "host" ? (
                                                        <button
                                                            onClick={() =>
                                                                openModal(
                                                                    "viewApartments",
                                                                    {
                                                                        apartments:
                                                                            user.apartments,
                                                                    },
                                                                )
                                                            }
                                                            className="text-primary-600 hover:text-primary-900 flex items-center"
                                                        >
                                                            <FiEye className="mr-1" />
                                                            {
                                                                user.apartments
                                                                    .length
                                                            }{" "}
                                                            {user.apartments
                                                                .length === 1
                                                                ? "Apartment"
                                                                : "Apartments"}
                                                        </button>
                                                    ) : (
                                                        <span className="text-base text-gray-700">
                                                            -
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="space-x-2 px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                    {user.id !==
                                                        currentUser?.id && (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    openModal(
                                                                        "notifyUser",
                                                                        {
                                                                            user,
                                                                        },
                                                                    )
                                                                }
                                                                className="rounded-full p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                                                data-tooltip-id="action-tooltip"
                                                                data-tooltip-content="Notify User"
                                                            >
                                                                <FiMail
                                                                    size={18}
                                                                    className=""
                                                                />
                                                            </button>
                                                            {(currentUser?.role ===
                                                                "super_admin" ||
                                                                (currentUser?.role ===
                                                                    "admin" &&
                                                                    user.role !==
                                                                        "admin" &&
                                                                    user.role !==
                                                                        "super_admin")) && (
                                                                <button
                                                                    onClick={() =>
                                                                        openModal(
                                                                            "deleteUser",
                                                                            {
                                                                                user,
                                                                            },
                                                                        )
                                                                    }
                                                                    className="rounded-full p-1 text-red-600 hover:bg-red-100 hover:text-red-900"
                                                                    data-tooltip-id="action-tooltip"
                                                                    data-tooltip-content="Delete User"
                                                                >
                                                                    <FiTrash2
                                                                        size={
                                                                            18
                                                                        }
                                                                    />
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-6 py-4 text-center text-sm text-gray-500"
                                            >
                                                No users found matching your
                                                criteria
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="px-6 py-3 text-sm text-gray-500">
                                Showing {offset + 1} to{" "}
                                {Math.min(
                                    offset + usersPerPage,
                                    filteredUsers.length,
                                )}{" "}
                                of {filteredUsers.length} users
                            </div>
                        </>
                    )}
                </div>

                {/* Pagination */}
                {/* {pageCount > 1 && ( */}
                {
                    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                        <ReactPaginate
                            previousLabel={"←"}
                            nextLabel={"→"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"flex items-center space-x-2"}
                            pageLinkClassName="w-8 h-8 flex items-center justify-center  rounded-full text-sm cursor-pointer hover:bg-primary-200 bg-primary-50 transition"
                            activeLinkClassName="bg-gray-800 text-white bg-primary-500 hover:bg-primary-700"
                            previousLinkClassName="h-8 w-8 flex items-center justify-center rounded-full border border-gray-400 justify-center   text-sm cursor-pointer "
                            nextLinkClassName="h-8 w-8 flex items-center justify-center  rounded-full border border-gray-400 text-sm cursor-pointer"
                            disabledClassName={"opacity-50 cursor-not-allowed"}
                        />
                    </div>
                }

                {/* Modals */}
                <ConfirmationModal
                    isOpen={modalState.deleteUser.isOpen}
                    onClose={() => closeModal("deleteUser")}
                    onConfirm={handleDeleteUser}
                    title="Confirm User Deletion"
                    message={`Are you sure you want to delete ${modalState.deleteUser.user?.firstName} ${modalState.deleteUser.user?.lastName}?`}
                    confirmText="Delete"
                    confirmColor="red"
                    user={modalState.deleteUser.user}
                />

                <NotificationModal
                    isOpen={modalState.notifyUser.isOpen}
                    onClose={() => closeModal("notifyUser")}
                    onSubmit={handleSendNotification}
                    user={modalState.notifyUser.user}
                />

                <AdminCreationModal
                    isOpen={modalState.createAdmin.isOpen}
                    onClose={() => closeModal("createAdmin")}
                />

                <ApartmentsModal
                    isOpen={modalState.viewApartments.isOpen}
                    onClose={() => closeModal("viewApartments")}
                    apartments={modalState.viewApartments.apartments}
                    onDelete={handleDeleteApartment}
                    modalState={modalState}
                    openModal={openModal}
                    closeModal={closeModal}
                />

                <ReactTooltip
                    id="action-tooltip"
                    className="font-[500]"
                    style={{
                        backgroundColor: "var(--color-primary-700)",
                        color: "white",
                    }}
                />

                {/* Global styles for react-select and react-modal */}
                <style jsx="true" global="true">{`
                    .react-select-container .react-select__control {
                        border: 1px solid #d1d5db;
                        min-height: 38px;
                    }
                    .react-select-container .react-select__control--is-focused {
                        border-color: var(--color-primary-700);
                        box-shadow: 0 0 0 1px var(--color-primary-700);
                    }
                    .react-select-container .react-select__option--is-selected {
                        background-color: var(--color-primary-700);
                    }
                    .react-select-container .react-select__option--is-focused {
                        background-color: var(--color-primary-00);
                    }
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        zbackground-color: rgba(0, 0, 0, 0.5);
                        backdrop-filter: blur(8px);
                        background-color: rgba(255, 255, 255, 0.1);
                        transition: opacity 0.4s ease;
                        z-index: 100;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                `}</style>
            </div>
        </section>
    );
}
