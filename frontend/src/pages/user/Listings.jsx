import {
    ArrowsUpDownIcon,
    EyeIcon,
    FunnelIcon,
    PencilIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import ApartmentModal from "../../components/Listings/ApartmentModal";

const ListingsPage = () => {
    // Sample apartment data
    const [apartments, setApartments] = useState([
        {
            id: 1,
            title: "Modern Downtown Loft",
            location: "New York, NY",
            price: 150,
            status: "active",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
            lastUpdated: "2023-05-15",
        },
        {
            id: 2,
            title: "Beachfront Villa",
            location: "Miami, FL",
            price: 300,
            status: "pending",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
            lastUpdated: "2023-06-20",
        },
        {
            id: 3,
            title: "Cozy Mountain Cabin",
            location: "Aspen, CO",
            price: 200,
            status: "inactive",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b",
            lastUpdated: "2023-04-10",
        },
    ]);

    // State for filters and sorting
    const [filters, setFilters] = useState({
        status: "all",
        search: "",
    });
    const [sortConfig, setSortConfig] = useState({
        key: "lastUpdated",
        direction: "desc",
    });

    // Filter and sort apartments
    const filteredApartments = apartments
        .filter((apartment) => {
            const matchesStatus =
                filters.status === "all" || apartment.status === filters.status;
            const matchesSearch =
                apartment.title
                    .toLowerCase()
                    .includes(filters.search.toLowerCase()) ||
                apartment.location
                    .toLowerCase()
                    .includes(filters.search.toLowerCase());
            return matchesStatus && matchesSearch;
        })
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });

    // Handle sorting
    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    // Handle delete
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this listing?")) {
            setApartments(
                apartments.filter((apartment) => apartment.id !== id),
            );
        }
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        const statusClasses = {
            active: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            inactive: "bg-gray-100 text-gray-800",
        };

        return (
            <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${statusClasses[status]}`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // In your ListingsPage component
    const [modalOpen, setModalOpen] = useState(false);
    const [currentApartment, setCurrentApartment] = useState(null);

    // Open modal for new apartment
    const handleNewApartment = () => {
        setCurrentApartment(null);
        setModalOpen(true);
    };

    // Open modal for editing
    const handleEdit = (apartment) => {
        setCurrentApartment(apartment);
        setModalOpen(true);
    };

    // Handle form submission
    const handleSubmit = async (apartmentData) => {
        alert (JSON.stringify(apartmentData));
        // try {
        //     if (currentApartment) {
        //         // Update existing apartment
        //         await updateApartment(currentApartment.id, apartmentData);
        //     } else {
        //         // Create new apartment
        //         await createApartment(apartmentData);
        //     }
        //     // Refresh listings
        //     fetchApartments();
        // } catch (error) {
        //     console.error("Error:", error);
        // }
    };

    return (
        <section className="my-15 px-4 lg:px-6">
            <div className="mx-auto max-w-screen-xl overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                {/* Header */}
                <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Your Listings
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Manage your properties and view their performance
                        </p>
                    </div>
                    <button
                        onClick={handleNewApartment}
                        className="bg-primary-700 hover:bg-primary-800 mt-4 flex items-center rounded-lg px-4 py-2 text-white transition-colors md:mt-0"
                    >
                        <PlusIcon className="mr-2 h-5 w-5" />
                        Add New Listing
                    </button>
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
                                    placeholder="Search by title or location..."
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
                                    <FunnelIcon className="h-5 w-5 text-gray-400" />
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
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* Apartments Table */}
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                    >
                                        Property
                                    </th>
                                    <th
                                        scope="col"
                                        className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        onClick={() => requestSort("location")}
                                    >
                                        <div className="flex items-center">
                                            Location
                                            <ArrowsUpDownIcon className="ml-1 h-4 w-4" />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        onClick={() => requestSort("price")}
                                    >
                                        <div className="flex items-center">
                                            Price
                                            <ArrowsUpDownIcon className="ml-1 h-4 w-4" />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        onClick={() => requestSort("rating")}
                                    >
                                        <div className="flex items-center">
                                            Rating
                                            <ArrowsUpDownIcon className="ml-1 h-4 w-4" />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        onClick={() => requestSort("status")}
                                    >
                                        <div className="flex items-center">
                                            Status
                                            <ArrowsUpDownIcon className="ml-1 h-4 w-4" />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        onClick={() =>
                                            requestSort("lastUpdated")
                                        }
                                    >
                                        <div className="flex items-center">
                                            Last Updated
                                            <ArrowsUpDownIcon className="ml-1 h-4 w-4" />
                                        </div>
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
                                {filteredApartments.length > 0 ? (
                                    filteredApartments.map((apartment) => (
                                        <tr
                                            key={apartment.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img
                                                            className="h-10 w-10 rounded-md object-cover"
                                                            src={
                                                                apartment.image
                                                            }
                                                            alt={
                                                                apartment.title
                                                            }
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {apartment.title}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {apartment.location}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    ${apartment.price}/night
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {apartment.rating}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge
                                                    status={apartment.status}
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {apartment.lastUpdated}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                <div className="flex justify-end space-x-2">
                                                    <Link
                                                        to={`/listings/${apartment.id}`}
                                                        className="text-primary-600 hover:text-primary-900"
                                                        title="View"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                    </Link>
                                                    <Link
                                                        to={`/listings/${apartment.id}/edit`}
                                                        className="text-yellow-600 hover:text-yellow-900"
                                                        title="Edit"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                apartment.id,
                                                            )
                                                        }
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Delete"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            No listings found matching your
                                            criteria
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Pagination (would be implemented with real API) */}
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to{" "}
                        <span className="font-medium">3</span> of{" "}
                        <span className="font-medium">3</span> results
                    </div>
                    <div className="flex space-x-2">
                        <button
                            disabled
                            className="cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500"
                        >
                            Previous
                        </button>
                        <button
                            disabled
                            className="cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Modal */}
                <ApartmentModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    apartment={currentApartment}
                    onSubmit={handleSubmit}
                />
            </div>
        </section>
    );
};

export default ListingsPage;
