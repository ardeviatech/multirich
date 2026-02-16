import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "motion/react";
import {
  ChevronRight,
  MapPin,
  CreditCard,
  UserCircle,
  Smartphone,
  Building2,
  ShieldCheck,
  ArrowLeft,
  Wallet,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { createOrder } from "../store/orderSlice";
import type { ShippingAddress, BillingAddress } from "../store/orderSlice";
import {
  setShippingData as saveShippingData,
  setBillingData as saveBillingData,
  setCheckoutStep,
} from "../store/checkoutSlice";
import { ProfileCompletionModal } from "../components/ProfileCompletionModal";

const shippingSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  contactNumber: yup.string().required("Contact number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  streetAddress: yup.string().required("Street address is required"),
  barangay: yup.string().required("Barangay is required"),
  city: yup.string().required("City is required"),
  province: yup.string().required("Province is required"),
  postalCode: yup.string().required("Postal code is required"),
  country: yup.string().required("Country is required"),
  notes: yup.string().optional().nullable().required(),
});

type ShippingFormData = yup.InferType<typeof shippingSchema>;

const billingSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  contactNumber: yup.string().required("Contact number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  streetAddress: yup.string().required("Street address is required"),
  barangay: yup.string().required("Barangay is required"),
  city: yup.string().required("City is required"),
  province: yup.string().required("Province is required"),
  postalCode: yup.string().required("Postal code is required"),
  country: yup.string().required("Country is required"),
  notes: yup.string().optional().nullable().required(),
});

type BillingFormData = yup.InferType<typeof billingSchema>;

const paymentMethods = [
  {
    id: "card" as const,
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, JCB, American Express",
    icon: CreditCard,
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    route: "/checkout/payment/card",
  },
  {
    id: "ewallet" as const,
    label: "E-Wallet",
    description: "GCash, Maya, GrabPay, ShopeePay",
    icon: Smartphone,
    color: "bg-indigo-50",
    iconColor: "text-indigo-600",
    route: "/checkout/payment/ewallet",
  },
  {
    id: "bank" as const,
    label: "Online Banking",
    description: "BDO, BPI, Metrobank, Unionbank & more",
    icon: Building2,
    color: "bg-green-50",
    iconColor: "text-green-600",
    route: "/checkout/payment/bank",
  },
  {
    id: "billease" as const,
    label: "BillEase",
    description: "Buy now, pay later in installments",
    icon: Wallet,
    color: "bg-amber-50",
    iconColor: "text-amber-600",
    route: "/checkout/payment/billease",
  },
];

export default function Checkout() {
  const location = useLocation();
  const checkoutState = useAppSelector((state) => state.checkout);
  const [step, setStepLocal] = useState<"shipping" | "billing" | "payment">(
    checkoutState.step
  );
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingData, setShippingData] = useState<ShippingAddress | null>(
    checkoutState.shippingData
  );
  const [billingData, setBillingData] = useState<BillingAddress | null>(
    checkoutState.billingData
  );
  const [showProfileModal, setShowProfileModal] = useState(false);

  const { items, total, subtotal, tax } = useAppSelector((state) => state.cart);
  const { isAuthenticated, isProfileComplete, user } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Restore step from location state (when returning from payment page)
  useEffect(() => {
    const state = location.state as { returnToPayment?: boolean } | null;
    if (state?.returnToPayment && checkoutState.shippingData && checkoutState.billingData) {
      setStepLocal("payment");
      setShippingData(checkoutState.shippingData);
      setBillingData(checkoutState.billingData);
    }
  }, [location.state, checkoutState.shippingData, checkoutState.billingData]);

  const setStep = (newStep: "shipping" | "billing" | "payment") => {
    setStepLocal(newStep);
    dispatch(setCheckoutStep(newStep));
  };

  const {
    register: registerShipping,
    handleSubmit: handleSubmitShipping,
    formState: { errors: shippingErrors },
  } = useForm<ShippingFormData>({
    resolver: yupResolver(shippingSchema),
    defaultValues: shippingData
      ? {
          fullName: shippingData.fullName,
          contactNumber: shippingData.contactNumber,
          email: shippingData.email,
          streetAddress: shippingData.streetAddress,
          barangay: shippingData.barangay,
          city: shippingData.city,
          province: shippingData.province,
          postalCode: shippingData.postalCode,
          country: shippingData.country,
          notes: shippingData.notes || "",
        }
      : {
          fullName: user ? `${user.firstName} ${user.lastName}` : "",
          contactNumber: user?.phone || "",
          email: user?.email || "",
          country: "Philippines",
        },
  });

  const {
    register: registerBilling,
    handleSubmit: handleSubmitBilling,
    formState: { errors: billingErrors },
  } = useForm<BillingFormData>({
    resolver: yupResolver(billingSchema),
    defaultValues: billingData && !billingData.sameAsShipping
      ? {
          fullName: billingData.fullName,
          contactNumber: billingData.contactNumber,
          email: billingData.email,
          streetAddress: billingData.streetAddress,
          barangay: billingData.barangay,
          city: billingData.city,
          province: billingData.province,
          postalCode: billingData.postalCode,
          country: billingData.country,
          notes: billingData.notes || "",
        }
      : { country: "Philippines" },
  });

  const onShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    dispatch(saveShippingData(data));
    setStep("billing");
  };

  const onBillingSubmit = (data: BillingFormData) => {
    const billing: BillingAddress = {
      ...data,
      sameAsShipping: false,
    };
    setBillingData(billing);
    dispatch(saveBillingData(billing));
    setStep("payment");
  };

  const handleSelectPaymentMethod = (
    method: (typeof paymentMethods)[number]
  ) => {
    if (!shippingData || !billingData) return;

    // Create the order with pending status
    dispatch(
      createOrder({
        orderNumber: `ORD${Date.now()}`,
        items,
        subtotal,
        tax,
        total,
        shippingAddress: shippingData,
        billingAddress: billingData,
        paymentMethod: { type: method.id === "bank" ? "bank_transfer" : method.id === "ewallet" ? "ewallet" : method.id },
        paymentStatus: "pending",
        deliveryStatus: "confirmed",
        transactionReference: "",
      })
    );

    // Navigate to the payment page
    navigate(method.route);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  // Show profile completion requirement if profile is incomplete
  if (isAuthenticated && !isProfileComplete) {
    return (
      <>
        <div className="min-h-screen bg-[#f8f6f3] pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-6 md:px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-stone-200 rounded-sm p-8 md:p-10 text-center"
            >
              <div className="w-20 h-20 bg-[#f5f2ed] rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCircle size={40} className="text-[#111]" />
              </div>
              <h1
                className="text-3xl text-[#111] mb-3"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                }}
              >
                Complete Your Profile
              </h1>
              <p className="text-stone-600 mb-2">
                Before placing an order, we need your full name and contact
                number for shipping and delivery purposes.
              </p>
              <p className="text-stone-500 text-sm mb-8">
                This only takes a moment and helps us ensure accurate
                deliveries.
              </p>
              <button
                onClick={() => setShowProfileModal(true)}
                className="bg-[#111] text-white px-8 py-3 rounded-sm hover:bg-stone-800 transition-colors"
                style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
              >
                COMPLETE PROFILE
              </button>
              <div className="mt-4">
                <Link
                  to="/cart"
                  className="text-stone-500 hover:text-[#111] text-sm transition-colors"
                >
                  &larr; Back to cart
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <ProfileCompletionModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          onComplete={() => setShowProfileModal(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#f8f6f3] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="mb-8">
            <h1
              className="text-4xl md:text-5xl text-[#111] mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
              }}
            >
              Checkout
            </h1>

            {/* Progress Steps */}
            <div className="flex items-center gap-2">
              {[
                { key: "shipping" as const, label: "Shipping", num: 1 },
                { key: "billing" as const, label: "Billing", num: 2 },
                { key: "payment" as const, label: "Payment", num: 3 },
              ].map((s, i, arr) => {
                const stepOrder = { shipping: 0, billing: 1, payment: 2 };
                const currentOrder = stepOrder[step];
                const thisOrder = stepOrder[s.key];
                const isCompleted = thisOrder < currentOrder;
                const isCurrent = s.key === step;
                const canClick = isCompleted;

                return (
                  <span key={s.key} className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={!canClick}
                      onClick={() => canClick && setStep(s.key)}
                      className={`flex items-center gap-2 transition-colors ${
                        isCurrent
                          ? "text-[#111]"
                          : isCompleted
                          ? "text-[#111] cursor-pointer hover:opacity-70"
                          : "text-stone-400 cursor-default"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                          isCurrent
                            ? "border-[#111] bg-[#111] text-white"
                            : isCompleted
                            ? "border-[#111] bg-[#111] text-white"
                            : "border-stone-300"
                        }`}
                      >
                        {isCompleted ? (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          s.num
                        )}
                      </div>
                      <span className="text-sm font-medium">{s.label}</span>
                    </button>
                    {i < arr.length - 1 && (
                      <ChevronRight size={16} className="text-stone-400" />
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Shipping Address */}
              {step === "shipping" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-stone-200 rounded-sm p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="text-[#111]" size={24} />
                    <h2
                      className="text-2xl text-[#111]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Shipping Address
                    </h2>
                  </div>

                  <form
                    onSubmit={handleSubmitShipping(onShippingSubmit)}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        {...registerShipping("fullName")}
                        type="text"
                        className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                        placeholder="Juan Dela Cruz"
                      />
                      {shippingErrors.fullName && (
                        <p className="text-red-600 text-xs mt-1">
                          {shippingErrors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Contact Number *
                        </label>
                        <input
                          {...registerShipping("contactNumber")}
                          type="tel"
                          className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                          placeholder="+63 917 123 4567"
                        />
                        {shippingErrors.contactNumber && (
                          <p className="text-red-600 text-xs mt-1">
                            {shippingErrors.contactNumber.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Email *
                        </label>
                        <input
                          {...registerShipping("email")}
                          type="email"
                          className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                          placeholder="you@example.com"
                        />
                        {shippingErrors.email && (
                          <p className="text-red-600 text-xs mt-1">
                            {shippingErrors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        {...registerShipping("streetAddress")}
                        type="text"
                        className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                        placeholder="House No., Building, Street Name"
                      />
                      {shippingErrors.streetAddress && (
                        <p className="text-red-600 text-xs mt-1">
                          {shippingErrors.streetAddress.message}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Barangay / District *
                        </label>
                        <input
                          {...registerShipping("barangay")}
                          type="text"
                          className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                          placeholder="Barangay"
                        />
                        {shippingErrors.barangay && (
                          <p className="text-red-600 text-xs mt-1">
                            {shippingErrors.barangay.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          City *
                        </label>
                        <input
                          {...registerShipping("city")}
                          type="text"
                          className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                          placeholder="City"
                        />
                        {shippingErrors.city && (
                          <p className="text-red-600 text-xs mt-1">
                            {shippingErrors.city.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Province *
                        </label>
                        <input
                          {...registerShipping("province")}
                          type="text"
                          className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                          placeholder="Province"
                        />
                        {shippingErrors.province && (
                          <p className="text-red-600 text-xs mt-1">
                            {shippingErrors.province.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Postal Code *
                        </label>
                        <input
                          {...registerShipping("postalCode")}
                          type="text"
                          className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                          placeholder="1234"
                        />
                        {shippingErrors.postalCode && (
                          <p className="text-red-600 text-xs mt-1">
                            {shippingErrors.postalCode.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Country *
                        </label>
                        <input
                          {...registerShipping("country")}
                          type="text"
                          className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                        />
                        {shippingErrors.country && (
                          <p className="text-red-600 text-xs mt-1">
                            {shippingErrors.country.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Delivery Notes (Optional)
                      </label>
                      <textarea
                        {...registerShipping("notes")}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                        placeholder="Special instructions for delivery"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#111] text-white py-3 rounded-sm hover:bg-stone-800 transition-colors"
                      style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
                    >
                      CONTINUE TO BILLING
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Billing Address */}
              {step === "billing" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-stone-200 rounded-sm p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="text-[#111]" size={24} />
                    <h2
                      className="text-2xl text-[#111]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Billing Information
                    </h2>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsShipping}
                        onChange={(e) => setSameAsShipping(e.target.checked)}
                        className="w-4 h-4 rounded border-stone-300"
                      />
                      <span className="text-stone-700">
                        Same as shipping address
                      </span>
                    </label>
                  </div>

                  {sameAsShipping ? (
                    <div className="space-y-4">
                      <div className="bg-stone-50 p-4 rounded-sm">
                        <p className="text-sm text-stone-600 mb-2">
                          Billing address:
                        </p>
                        <p className="text-stone-800">
                          {shippingData?.fullName}
                        </p>
                        <p className="text-stone-600 text-sm">
                          {shippingData?.streetAddress}
                        </p>
                        <p className="text-stone-600 text-sm">
                          {shippingData?.barangay}, {shippingData?.city}
                        </p>
                        <p className="text-stone-600 text-sm">
                          {shippingData?.province} {shippingData?.postalCode}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setStep("shipping")}
                          className="flex-1 border border-stone-300 text-[#111] py-3 rounded-sm hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
                          style={{
                            fontSize: "0.85rem",
                            letterSpacing: "0.05em",
                          }}
                        >
                          <ArrowLeft size={16} />
                          BACK
                        </button>
                        <button
                          onClick={() => {
                            if (shippingData) {
                              const billing: BillingAddress = {
                                ...shippingData,
                                sameAsShipping: true,
                              };
                              setBillingData(billing);
                              dispatch(saveBillingData(billing));
                              setStep("payment");
                            }
                          }}
                          className="flex-1 bg-[#111] text-white py-3 rounded-sm hover:bg-stone-800 transition-colors"
                          style={{
                            fontSize: "0.85rem",
                            letterSpacing: "0.05em",
                          }}
                        >
                          CONTINUE TO PAYMENT
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmitBilling(onBillingSubmit)}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          {...registerBilling("fullName")}
                          type="text"
                          className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                          placeholder="Juan Dela Cruz"
                        />
                        {billingErrors.fullName && (
                          <p className="text-red-600 text-xs mt-1">
                            {billingErrors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">
                            Contact Number *
                          </label>
                          <input
                            {...registerBilling("contactNumber")}
                            type="tel"
                            className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                            placeholder="+63 917 123 4567"
                          />
                          {billingErrors.contactNumber && (
                            <p className="text-red-600 text-xs mt-1">
                              {billingErrors.contactNumber.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">
                            Email *
                          </label>
                          <input
                            {...registerBilling("email")}
                            type="email"
                            className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                            placeholder="you@example.com"
                          />
                          {billingErrors.email && (
                            <p className="text-red-600 text-xs mt-1">
                              {billingErrors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Street Address *
                        </label>
                        <input
                          {...registerBilling("streetAddress")}
                          type="text"
                          className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                          placeholder="House No., Building, Street Name"
                        />
                        {billingErrors.streetAddress && (
                          <p className="text-red-600 text-xs mt-1">
                            {billingErrors.streetAddress.message}
                          </p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">
                            Barangay / District *
                          </label>
                          <input
                            {...registerBilling("barangay")}
                            type="text"
                            className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                            placeholder="Barangay"
                          />
                          {billingErrors.barangay && (
                            <p className="text-red-600 text-xs mt-1">
                              {billingErrors.barangay.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">
                            City *
                          </label>
                          <input
                            {...registerBilling("city")}
                            type="text"
                            className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                            placeholder="City"
                          />
                          {billingErrors.city && (
                            <p className="text-red-600 text-xs mt-1">
                              {billingErrors.city.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">
                            Province *
                          </label>
                          <input
                            {...registerBilling("province")}
                            type="text"
                            className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                            placeholder="Province"
                          />
                          {billingErrors.province && (
                            <p className="text-red-600 text-xs mt-1">
                              {billingErrors.province.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">
                            Postal Code *
                          </label>
                          <input
                            {...registerBilling("postalCode")}
                            type="text"
                            className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                            placeholder="1234"
                          />
                          {billingErrors.postalCode && (
                            <p className="text-red-600 text-xs mt-1">
                              {billingErrors.postalCode.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">
                            Country *
                          </label>
                          <input
                            {...registerBilling("country")}
                            type="text"
                            className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111]"
                          />
                          {billingErrors.country && (
                            <p className="text-red-600 text-xs mt-1">
                              {billingErrors.country.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep("shipping")}
                          className="flex-1 border border-stone-300 text-[#111] py-3 rounded-sm hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
                          style={{
                            fontSize: "0.85rem",
                            letterSpacing: "0.05em",
                          }}
                        >
                          <ArrowLeft size={16} />
                          BACK
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-[#111] text-white py-3 rounded-sm hover:bg-stone-800 transition-colors"
                          style={{
                            fontSize: "0.85rem",
                            letterSpacing: "0.05em",
                          }}
                        >
                          CONTINUE TO PAYMENT
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}

              {/* Payment Method Selection */}
              {step === "payment" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Review Info */}
                  <div className="bg-white border border-stone-200 rounded-sm p-6 md:p-8">
                    <h2
                      className="text-2xl text-[#111] mb-6"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Review & Pay
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-2">
                          Shipping Address
                        </h3>
                        <div className="text-sm text-stone-700 bg-stone-50 p-4 rounded-sm">
                          <p className="font-medium text-stone-900">
                            {shippingData?.fullName}
                          </p>
                          <p>{shippingData?.streetAddress}</p>
                          <p>
                            {shippingData?.barangay}, {shippingData?.city}
                          </p>
                          <p>
                            {shippingData?.province} {shippingData?.postalCode}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-2">
                          Billing Address
                        </h3>
                        <div className="text-sm text-stone-700 bg-stone-50 p-4 rounded-sm">
                          <p className="font-medium text-stone-900">
                            {billingData?.fullName}
                          </p>
                          <p>{billingData?.streetAddress}</p>
                          <p>
                            {billingData?.barangay}, {billingData?.city}
                          </p>
                          <p>
                            {billingData?.province} {billingData?.postalCode}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep("billing")}
                      className="text-sm text-stone-500 hover:text-[#111] transition-colors flex items-center gap-1"
                    >
                      <ArrowLeft size={14} />
                      Edit addresses
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="bg-white border border-stone-200 rounded-sm p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck className="text-green-600" size={22} />
                      <h2
                        className="text-2xl text-[#111]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        Select Payment Method
                      </h2>
                    </div>
                    <p className="text-sm text-stone-500 mb-6">
                      Powered by PayMongo - Secured by 256-bit SSL encryption
                    </p>

                    <div className="space-y-3">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <button
                            key={method.id}
                            onClick={() => handleSelectPaymentMethod(method)}
                            className="w-full flex items-center gap-4 p-5 border-2 border-stone-200 rounded-lg hover:border-[#111] hover:shadow-sm transition-all text-left group"
                          >
                            <div
                              className={`w-14 h-14 ${method.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                            >
                              <Icon className={method.iconColor} size={26} />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-[#111] group-hover:text-[#111]">
                                {method.label}
                              </p>
                              <p className="text-xs text-stone-500 mt-0.5">
                                {method.description}
                              </p>
                            </div>
                            <ChevronRight
                              size={20}
                              className="text-stone-300 group-hover:text-[#111] transition-colors"
                            />
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100">
                      <button
                        onClick={() => setStep("billing")}
                        className="text-sm text-stone-500 hover:text-[#111] transition-colors flex items-center gap-1"
                      >
                        <ArrowLeft size={14} />
                        Back to billing
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-stone-200 rounded-sm p-6 sticky top-24">
                <h2
                  className="text-2xl text-[#111] mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Order Summary
                </h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 text-sm">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-12 object-cover rounded-sm"
                      />
                      <div className="flex-1">
                        <p className="text-stone-800">{item.productName}</p>
                        <p className="text-stone-500 text-xs">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-stone-800">
                        &#8369;
                        {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-stone-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Subtotal</span>
                    <span>
                      &#8369;
                      {subtotal.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>VAT (12%)</span>
                    <span>
                      &#8369;
                      {tax.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg pt-2 border-t border-stone-200">
                    <span
                      className="text-[#111]"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Total
                    </span>
                    <span
                      className="text-xl text-[#111] font-medium"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      &#8369;
                      {total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completion Modal */}
      <ProfileCompletionModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onComplete={() => setShowProfileModal(false)}
      />
    </>
  );
}
