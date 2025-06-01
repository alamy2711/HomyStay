import axiosClient from "@/lib/axiosClient";
import { formatTimeAgo } from "@/utils/dateFormatter";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Icons
import { HiCheck, HiOutlineBan, HiOutlineSearch, HiX } from "react-icons/hi";
import {
    HiOutlineCalendar,
    HiOutlineClock,
    HiOutlineCurrencyDollar,
    HiOutlineTrash,
} from "react-icons/hi2";

// Components
import ReservationsTableSkeleton from "@components/skeletons/ReservationsTableSkeleton";
import Select from "react-select";

export default function Requests() {
    const [reservations, setReservations] = useState([]);
    const [reservationLoading, setReservationLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: {
            value: "all",
            label: "All Statuses",
        },
        search: "",
    });

    useEffect(() => {
        // setReservationLoading(true);
        axiosClient
            .get("/requests")
            .then((response) => {
                setReservations(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching reservations:", error);
                toast.error("Error fetching reservations.");
            })
            .finally(() => {
                setReservationLoading(false);
            });
    }, [reservationLoading]);

    // Filter reservations based on status and search
    const filteredReservations = reservations
        .filter((reservation) => {
            const matchesStatus =
                filters.status.value === "all" ||
                reservation.status === filters.status.value;

            const matchesSearch =
                `${reservation.apartment.title} ${reservation.client.first_name} ${reservation.client.last_name}`
                    .toLowerCase()
                    .includes(filters.search.toLowerCase());

            return matchesStatus && matchesSearch;
        })
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Newest first;

    // Handle status change
    const handleStatusChange = (reservationId, newStatus) => {
        axiosClient
            .put(`/requests/${reservationId}/status`, {
                status: newStatus,
            })
            .then((response) => {
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error("Error updating reservation status:", error);
                toast.error("Faild to update reservation status.");
            })
            .finally(() => {
                setReservationLoading(true);
            });
    };

    // Handle delete
    const handleDelete = (reservationId) => {
        axiosClient
            .delete(`/requests/${reservationId}`)
            .then((response) => {
                console.log(response.data.message);
                setReservationLoading(true);
            })
            .catch((error) => {
                console.error("Error deleting reservation:", error);
            });
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        const statusClasses = {
            pending: "bg-yellow-100 text-yellow-800",
            accepted: "bg-green-100 text-green-800",
            rejected: "bg-red-100 text-red-800",
            canceled: "bg-gray-100 text-gray-800",
        };

        return (
            <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${statusClasses[status]}`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <section className="my-15 px-4 lg:px-6">
            <div className="mx-auto max-w-screen-xl overflow-hidden rounded-lg bg-white shadow-sm">
                {/* Header */}
                <div className="from-primary-600 to-primary-700 bg-gradient-to-br px-6 py-4">
                    <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:gap-0 md:text-left">
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Your Requests
                            </h1>
                            <p className="text-primary-100 mt-1">
                                Manage booking requests
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="border-b border-gray-200 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Search */}
                        <div className="w-full md:w-1/3">
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <HiOutlineSearch className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-md border-gray-300 pl-10 sm:text-sm"
                                    placeholder="Search by property or client name..."
                                    value={filters.search}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            search: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        {/* Role Filter */}
                        <div className="w-full md:w-1/4">
                            <Select
                                options={[
                                    { value: "all", label: "All Statuses" },
                                    {
                                        value: "pending",
                                        label: "Pending",
                                    },
                                    {
                                        value: "accepted",
                                        label: "Accepted",
                                    },
                                    {
                                        value: "rejected",
                                        label: "Rejected",
                                    },
                                    {
                                        value: "canceled",
                                        label: "Canceled",
                                    },
                                ]}
                                value={filters.status}
                                onChange={(selectedOption) => {
                                    setFilters({
                                        ...filters,
                                        status: selectedOption,
                                    });
                                }}
                                isSearchable={false}
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
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
                                    menuPortal: (base) => ({
                                        ...base,
                                        zIndex: 150,
                                    }),
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Reservations Table */}
                <div className="overflow-hidden border border-gray-100 bg-white shadow-sm">
                    {reservationLoading ? (
                        [1, 2, 3, 4, 5].map((index) => (
                            <ReservationsTableSkeleton key={index} />
                        ))
                    ) : filteredReservations.length === 0 ? (
                        <div className="flex h-80 items-center justify-center">
                            <p className="text-gray-500">
                                No reservations found matching your criteria
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {filteredReservations.map((reservation) => (
                                <div
                                    key={reservation.id}
                                    className="p-4 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex-colz grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:flex-row lg:items-center">
                                        {/* Apartment Info */}
                                        <div className="flex min-w-0 flex-1 items-center lg:mr-8">
                                            <div className="h-16 w-16 flex-shrink-0">
                                                <img
                                                    className="h-16 w-16 rounded-md object-cover"
                                                    src={
                                                        reservation.apartment
                                                            .pictures[0].path
                                                    }
                                                    alt="Apartment picture"
                                                />
                                            </div>
                                            <div className="ml-4 min-w-0">
                                                <h3 className="truncate text-sm font-medium text-gray-900">
                                                    {
                                                        reservation.apartment
                                                            .title
                                                    }
                                                </h3>
                                                <p className="mt-1 flex items-center text-sm text-gray-500">
                                                    <HiOutlineCurrencyDollar className="mr-1 h-4 w-4" />
                                                    $
                                                    {
                                                        reservation.apartment
                                                            .price
                                                    }
                                                    /night
                                                </p>
                                            </div>
                                        </div>

                                        {/* Client Info */}
                                        <div className="flex items-center md:col-span-2 lg:w-48">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={
                                                        reservation.client
                                                            .profile_picture
                                                    }
                                                    alt="avatar"
                                                />
                                            </div>
                                            <div className="ml-3 min-w-0">
                                                <p className="truncate text-sm font-medium text-gray-900">
                                                    {
                                                        reservation.client
                                                            .first_name
                                                    }{" "}
                                                    {
                                                        reservation.client
                                                            .last_name
                                                    }
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Client
                                                </p>
                                            </div>
                                        </div>

                                        {/* Dates */}
                                        <div className="flex items-center lg:w-48">
                                            <div className="flex-shrink-0">
                                                <HiOutlineCalendar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-900">
                                                    {new Date(
                                                        reservation.check_in,
                                                    ).toLocaleDateString()}{" "}
                                                    -{" "}
                                                    {new Date(
                                                        reservation.check_out,
                                                    ).toLocaleDateString()}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {Math.floor(
                                                        (new Date(
                                                            reservation.check_out,
                                                        ) -
                                                            new Date(
                                                                reservation.check_in,
                                                            )) /
                                                            (1000 *
                                                                60 *
                                                                60 *
                                                                24),
                                                    )}{" "}
                                                    nights
                                                </p>
                                            </div>
                                        </div>

                                        {/* Amount */}
                                        <div className="flex items-center gap-2 md:place-self-end md:self-center lg:w-32">
                                            <div className="flex-shrink-0">
                                                <HiOutlineCurrencyDollar className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    ${reservation.total_price}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Created At */}
                                        <div className="flex items-center gap-2 lg:w-48">
                                            <div className="flex-shrink-0">
                                                <HiOutlineClock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <div>
                                                {/* <p className="text-xs text-gray-500">
                                                        Requested
                                                    </p> */}
                                                <p className="text-sm text-gray-900">
                                                    {formatTimeAgo(
                                                        new Date(
                                                            reservation.created_at,
                                                        ),
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Status and Actions */}
                                        <div className="flex items-center justify-between md:place-self-end md:self-center lg:w-30 lg:justify-end">
                                            <StatusBadge
                                                status={reservation.status}
                                            />

                                            <div className="ml-4 flex space-x-2">
                                                {reservation.status ===
                                                    "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    reservation.id,
                                                                    "accepted",
                                                                )
                                                            }
                                                            className="rounded-md bg-green-100 p-1.5 text-green-700 hover:bg-green-200"
                                                            title="Accept"
                                                        >
                                                            <HiCheck className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    reservation.id,
                                                                    "rejected",
                                                                )
                                                            }
                                                            className="rounded-md bg-red-100 p-1.5 text-red-700 hover:bg-red-200"
                                                            title="Reject"
                                                        >
                                                            <HiX className="h-5 w-5" />
                                                        </button>
                                                    </>
                                                )}
                                                {reservation.status ===
                                                    "accepted" && (
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                reservation.id,
                                                                "canceled",
                                                            )
                                                        }
                                                        className="rounded-md bg-gray-100 p-1.5 text-gray-700 hover:bg-gray-200"
                                                        title="Cancel"
                                                    >
                                                        <HiOutlineBan className="h-5 w-5" />
                                                    </button>
                                                )}
                                                {(reservation.status ===
                                                    "rejected" ||
                                                    reservation.status ===
                                                        "canceled") && (
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                reservation.id,
                                                            )
                                                        }
                                                        className="rounded-md bg-red-100 p-1.5 text-red-700 hover:bg-red-200"
                                                        title="Delete"
                                                    >
                                                        <HiOutlineTrash className="h-5 w-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
