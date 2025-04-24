// src/components/UserManagement/ApartmentsModal.jsx
import ConfirmationModal from "@/components/Users/modals/ConfirmationModal";
import { FiTrash2, FiX } from "react-icons/fi";
import { TbExternalLink } from "react-icons/tb";
import Modal from "react-modal";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ApartmentsModal = ({
    isOpen,
    onClose,
    apartments,
    onDelete,
    modalState,
    openModal,
    closeModal,
}) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Apartments Modal"
                className={{
                    base: "modal-content",
                    afterOpen: "modal-content--after-open",
                    beforeClose: "modal-content--before-close",
                }}
                overlayClassName={{
                    base: "modal-overlay",
                    afterOpen: "modal-overlay--after-open",
                    beforeClose: "modal-overlay--before-close",
                }}
                closeTimeoutMS={300}
            >
                <div className="mx-auto min-w-2xs rounded-lg border border-gray-200 bg-white p-6 shadow-sm shadow-gray-300 md:min-w-md">
                    <div className="mb-4 flex items-start justify-between">
                        <h2 className="text-lg font-bold">User Apartments</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <FiX size={20} />
                        </button>
                    </div>
                    {apartments.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {apartments.map((apartment) => (
                                <li
                                    key={apartment.id}
                                    className="flex items-center justify-between py-3"
                                >
                                    <a
                                        href={`/apartments/${apartment.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-600 hover:text-primary-800 flex items-center hover:underline gap-1"
                                    >
                                        {apartment.title}
                                        <TbExternalLink />
                                    </a>
                                    <button
                                        // onClick={() => onDelete(apartment.id)}
                                        onClick={() =>
                                            openModal("deleteApartment", {
                                                apartment,
                                            })
                                        }
                                        className="rounded-full p-1 text-red-600 hover:bg-red-50 hover:text-red-900"
                                        data-tooltip-id="apartment-action-tooltip"
                                        data-tooltip-content="Delete Apartment"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">
                            This user has no apartments.
                        </p>
                    )}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-white"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>

            <ConfirmationModal
                isOpen={modalState.deleteApartment.isOpen}
                onClose={() => closeModal("deleteApartment")}
                onConfirm={() =>
                    onDelete(modalState.deleteApartment.apartment?.id)
                }
                title="Confirm Apartment Deletion"
                message={`Are you sure you want to delete ${modalState.deleteApartment.apartment?.title}?`}
                confirmText="Delete"
                confirmColor="red"
            />
            <ReactTooltip
                id="apartment-action-tooltip"
                className="z-105 font-[500]"
                style={{
                    backgroundColor: "var(--color-primary-700)",
                    color: "white",
                }}
            />
        </>
    );
};

export default ApartmentsModal;
