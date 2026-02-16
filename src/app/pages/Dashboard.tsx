import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Package,
  FileText,
  MapPin,
  CreditCard,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Home,
  AlertCircle,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { logout } from "../store/authSlice";
import { ProfileCompletionModal } from "../components/ProfileCompletionModal";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: Package, label: "My Orders", path: "/dashboard/orders" },
  { icon: FileText, label: "Invoices", path: "/dashboard/invoices" },
  { icon: MapPin, label: "Addresses", path: "/dashboard/addresses" },
  { icon: CreditCard, label: "Payment Methods", path: "/dashboard/payments" },
  { icon: Heart, label: "Wishlist", path: "/dashboard/wishlist" },
  { icon: Settings, label: "Account Settings", path: "/dashboard/settings" },
  { icon: HelpCircle, label: "Support", path: "/contact" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isProfileComplete = useAppSelector((state) => state.auth.isProfileComplete);
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const addresses = useAppSelector((state) => state.address.addresses);
  const orders = useAppSelector((state) => state.order.orders);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const getUserInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "";
  };

  const getUserDisplayName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.email || "";
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="flex gap-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#111] text-white rounded-full flex items-center justify-center shadow-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-white border-r border-stone-200 transition-transform duration-300 lg:block pt-20 lg:pt-0`}
          >
            <div className="h-full flex flex-col">
              {/* User Info */}
              <div className="p-6 border-b border-stone-200">
                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-3">
                  <span
                    className="text-2xl text-[#111]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {getUserInitials()}
                  </span>
                </div>
                <p className="font-medium text-[#111]">{getUserDisplayName()}</p>
                <p className="text-sm text-stone-600">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4">
                <ul className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                            active
                              ? "bg-[#111] text-white"
                              : "text-stone-700 hover:bg-stone-100"
                          }`}
                        >
                          <Icon size={18} />
                          <span className="text-sm">{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Logout */}
              <div className="p-4 border-t border-stone-200">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {location.pathname === "/dashboard" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1
                  className="text-4xl text-[#111] mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
                >
                  Welcome Back{user?.firstName ? `, ${user.firstName}` : ""}
                </h1>
                <p className="text-stone-600 mb-8">
                  Manage your account and explore our premium marble & stone collections
                </p>

                {/* Profile Completion Banner */}
                {!isProfileComplete && (
                  <div className="bg-amber-50 border border-amber-200 rounded-sm p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <AlertCircle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-amber-900 text-sm font-medium">Complete your profile</p>
                        <p className="text-amber-700 text-xs mt-0.5">
                          Add your name and phone number to place orders and receive deliveries.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowProfileModal(true)}
                      className="bg-[#111] text-white px-5 py-2 rounded-sm hover:bg-stone-800 transition-colors text-sm flex-shrink-0"
                    >
                      Complete Profile
                    </button>
                  </div>
                )}

                {/* CTA Banner */}
                <div className="bg-[#111] text-white rounded-sm p-8 mb-8 relative overflow-hidden">
                  <div className="relative z-10">
                    <h2
                      className="text-3xl mb-3"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
                    >
                      Explore Our Collections
                    </h2>
                    <p className="text-stone-300 mb-6 max-w-2xl">
                      Discover premium natural and synthetic stones for your next project. From elegant marbles to durable quartz, we have everything you need.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-white text-[#111] px-6 py-3 hover:bg-stone-100 transition-colors"
                        style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
                      >
                        <Home size={18} />
                        GO TO HOMEPAGE
                      </Link>
                      <Link
                        to="/products"
                        className="inline-block bg-transparent text-white px-6 py-3 border border-white hover:bg-white hover:text-[#111] transition-colors"
                        style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
                      >
                        BROWSE PRODUCTS
                      </Link>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white border border-stone-200 rounded-sm p-6">
                    <div className="flex items-center justify-between mb-3">
                      
                      <span className="text-xs text-stone-500 uppercase tracking-wider">
                        Orders
                      </span>
                    </div>
                    <p
                      className="text-3xl text-[#111]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {orders.length}
                    </p>
                    <p className="text-sm text-stone-600 mt-1 mb-3">Recent purchases</p>
                    <Link
                      to="/dashboard/orders"
                      className="text-sm text-[#111] hover:underline"
                    >
                      View orders &rarr;
                    </Link>
                  </div>

                  <div className="bg-white border border-stone-200 rounded-sm p-6">
                    <div className="flex items-center justify-between mb-3">
                      
                      <span className="text-xs text-stone-500 uppercase tracking-wider">
                        Wishlist
                      </span>
                    </div>
                    <p
                      className="text-3xl text-[#111]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {wishlist.length}
                    </p>
                    <p className="text-sm text-stone-600 mt-1 mb-3">Saved items</p>
                    <Link
                      to="/dashboard/wishlist"
                      className="text-sm text-[#111] hover:underline"
                    >
                      View wishlist &rarr;
                    </Link>
                  </div>

                  <div className="bg-white border border-stone-200 rounded-sm p-6">
                    <div className="flex items-center justify-between mb-3">
                      
                      <span className="text-xs text-stone-500 uppercase tracking-wider">
                        Addresses
                      </span>
                    </div>
                    <p
                      className="text-3xl text-[#111]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {addresses.length}
                    </p>
                    <p className="text-sm text-stone-600 mt-1 mb-3">Saved locations</p>
                    <Link
                      to="/dashboard/addresses"
                      className="text-sm text-[#111] hover:underline"
                    >
                      Manage addresses &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </div>

      {/* Profile Completion Modal */}
      <ProfileCompletionModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onComplete={() => setShowProfileModal(false)}
      />
    </div>
  );
}
