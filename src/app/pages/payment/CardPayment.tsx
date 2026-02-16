import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "motion/react";
import {
  Lock,
  CreditCard,
  Check,
  XCircle,
  Loader2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateOrderPaymentStatus } from "../../store/orderSlice";
import { clearCart } from "../../store/cartSlice";
import { resetCheckout } from "../../store/checkoutSlice";

type Stage = "form" | "processing" | "success" | "failed";

const cardSchema = yup.object({
  cardNumber: yup
    .string()
    .required("Card number is required")
    .test("len", "Enter a valid card number", (val) => {
      const clean = (val || "").replace(/\s/g, "");
      return clean.length >= 13 && clean.length <= 19;
    }),
  cardHolder: yup.string().required("Cardholder name is required"),
  expiry: yup
    .string()
    .required("Expiry is required")
    .matches(/^\d{2}\/\d{2}$/, "Enter a valid expiry (MM/YY)"),
  cvv: yup
    .string()
    .required("CVV is required")
    .min(3, "Min 3 digits")
    .max(4, "Max 4 digits"),
});

type CardFormData = yup.InferType<typeof cardSchema>;

export default function CardPayment() {
  const [stage, setStage] = useState<Stage>("form");
  const [transactionRef, setTransactionRef] = useState("");

  const { currentOrder } = useAppSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CardFormData>({
    resolver: yupResolver(cardSchema),
  });

  const cardNumber = watch("cardNumber") || "";

  if (!currentOrder) {
    return (
      <div className="min-h-screen bg-[#f8f6f3] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-600 mb-4">No order found</p>
          <button
            onClick={() => navigate("/checkout")}
            className="text-[#111] hover:underline"
          >
            Return to checkout
          </button>
        </div>
      </div>
    );
  }

  const amount = currentOrder.total;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const getCardType = () => {
    const num = cardNumber.replace(/\s/g, "");
    if (num.startsWith("4")) return "VISA";
    if (num.startsWith("5") || num.startsWith("2")) return "MASTERCARD";
    if (num.startsWith("35")) return "JCB";
    if (num.startsWith("3")) return "AMEX";
    return null;
  };

  const onSubmit = (_data: CardFormData) => {
    setStage("processing");
    const ref = `TXN${Date.now()}${Math.random()
      .toString(36)
      .substr(2, 6)
      .toUpperCase()}`;
    setTransactionRef(ref);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.1;
      if (isSuccess) {
        setStage("success");
        dispatch(
          updateOrderPaymentStatus({
            orderId: currentOrder.id,
            status: "paid",
            paidAt: new Date().toISOString(),
          })
        );
        dispatch(clearCart());
        dispatch(resetCheckout());
      } else {
        setStage("failed");
        dispatch(
          updateOrderPaymentStatus({
            orderId: currentOrder.id,
            status: "failed",
          })
        );
      }
    }, 3000);
  };

  const cardType = getCardType();

  return (
    <div className="min-h-screen bg-[#f5f2ed] pt-24 pb-16">
      <div className="max-w-xl mx-auto px-4">
        {/* PayMongo Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-stone-200 rounded-t-lg overflow-hidden"
        >
          <div className="bg-[#111] px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-stone-400 text-xs tracking-wider uppercase">
                  PayMongo Checkout
                </p>
                <p className="text-white text-sm mt-1">
                  Multi-Rich Home Decors
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock size={14} className="text-green-400" />
                <span className="text-green-400 text-xs">Secured</span>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500">Amount to pay</p>
              <p
                className="text-2xl text-[#111]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                &#8369;
                {amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard size={20} className="text-blue-600" />
              <span className="text-sm font-medium text-stone-700">
                Credit / Debit Card
              </span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-x border-b border-stone-200 rounded-b-lg p-6"
        >
          {stage === "form" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("cardNumber")}
                    onChange={(e) =>
                      setValue("cardNumber", formatCardNumber(e.target.value))
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111] pr-20 ${
                      errors.cardNumber
                        ? "border-red-400"
                        : "border-stone-300"
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {cardType && (
                      <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        {cardType}
                      </span>
                    )}
                  </div>
                </div>
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  {...register("cardHolder")}
                  onChange={(e) => setValue("cardHolder", e.target.value.toUpperCase())}
                  placeholder="JUAN DELA CRUZ"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111] ${
                    errors.cardHolder ? "border-red-400" : "border-stone-300"
                  }`}
                />
                {errors.cardHolder && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.cardHolder.message}
                  </p>
                )}
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    {...register("expiry")}
                    onChange={(e) => setValue("expiry", formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111] ${
                      errors.expiry ? "border-red-400" : "border-stone-300"
                    }`}
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.expiry.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    {...register("cvv")}
                    onChange={(e) =>
                      setValue("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    placeholder="***"
                    maxLength={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111] ${
                      errors.cvv ? "border-red-400" : "border-stone-300"
                    }`}
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-xs mt-1">{errors.cvv.message}</p>
                  )}
                </div>
              </div>

              {/* Accepted cards visual */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs text-stone-400">Accepted:</span>
                {["VISA", "MC", "JCB", "AMEX"].map((brand) => (
                  <span
                    key={brand}
                    className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded"
                  >
                    {brand}
                  </span>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-[#111] text-white py-3.5 rounded-lg hover:bg-stone-800 transition-colors font-medium"
              >
                Pay &#8369;
                {amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/checkout", {
                    state: { returnToPayment: true },
                  })
                }
                className="w-full text-stone-500 hover:text-[#111] py-2 transition-colors text-sm flex items-center justify-center gap-1"
              >
                <ArrowLeft size={14} />
                Back to checkout
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-400 pt-2">
                <ShieldCheck size={14} />
                <span>Your payment info is encrypted end-to-end</span>
              </div>
            </form>
          )}

          {stage === "processing" && (
            <div className="text-center py-16">
              <Loader2
                className="animate-spin mx-auto text-[#111] mb-6"
                size={48}
              />
              <h3
                className="text-2xl text-[#111] mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Processing Payment
              </h3>
              <p className="text-stone-600 mb-2">
                Verifying card details with your bank...
              </p>
              <p className="text-stone-400 text-sm">
                This may take a few seconds
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-stone-400 mt-8">
                <Lock size={14} />
                <span>Do not close or refresh this page</span>
              </div>
            </div>
          )}

          {stage === "success" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-green-600" size={40} />
              </div>
              <h3
                className="text-2xl text-[#111] mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Payment Successful!
              </h3>
              <p className="text-stone-600 mb-6">
                Your card has been charged successfully.
              </p>
              <div className="bg-stone-50 p-5 rounded-lg mb-6 text-left space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Transaction Reference</span>
                  <span className="font-mono font-medium text-[#111]">
                    {transactionRef}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Amount Paid</span>
                  <span className="font-medium text-[#111]">
                    &#8369;
                    {amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Payment Method</span>
                  <span className="text-stone-700">
                    Card ending in {cardNumber.replace(/\s/g, "").slice(-4)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Date & Time</span>
                  <span className="text-stone-600">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate("/order-confirmation")}
                className="w-full bg-[#111] text-white py-3.5 rounded-lg hover:bg-stone-800 transition-colors font-medium"
              >
                View Order Details
              </button>
            </div>
          )}

          {stage === "failed" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="text-red-600" size={40} />
              </div>
              <h3
                className="text-2xl text-[#111] mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Payment Failed
              </h3>
              <p className="text-stone-600 mb-8">
                Your card was declined. Please try again or use a different
                payment method.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setStage("form");
                    reset();
                  }}
                  className="w-full bg-[#111] text-white py-3.5 rounded-lg hover:bg-stone-800 transition-colors font-medium"
                >
                  Retry Payment
                </button>
                <button
                  onClick={() =>
                    navigate("/checkout", {
                      state: { returnToPayment: true },
                    })
                  }
                  className="w-full border border-stone-300 text-[#111] py-3 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Choose Different Method
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
