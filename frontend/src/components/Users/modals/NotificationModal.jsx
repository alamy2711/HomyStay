// src/components/UserManagement/NotificationModal.jsx
import { useState } from "react";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";

const NotificationModal = ({ isOpen, onClose, onSubmit, user }) => {
    const [message, setMessage] = useState({
        subject: "",
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            userId: user.id,
            ...message,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Notification Modal"
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
                    <h2 className="text-lg font-bold">Send Notification</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <FiX size={20} />
                    </button>
                </div>
                <p className="mb-2">
                    To: {user?.firstName} {user?.lastName} ({user?.email})
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="subject"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                            value={message.subject}
                            onChange={(e) =>
                                setMessage({
                                    ...message,
                                    subject: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="content"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Message
                        </label>
                        <textarea
                            id="content"
                            rows={4}
                            className="focus:ring-primary-500 focus:border-primary-500 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                            value={message.content}
                            onChange={(e) =>
                                setMessage({
                                    ...message,
                                    content: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-white"
                        >
                            Send Notification
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default NotificationModal;
