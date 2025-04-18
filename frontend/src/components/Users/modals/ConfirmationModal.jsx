// src/components/UserManagement/ConfirmationModal.jsx
import { FiX } from "react-icons/fi";
import Modal from "react-modal";

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    confirmColor = "primary",
    user
}) => {
    const colorClasses = {
        primary: "bg-primary-600 hover:bg-primary-700",
        red: "bg-red-600 hover:bg-red-700",
    };

    return (
        <Modal
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
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Confirmation Modal"
            // className="modal"
            // overlayClassName="modal-overlay"
        >
            <div className="mx-auto min-w-2xs rounded-lg border border-gray-200 bg-white p-6 shadow-sm shadow-gray-300 md:min-w-md">
                <div className="mb-4 flex items-start justify-between">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <FiX size={20} />
                    </button>
                </div>
                <p className="mb-6">{message}</p>
                {user?.reports > 0 && (
                    <div className="mb-6 border-l-2 border-red-500 bg-red-100 p-3 font-[500] text-red-500">
                        This user has {user.reports}{" "}
                        {user.reports === 1 ? "report" : "reports"}
                    </div>
                )}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`rounded-md px-4 py-2 text-white ${colorClasses[confirmColor]}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
