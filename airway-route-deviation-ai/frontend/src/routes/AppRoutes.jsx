import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import Dashboard from "@/pages/Dashboard";
import Prediction from "@/pages/Prediction";
import History from "@/pages/History";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

function ProtectedPage({ children }) {
  return (
    <ProtectedRoute>
      <MainLayout>{children}</MainLayout>
    </ProtectedRoute>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedPage>
              <Dashboard />
            </ProtectedPage>
          }
        />

        <Route
          path="/prediction"
          element={
            <ProtectedPage>
              <Prediction />
            </ProtectedPage>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedPage>
              <History />
            </ProtectedPage>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedPage>
              <Analytics />
            </ProtectedPage>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedPage>
              <Settings />
            </ProtectedPage>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;