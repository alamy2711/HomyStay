export default function ReportsBadge ({ reports }) {
    if (reports === null || reports === undefined) return <span>-</span>;

    const badgeClasses =
        reports > 3
            ? "bg-red-100 text-red-800"
            : reports > 0
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800";

    return (
        <span
            className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${badgeClasses}`}
        >
            {reports} {reports === 1 ? "report" : "reports"}
        </span>
    );
};
