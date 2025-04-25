import axiosClient from "@/lib/axiosClient";
import { formatTimeAgo } from "@/utils/dateFormatter";
import LoadingSpinner from "@components/common/LoadingSpinner";
import { useEffect, useState } from "react";
import {
    HiCalendar as CalendarIcon,
    HiCheck as CheckIcon,
    HiCurrencyDollar as CurrencyDollarIcon,
    HiClock,
    HiOutlineBan,
    HiX as XIcon,
} from "react-icons/hi";

// Dummy reservation data
const RESERVATIONS = [
    {
        id: 1,
        apartment: {
            id: 101,
            title: "Modern Downtown Loft",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
            price: 150,
        },
        client: {
            id: 201,
            name: "John Doe",
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        check_in: "2023-08-15",
        check_out: "2023-08-20",
        total_amount: 750,
        status: "pending",
        created_at: "2023-07-10",
    },
    {
        id: 2,
        apartment: {
            id: 102,
            title: "Beachfront Villa",
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
            price: 300,
        },
        client: {
            id: 202,
            name: "Jane Smith",
            avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        check_in: "2023-09-01",
        check_out: "2023-09-07",
        total_amount: 1800,
        status: "pending",
        created_at: "2023-07-12",
    },
    {
        id: 3,
        apartment: {
            id: 103,
            title: "Cozy Mountain Cabin",
            image: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b",
            price: 200,
        },
        client: {
            id: 203,
            name: "Robert Johnson",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        check_in: "2023-08-25",
        check_out: "2023-08-30",
        total_amount: 1000,
        status: "accepted",
        created_at: "2023-07-05",
    },
    {
        id: 4,
        apartment: {
            id: 101,
            title: "Modern Downtown Loft",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
            price: 150,
        },
        client: {
            id: 204,
            name: "Emily Wilson",
            avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        check_in: "2023-09-10",
        check_out: "2023-09-15",
        total_amount: 750,
        status: "rejected",
        created_at: "2023-07-08",
    },
];

const RequestsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [reservationLoading, setReservationLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: "all",
        search: "",
    });

    useEffect(() => {
        // setReservationLoading(true);
        axiosClient
            .get("/reservations")
            .then((response) => {
                setReservations(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching reservations:", error);
            })
            .finally(() => {
                setReservationLoading(false);
            });
    }, [reservationLoading]);

    // Filter reservations based on status and search
    const filteredReservations = reservations
        .filter((reservation) => {
            const matchesStatus =
                filters.status === "all" ||
                reservation.status === filters.status;

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
                setReservationLoading(true);
            })
            .catch((error) => {
                console.error("Error updating reservation:", error);
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
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Reservation Requests
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Manage booking requests for your properties
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="flex-1">
                            <label
                                htmlFor="search"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Search by property or guest name..."
                                    className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10"
                                    value={filters.search}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            search: e.target.value,
                                        })
                                    }
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-48">
                            <label
                                htmlFor="status"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-lg border border-gray-300 px-4 py-2"
                                value={filters.status}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        status: e.target.value,
                                    })
                                }
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                                <option value="canceled">Canceled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Reservations Table */}
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                    {filteredReservations.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-gray-500">
                                No reservation requests found matching your
                                criteria
                            </p>
                        </div>
                    ) : reservationLoading ? (
                        <LoadingSpinner className="h-80" />
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {filteredReservations.map((reservation) => (
                                <div
                                    key={reservation.id}
                                    className="p-4 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex-colz grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:flex-row lg:items-center">
                                        {/* Apartment Info */}
                                        <div className="flex min-w-0 flex-1 items-center">
                                            <div className="h-16 w-16 flex-shrink-0">
                                                <img
                                                    className="h-16 w-16 rounded-md object-cover"
                                                    src={
                                                        reservation.apartment
                                                            .pictures[0].path
                                                    }
                                                    alt={
                                                        reservation.apartment
                                                            .title
                                                    }
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
                                                    <CurrencyDollarIcon className="mr-1 h-4 w-4" />
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
                                                <CalendarIcon className="h-5 w-5 text-gray-400" />
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
                                        <div className="flex items-center md:place-self-end md:self-center lg:w-32">
                                            <div className="flex-shrink-0">
                                                <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">
                                                    ${reservation.total_price}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Created At */}
                                        <div className="flex items-center lg:w-48">
                                            <div className="flex-shrink-0">
                                                <HiClock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <div className="ml-3">
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
                                        <div className="flex items-center justify-between md:place-self-end md:self-center lg:w-40 lg:justify-end">
                                            <StatusBadge
                                                status={reservation.status}
                                            />

                                            {/* {reservation.status ===
                                                "pending" && (
                                                <div className="ml-4 flex space-x-2">
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
                                                        <CheckIcon className="h-5 w-5" />
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
                                                        <XIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            )} */}
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
                                                            <CheckIcon className="h-5 w-5" />
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
                                                            <XIcon className="h-5 w-5" />
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RequestsPage;
