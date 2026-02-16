import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import SubProductDetail from "./pages/SubProductDetail";
import VariantDetail from "./pages/VariantDetail";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Dashboard from "./pages/Dashboard";
import DashboardOrders from "./pages/DashboardOrders";
import DashboardInvoices from "./pages/dashboard/DashboardInvoices";
import DashboardAddresses from "./pages/dashboard/DashboardAddresses";
import DashboardPayments from "./pages/dashboard/DashboardPayments";
import DashboardWishlist from "./pages/dashboard/DashboardWishlist";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import CardPayment from "./pages/payment/CardPayment";
import EWalletPayment from "./pages/payment/EWalletPayment";
import OnlineBankingPayment from "./pages/payment/OnlineBankingPayment";
import BillEasePayment from "./pages/payment/BillEasePayment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "products/:categorySlug", Component: ProductDetail },
      { path: "products/:categorySlug/:subProductId", Component: SubProductDetail },
      { path: "products/:categorySlug/:subProductId/:variantId", Component: VariantDetail },
      { path: "about", Component: About },
      { path: "gallery", Component: Gallery },
      { path: "contact", Component: Contact },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "checkout/payment/card", Component: CardPayment },
      { path: "checkout/payment/ewallet", Component: EWalletPayment },
      { path: "checkout/payment/bank", Component: OnlineBankingPayment },
      { path: "checkout/payment/billease", Component: BillEasePayment },
      { path: "order-confirmation", Component: OrderConfirmation },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      { index: true, Component: DashboardOrders },
      { path: "orders", Component: DashboardOrders },
      { path: "invoices", Component: DashboardInvoices },
      { path: "addresses", Component: DashboardAddresses },
      { path: "payments", Component: DashboardPayments },
      { path: "wishlist", Component: DashboardWishlist },
      { path: "settings", Component: DashboardSettings },
    ],
  },
]);
