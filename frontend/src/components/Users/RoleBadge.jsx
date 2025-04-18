const RoleBadge = ({ role }) => {
    const roleClasses = {
        client: "bg-gray-100 text-gray-800",
        host: "bg-slate-200 text-slate-800",
        admin: "bg-violet-100 text-violet-800",
        super_admin: "bg-fuchsia-100 text-fuchsia-800",
    };

    return (
        <span
            className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${roleClasses[role]}`}
        >
            {role.replace("_", " ")}
        </span>
    );
};

export default RoleBadge;