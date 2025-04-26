import React from "react";

export default function UsersTableSkeleton() {
    return (
        // <div className="grid animate-pulse grid-cols-13 items-center justify-between p-4">
        //     <div className="col-span-4 flex w-full items-center gap-4">
        //         <div className="mb-2.5 h-16 w-16 rounded-lg bg-gray-300"></div>
        //         <div className="space-y-2 w-full flex flex-col">
        //             <div className="h-2 w-60z w-full rounded-full bg-gray-200"></div>
        //             <div className="h-2 w-32 rounded-full bg-gray-200"></div>
        //         </div>
        //     </div>
        //     <div className="col-span-2 flex items-center gap-4">
        //         <div className="mb-2.5 h-10 w-10 rounded-full bg-gray-300"></div>
        //         <div className="space-y-2">
        //             <div className="h-2 w-20 rounded-full bg-gray-200"></div>
        //             <div className="h-2 w-10 rounded-full bg-gray-200"></div>
        //         </div>
        //     </div>
        //     <div className="col-span-2 h-2.5 w-12z rounded-full bg-gray-300"></div>
        //     <div className="col-span-1 h-2.5 w-12 rounded-full bg-gray-300"></div>
        //     <div className="col-span-1 h-2.5 w-25 rounded-full bg-gray-300"></div>
        //     <div className="col-span-3 flex justify-end items-center gap-2">
        //         <div className="h-5 w-5 rounded-lg bg-gray-300"></div>
        //         <div className="h-5 w-5 rounded-lg bg-gray-300"></div>
        //         <div className="h-5 w-5 rounded-lg bg-gray-300"></div>
        //     </div>
        // </div>

        <div className="animate-pulse p-4 transition-colors">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:flex-row lg:items-center">
                {/* Apartment Info */}
                <div className="flex min-w-0 flex-1 items-center lg:mr-8">
                    <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-300"></div>
                    <div className="ml-4 min-w-0">
                        <div className="zw-full h-2 w-50 rounded-full bg-gray-200"></div>
                        <div className="zw-full mt-2 h-2 w-25 rounded-full bg-gray-200"></div>
                    </div>
                </div>

                {/* Client Info */}
                <div className="flex items-center md:col-span-2 lg:w-48">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
                    <div className="ml-3 min-w-0 space-y-2">
                        <p className="h-2 w-20 rounded-full bg-gray-200"></p>
                        <p className="h-2 w-10 rounded-full bg-gray-200"></p>
                    </div>
                </div>

                {/* Dates */}
                <div className="flex items-center lg:w-48">
                    <div className="h-5 w-5 rounded-lg bg-gray-200"></div>
                    <div className="ml-3 space-y-2">
                        <p className="h-2 w-35 rounded-lg bg-gray-200"></p>
                        <p className="h-2 w-10 rounded-lg bg-gray-200"></p>
                    </div>
                </div>

                {/* Amount */}
                <div className="flex items-center gap-2 md:place-self-end md:self-center lg:w-32">
                    <div className="h-5 w-5 rounded-lg bg-gray-200"></div>
                    <p className="h-2 w-15 rounded-lg bg-gray-200"></p>
                </div>

                {/* Created At */}
                <div className="flex items-center gap-2 lg:w-48">
                    <div className="h-5 w-5 rounded-lg bg-gray-200"></div>
                    <p className="h-2 w-20 rounded-lg bg-gray-200"></p>
                </div>

                {/* Status and Actions */}
                <div className="flex  gap-4 items-center justify-between md:place-self-end md:self-center lg:w-30 lg:justify-end">
                    <p className="h-5 w-18 rounded-full bg-gray-200"></p>
                    <div className="h-8 w-8 rounded-lg bg-gray-200"></div>
                </div>
            </div>
        </div>
    );
}
