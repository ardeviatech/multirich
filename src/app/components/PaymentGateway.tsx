import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  CreditCard,
  Smartphone,
  Building2,
  Lock,
  Check,
  XCircle,
  Loader2,
} from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { updateOrderPaymentStatus } from "../store/orderSlice";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

interface PaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderId: string;
}

type PaymentMethod = "card" | "gcash" | "bank" | null;
type PaymentStage = "select" | "details" | "processing" | "success" | "failed";

export function PaymentGateway({ isOpen, onClose, amount, orderId }: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [stage, setStage] = useState<PaymentStage>("select");
  const [transactionRef, setTransactionRef] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Card form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // GCash state
  const [gcashNumber, setGcashNumber] = useState("");

  // Bank state
  const [selectedBank, setSelectedBank] = useState("");

  const banks = ["BDO", "BPI", "Metrobank", "Unionbank", "Security Bank", "Landbank"];

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setStage("details");
  };

  const handlePayment = () => {
    setStage("processing");
    const ref = `TXN${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setTransactionRef(ref);

    // Simulate payment processing
    setTimeout(() => {
      // 90% success rate for demo
      const isSuccess = Math.random() > 0.1;

      if (isSuccess) {
        setStage("success");
        dispatch(
          updateOrderPaymentStatus({
            orderId,
            status: "paid",
            paidAt: new Date().toISOString(),
          })
        );
        dispatch(clearCart());
      } else {
        setStage("failed");
        dispatch(updateOrderPaymentStatus({ orderId, status: "failed" }));
      }
    }, 3000);
  };

  const handleSuccess = () => {
    onClose();
    navigate("/order-confirmation");
  };

  const handleRetry = () => {
    setStage("details");
  };

  const handleChangMethod = () => {
    setStage("select");
    setSelectedMethod(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60"
            onClick={stage === "processing" ? undefined : onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Header */}
            {stage !== "processing" && (
              <div className="flex items-center justify-between p-6 border-b border-stone-200">
                <div>
                  <h2
                    className="text-2xl text-[#111]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Secure Payment
                  </h2>
                  <p className="text-sm text-stone-600 mt-1">Multi-Rich Home Decors</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            )}

            {/* Amount Display */}
            {stage === "select" && (
              <div className="bg-stone-50 p-6 border-b border-stone-200">
                <p className="text-sm text-stone-600 mb-1">Amount to Pay</p>
                <p
                  className="text-3xl text-[#111]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  ₱{amount.toLocaleString()}
                </p>
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {/* Payment Method Selection */}
              {stage === "select" && (
                <div className="space-y-3">
                  <button
                    onClick={() => handleMethodSelect("card")}
                    className="w-full flex items-center gap-4 p-4 border-2 border-stone-200 rounded-lg hover:border-[#111] transition-colors text-left"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-[#111]">Credit / Debit Card</p>
                      <p className="text-xs text-stone-600">Visa, Mastercard, JCB</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleMethodSelect("gcash")}
                    className="w-full flex items-center gap-4 p-4 border-2 border-stone-200 rounded-lg hover:border-[#111] transition-colors text-left"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-[#111]">GCash</p>
                      <p className="text-xs text-stone-600">Pay with your GCash wallet</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleMethodSelect("bank")}
                    className="w-full flex items-center gap-4 p-4 border-2 border-stone-200 rounded-lg hover:border-[#111] transition-colors text-left"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Building2 className="text-green-600" size={24} />
                    </div>
                    <div>
                      <p className="font-medium text-[#111]">Bank Transfer</p>
                      <p className="text-xs text-stone-600">Online banking transfer</p>
                    </div>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-stone-500 mt-4">
                    <Lock size={14} />
                    <span>Secured by 256-bit SSL encryption</span>
                  </div>
                </div>
              )}

              {/* Card Details */}
              {stage === "details" && selectedMethod === "card" && (
                <div className="space-y-4">
                  <div className="bg-stone-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-stone-600">Amount: ₱{amount.toLocaleString()}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="JUAN DELA CRUZ"
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">CVV</label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="w-full bg-[#111] text-white py-3 rounded-lg hover:bg-stone-800 transition-colors mt-6"
                  >
                    Pay ₱{amount.toLocaleString()}
                  </button>
                </div>
              )}

              {/* GCash Details */}
              {stage === "details" && selectedMethod === "gcash" && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-blue-900">Amount: ₱{amount.toLocaleString()}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      GCash Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={gcashNumber}
                      onChange={(e) => setGcashNumber(e.target.value)}
                      placeholder="09XX XXX XXXX"
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="bg-stone-50 p-4 rounded-lg text-sm text-stone-600">
                    <p className="font-medium mb-2">Instructions:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>You will be redirected to GCash app</li>
                      <li>Review the payment details</li>
                      <li>Enter your MPIN to confirm</li>
                    </ol>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
                  >
                    Proceed to GCash
                  </button>
                </div>
              )}

              {/* Bank Transfer Details */}
              {stage === "details" && selectedMethod === "bank" && (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-green-900">Amount: ₱{amount.toLocaleString()}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Select Your Bank
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="">Choose a bank</option>
                      {banks.map((bank) => (
                        <option key={bank} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-lg text-sm text-stone-600">
                    <p className="font-medium mb-2">Instructions:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>You will be redirected to your bank's online portal</li>
                      <li>Log in with your credentials</li>
                      <li>Confirm the transaction</li>
                    </ol>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!selectedBank}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors mt-6 disabled:bg-stone-300 disabled:cursor-not-allowed"
                  >
                    Continue to Bank Portal
                  </button>
                </div>
              )}

              {/* Processing */}
              {stage === "processing" && (
                <div className="text-center py-12">
                  <Loader2 className="animate-spin mx-auto text-[#111] mb-6" size={48} />
                  <h3
                    className="text-2xl text-[#111] mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Processing Payment
                  </h3>
                  <p className="text-stone-600 mb-8">Please wait while we process your payment securely...</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-stone-500">
                    <Lock size={16} />
                    <span>Do not close or refresh this window</span>
                  </div>
                </div>
              )}

              {/* Success */}
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
                    Your payment has been processed successfully.
                  </p>
                  <div className="bg-stone-50 p-4 rounded-lg mb-6 text-left">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-stone-600">Transaction Reference:</span>
                      <span className="font-mono font-medium text-[#111]">{transactionRef}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-stone-600">Amount Paid:</span>
                      <span className="font-medium text-[#111]">₱{amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stone-600">Date & Time:</span>
                      <span className="text-stone-600">
                        {new Date().toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleSuccess}
                    className="w-full bg-[#111] text-white py-3 rounded-lg hover:bg-stone-800 transition-colors"
                  >
                    View Order Details
                  </button>
                </div>
              )}

              {/* Failed */}
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
                    We couldn't process your payment. Please try again or use a different payment
                    method.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={handleRetry}
                      className="w-full bg-[#111] text-white py-3 rounded-lg hover:bg-stone-800 transition-colors"
                    >
                      Retry Payment
                    </button>
                    <button
                      onClick={handleChangMethod}
                      className="w-full border border-stone-300 text-[#111] py-3 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      Choose Different Method
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
