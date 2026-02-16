import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle, Download, Package, Truck, MapPin, Home } from "lucide-react";
import { useAppSelector } from "../store/hooks";

export default function OrderConfirmation() {
  const { currentOrder } = useAppSelector((state) => state.order);

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-[#f8f6f3] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-600 mb-4">No order found</p>
          <Link to="/" className="text-[#111] hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const deliverySteps = [
    { status: "confirmed", label: "Order Confirmed", icon: CheckCircle },
    { status: "preparing", label: "Preparing Order", icon: Package },
    { status: "in_transit", label: "In Transit", icon: Truck },
    { status: "delivered", label: "Delivered", icon: Home },
  ];

  const currentStepIndex = deliverySteps.findIndex(
    (step) => step.status === currentOrder.deliveryStatus
  );

  return (
    <div className="min-h-screen bg-[#f8f6f3] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={40} />
          </div>
          <h1
            className="text-4xl text-[#111] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            Order Confirmed!
          </h1>
          <p className="text-stone-600">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-stone-200 rounded-sm p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-stone-200">
            <div>
              <p className="text-sm text-stone-600">Order Number</p>
              <p
                className="text-2xl text-[#111]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {currentOrder.orderNumber}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-sm text-sm font-medium">
                {currentOrder.paymentStatus === "paid" ? "PAID" : "PENDING"}
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-stone-600 mb-1">Transaction Reference</p>
              <p className="font-mono text-sm text-[#111]">
                {currentOrder.transactionReference || "TXN" + Date.now()}
              </p>
            </div>
            <div>
              <p className="text-sm text-stone-600 mb-1">Payment Method</p>
              <p className="text-sm text-[#111] capitalize">
                {currentOrder.paymentMethod.type.replace("_", " ")}
              </p>
            </div>
            <div>
              <p className="text-sm text-stone-600 mb-1">Order Date</p>
              <p className="text-sm text-[#111]">
                {new Date(currentOrder.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-stone-600 mb-1">Total Amount</p>
              <p
                className="text-xl text-[#111]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                ₱{currentOrder.total.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-medium text-stone-800 mb-3">Order Items</h3>
            <div className="space-y-3">
              {currentOrder.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-stone-50 rounded-sm">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-sm"
                  />
                  <div className="flex-1">
                    <p className="text-stone-800">{item.productName}</p>
                    {item.variantName && (
                      <p className="text-sm text-stone-600">{item.variantName}</p>
                    )}
                    <p className="text-xs text-stone-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-stone-800">
                      ₱{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-stone-600" />
              <h3 className="font-medium text-stone-800">Shipping Address</h3>
            </div>
            <div className="bg-stone-50 p-4 rounded-sm text-sm text-stone-600">
              <p className="text-stone-800 font-medium">
                {currentOrder.shippingAddress.fullName}
              </p>
              <p>{currentOrder.shippingAddress.streetAddress}</p>
              <p>
                {currentOrder.shippingAddress.barangay}, {currentOrder.shippingAddress.city}
              </p>
              <p>
                {currentOrder.shippingAddress.province}{" "}
                {currentOrder.shippingAddress.postalCode}
              </p>
              <p className="mt-2">
                <strong>Contact:</strong> {currentOrder.shippingAddress.contactNumber}
              </p>
              <p>
                <strong>Email:</strong> {currentOrder.shippingAddress.email}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Delivery Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-stone-200 rounded-sm p-6 md:p-8 mb-6"
        >
          <h2
            className="text-2xl text-[#111] mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Delivery Status
          </h2>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-stone-200" />
            <div
              className="absolute left-6 top-0 w-0.5 bg-[#111] transition-all duration-500"
              style={{ height: `${(currentStepIndex / (deliverySteps.length - 1)) * 100}%` }}
            />

            {/* Steps */}
            <div className="space-y-8">
              {deliverySteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div key={step.status} className="relative flex items-center gap-4">
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? "bg-[#111] text-white"
                          : "bg-stone-100 text-stone-400"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          isCurrent ? "text-[#111]" : isCompleted ? "text-stone-800" : "text-stone-400"
                        }`}
                      >
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-stone-600">Currently processing</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <button className="flex-1 border border-stone-300 text-[#111] py-3 rounded-sm hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">
            <Download size={18} />
            <span style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}>
              DOWNLOAD INVOICE
            </span>
          </button>
          <Link
            to="/dashboard/orders"
            className="flex-1 bg-[#111] text-white py-3 rounded-sm hover:bg-stone-800 transition-colors text-center"
            style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
          >
            VIEW ALL ORDERS
          </Link>
          <Link
            to="/"
            className="flex-1 border border-stone-300 text-[#111] py-3 rounded-sm hover:bg-stone-50 transition-colors text-center"
            style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
          >
            BACK TO HOME
          </Link>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-stone-50 rounded-sm text-center"
        >
          <p className="text-stone-600 mb-2">Need help with your order?</p>
          <Link to="/contact" className="text-[#111] hover:underline font-medium">
            Contact our support team
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
