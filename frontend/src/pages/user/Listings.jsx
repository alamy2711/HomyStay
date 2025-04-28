import axiosClient from "@/lib/axiosClient";
import ListingsTableSkeleton from "@components/skeletons/ListingsTableSkeleton";
import { useEffect, useState } from "react";
import {
    HiOutlineArrowsUpDown,
    HiOutlineEye,
    HiOutlinePencil,
    HiOutlineTrash,
} from "react-icons/hi2";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ApartmentModal from "../../components/Listings/ApartmentModal";
import { formatDate } from "../../utils/dateFormatter";

// Components
import Button from "@components/common/Button";
import { BsHouseAdd } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import Select from "react-select";

const ListingsPage = () => {
    const [apartments, setApartments] = useState([]);
    const [listingsLoading, setListingsLoading] = useState(true);

    useEffect(() => {
        axiosClient
            .get("/listings")
            .then((response) => {
                setApartments(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            })
            .finally(() => {
                setListingsLoading(false);
            });
    }, [listingsLoading]);

    const [sortConfig, setSortConfig] = useState({
        key: "lastUpdated",
        direction: "desc",
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
        console.log("id: ", id);
        axiosClient
            .delete(`/apartments/${id}`)
            .then((response) => {
                setListingsLoading(true);
                toast.success("Apartment deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting apartment:", error);
            });
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        const statusClasses = {
            available: "bg-green-100 text-green-800",
            reserved: "bg-yellow-100 text-yellow-800",
            expired: "bg-red-100 text-red-800",
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

    // Filter & Sort logic
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState({
        value: "all",
        label: "All Statuses",
    });
    const filteredApartments = apartments
        .filter((apartment) => {
            const matchesSearch =
                `${apartment.title} ${apartment.country} ${apartment.city}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            const matchesStatus =
                selectedStatus.value === "all" ||
                apartment.status === selectedStatus.value;
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

    // Pagination logic
    const [currentPage, setCurrentPage] = useState(0);
    const apartmentPerPage = 5;
    const pageCount = Math.ceil(filteredApartments.length / apartmentPerPage);
    const offset = currentPage * apartmentPerPage;
    const currentApartments = filteredApartments.slice(
        offset,
        offset + apartmentPerPage,
    );
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <section className="my-15 px-4 lg:px-6">
            <div className="mx-auto max-w-screen-xl overflow-hidden rounded-lg bg-white shadow-sm">
                {/* Header */}
                <div className="from-primary-600 to-primary-700 bg-gradient-to-br px-6 py-4">
                    <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:gap-0 md:text-left">
                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                Your Listings
                            </h1>
                            <p className="text-primary-100 mt-1">
                                Manage your properties and view their
                                performance
                            </p>
                        </div>
                        <Button
                            onClick={handleNewApartment}
                            className="bg-primary-800/45 hover:bg-primary-800 te inline-flex items-center text-white shadow-sm"
                        >
                            <BsHouseAdd className="mr-2 h-4.5 w-4.5" />
                            Add New Property
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="border-b border-gray-200 p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Search */}
                        <div className="w-full md:w-1/3">
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <IoSearchOutline className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-md border-gray-300 pl-10 sm:text-sm"
                                    placeholder="Search by property title, country, or city..."
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
                                options={[
                                    { value: "all", label: "All Statuses" },
                                    { value: "available", label: "Available" },
                                    { value: "reserved", label: "Reserved" },
                                    { value: "expired", label: "Expired" },
                                ]}
                                value={selectedStatus}
                                onChange={setSelectedStatus}
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
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Apartments Table */}
                {listingsLoading ? (
                    <ListingsTableSkeleton />
                ) : (
                    <div className="overflow-hidden border-b border-gray-200 bg-white">
                        <div className="min-h-100 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                        >
                                            Property
                                        </th>
                                        {/* <th
                                                scope="col"
                                                className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                                onClick={() =>
                                                    requestSort("location")
                                                }
                                            >
                                                <div className="flex items-center">
                                                    Location
                                                    <ArrowsUpDownIcon className="ml-1 h-4 w-4" />
                                                </div>
                                            </th> */}
                                        <th
                                            scope="col"
                                            className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                            onClick={() => requestSort("price")}
                                        >
                                            <div className="flex items-center">
                                                Price
                                                <HiOutlineArrowsUpDown className="ml-1 h-4 w-4" />
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                            onClick={() =>
                                                requestSort("rating")
                                            }
                                        >
                                            <div className="flex items-center">
                                                Rating
                                                <HiOutlineArrowsUpDown className="ml-1 h-4 w-4" />
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                            onClick={() =>
                                                requestSort("status")
                                            }
                                        >
                                            <div className="flex items-center">
                                                Status
                                                <HiOutlineArrowsUpDown className="ml-1 h-4 w-4" />
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
                                                <HiOutlineArrowsUpDown className="ml-1 h-4 w-4" />
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
                                    {currentApartments.length > 0 ? (
                                        currentApartments.map((apartment) => (
                                            <tr
                                                key={apartment.id}
                                                className="duration-300 hover:bg-gray-100"
                                            >
                                                <td className="max-w-80 overflow-hidden px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0">
                                                            <img
                                                                className="h-10 w-10 rounded-md object-cover"
                                                                src={
                                                                    apartment
                                                                        .pictures[0]
                                                                        .path
                                                                }
                                                                alt={
                                                                    apartment.title
                                                                }
                                                            />
                                                        </div>
                                                        <div className="ml-4 overflow-hidden">
                                                            <div className="truncate text-sm font-medium text-gray-900">
                                                                {
                                                                    apartment.title
                                                                }
                                                            </div>
                                                            <div className="truncate text-sm font-medium text-gray-500">
                                                                {
                                                                    // apartment.location
                                                                    apartment.country
                                                                }
                                                                ,{" "}
                                                                {apartment.city}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* Location */}
                                                {/* <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-gray-900">
                                                                {
                                                                    // apartment.location
                                                                    apartment.country
                                                                }
                                                                ,{" "}
                                                                {apartment.city}
                                                            </div>
                                                        </td> */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        ${apartment.price}
                                                        /night
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {apartment.rating}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge
                                                        status={
                                                            apartment.status
                                                        }
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {formatDate(
                                                            new Date(
                                                                apartment.check_in,
                                                            ),
                                                            "dd MMM",
                                                        )}{" "}
                                                        -{" "}
                                                        {formatDate(
                                                            new Date(
                                                                apartment.check_out,
                                                            ),
                                                            "dd MMM",
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                    <div className="flex justify-end space-x-2">
                                                        <a
                                                            target="_blank"
                                                            href="apartment-details"
                                                            className="text-primary-600 hover:text-primary-900"
                                                            title="View"
                                                        >
                                                            <HiOutlineEye className="h-5 w-5" />
                                                        </a>
                                                        <button
                                                            disabled={
                                                                apartment.status ===
                                                                "reserved"
                                                            }
                                                            onClick={() => {
                                                                handleEdit(
                                                                    apartment,
                                                                );
                                                            }}
                                                            className="text-yellow-600 hover:text-yellow-900 disabled:opacity-50"
                                                            title="Edit"
                                                        >
                                                            <HiOutlinePencil className="h-5 w-5" />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    apartment.id,
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900"
                                                            title="Delete"
                                                        >
                                                            <HiOutlineTrash className="h-5 w-5" />
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
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="text-sm text-gray-700">
                        Showing {offset + 1} -{" "}
                        {Math.min(
                            offset + apartmentPerPage,
                            filteredApartments.length,
                        )}{" "}
                        of {filteredApartments.length} apartments
                    </div>
                    <div className="flex space-x-2">
                        {pageCount > 1 && (
                            <ReactPaginate
                                previousLabel={"←"}
                                nextLabel={"→"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={
                                    "flex items-center space-x-2"
                                }
                                pageLinkClassName="w-8 h-8 flex items-center justify-center  rounded-full text-sm cursor-pointer hover:bg-primary-200 bg-primary-50 transition"
                                activeLinkClassName="bg-gray-800 text-white bg-primary-500 hover:bg-primary-700"
                                previousLinkClassName="h-8 w-8 flex items-center justify-center rounded-full border border-gray-400 justify-center   text-sm cursor-pointer "
                                nextLinkClassName="h-8 w-8 flex items-center justify-center  rounded-full border border-gray-400 text-sm cursor-pointer"
                                disabledClassName={
                                    "opacity-50 cursor-not-allowed"
                                }
                            />
                        )}
                    </div>
                </div>

                {/* Modal */}
                <ApartmentModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    apartment={currentApartment}
                    setListingsLoading={setListingsLoading}
                />
            </div>
        </section>
    );
};

export default ListingsPage;
