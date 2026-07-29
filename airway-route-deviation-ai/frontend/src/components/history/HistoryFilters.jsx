import { Input } from "@/components/ui/input";

function HistoryFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
      <Input
        placeholder="Search by airport..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="md:w-80"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2"
      >
        <option value="All">All Reviews</option>
        <option value="Pending">Pending</option>
        <option value="Reviewed">Reviewed</option>
        <option value="Flagged">Flagged</option>
      </select>
    </div>
  );
}

export default HistoryFilters;