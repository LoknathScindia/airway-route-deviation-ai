import { Bell, Search, UserCircle2 } from "lucide-react";

function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Flight Operations Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Monitor AI predictions and flight operations in real time.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="flex items-center gap-3 rounded-xl border bg-slate-50 px-4 py-2">
          <Search size={18} className="text-slate-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
        </div>

        {/* Notifications */}
        <button className="rounded-full bg-slate-100 p-3 transition hover:bg-slate-200">
          <Bell size={20} />
        </button>

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-2 transition hover:bg-slate-200">
          <UserCircle2 size={28} />

          <div className="text-left">
            <p className="text-sm font-semibold">
              Administrator
            </p>

            <p className="text-xs text-slate-500">
              Flight
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Topbar;