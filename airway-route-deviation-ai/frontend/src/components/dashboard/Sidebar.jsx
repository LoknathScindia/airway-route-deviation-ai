import {
  LayoutDashboard,
  Plane,
  History,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Prediction",
    path: "/prediction",
    icon: Plane,
  },
  {
    title: "History",
    path: "/history",
    icon: History,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col bg-slate-900 text-white">
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-3xl font-bold tracking-wide">
          ✈ Flight
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          AI Flight Operations
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `mb-2 flex w-full items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={22} />

              <span className="text-base font-medium">
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition-all duration-300 hover:bg-red-500 hover:text-white">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;