import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import BottomTab from "./components/layout/BottomTab";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/customer/Home";
import Menu from "./pages/customer/Menu";
import Cart from "./pages/customer/Cart";
import Profile from "./pages/customer/Profile";
import Tracking from "./pages/customer/Tracking";
import Booking from "./pages/customer/Booking";
import Login from "./pages/auth/Login";
import Header from "./components/layout/Header";

const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className={!isAdmin ? "pb-24 pt-20 overflow-x-hidden" : "pt-20 overflow-x-hidden"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:tableId" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/events" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<Login />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly>
                <Suspense fallback={
                  <div className="min-h-screen flex items-center justify-center bg-background">
                    <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                  </div>
                }>
                  <AdminDashboard />
                </Suspense>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!isAdmin && location.pathname !== "/login" && location.pathname !== "/admin/login" && <BottomTab />}
    </div>
  );
}

export default App;
