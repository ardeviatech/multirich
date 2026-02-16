import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Lock,
  Building2,
  Check,
  XCircle,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateOrderPaymentStatus } from "../../store/orderSlice";
import { clearCart } from "../../store/cartSlice";
import { resetCheckout } from "../../store/checkoutSlice";

type Stage = "select" | "redirect" | "processing" | "success" | "failed";

const banks = [
  {
    id: "bdo",
    name: "BDO Unibank",
    code: "BDO",
    color: "bg-red-50",
    textColor: "text-red-700",
  },
  {
    id: "bpi",
    name: "Bank of the Philippine Islands",
    code: "BPI",
    color: "bg-red-50",
    textColor: "text-red-600",
  },
  {
    id: "metrobank",
    name: "Metropolitan Bank & Trust",
    code: "MBTC",
    color: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    id: "unionbank",
    name: "Union Bank of the Philippines",
    code: "UBP",
    color: "bg-orange-50",
    textColor: "text-orange-700",
  },
  {
    id: "securitybank",
    name: "Security Bank Corporation",
    code: "SBC",
    color: "bg-teal-50",
    textColor: "text-teal-700",
  },
  {
    id: "landbank",
    name: "Land Bank of the Philippines",
    code: "LBP",
    color: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    id: "pnb",
    name: "Philippine National Bank",
    code: "PNB",
    color: "bg-blue-50",
    textColor: "text-blue-800",
  },
  {
    id: "rcbc",
    name: "Rizal Commercial Banking Corp",
    code: "RCBC",
    color: "bg-yellow-50",
    textColor: "text-yellow-700",
  },
  {
    id: "chinabank",
    name: "China Banking Corporation",
    code: "CBC",
    color: "bg-red-50",
    textColor: "text-red-800",
  },
];

export default function OnlineBankingPayment() {
  const [stage, setStage] = useState<Stage>("select");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [transactionRef, setTransactionRef] = useState("");

  const { currentOrder } = useAppSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const bankInfo = banks.find((b) => b.id === selectedBank);

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

  const handleSelectBank = (bankId: string) => {
    setSelectedBank(bankId);
    setStage("redirect");
  };

  const handleProceedToBank = () => {
    setStage("processing");
    const ref = `TXN${Date.now()}${Math.random()
      .toString(36)
      .substr(2, 6)
      .toUpperCase()}`;
    setTransactionRef(ref);

    // Simulate bank processing
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
    }, 3500);
  };

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
              <Building2 size={20} className="text-green-600" />
              <span className="text-sm font-medium text-stone-700">
                Online Banking
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
          {/* Bank Selection */}
          {stage === "select" && (
            <div className="space-y-4">
              <h3 className="font-medium text-stone-800 mb-4">
                Select your bank
              </h3>

              <div className="grid grid-cols-1 gap-2">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => handleSelectBank(bank.id)}
                    className="w-full flex items-center gap-4 p-4 border border-stone-200 rounded-lg hover:border-stone-400 hover:bg-stone-50 transition-all text-left"
                  >
                    <div
                      className={`w-12 h-12 ${bank.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <span
                        className={`font-medium text-xs ${bank.textColor}`}
                      >
                        {bank.code}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-stone-800 text-sm">
                        {bank.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: { returnToPayment: true },
                  })
                }
                className="w-full text-stone-500 hover:text-[#111] py-2 transition-colors text-sm flex items-center justify-center gap-1 mt-4"
              >
                <ArrowLeft size={14} />
                Back to checkout
              </button>
            </div>
          )}

          {/* Bank Redirect Confirmation */}
          {stage === "redirect" && bankInfo && (
            <div className="space-y-5">
              <div className="text-center">
                <div
                  className={`w-16 h-16 ${bankInfo.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <span
                    className={`font-medium text-lg ${bankInfo.textColor}`}
                  >
                    {bankInfo.code}
                  </span>
                </div>
                <h3 className="font-medium text-stone-800 text-lg">
                  {bankInfo.name}
                </h3>
                <p className="text-sm text-stone-500 mt-1">
                  Online Banking Transfer
                </p>
              </div>

              {/* Transaction Summary */}
              <div className="bg-stone-50 p-5 rounded-lg space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Merchant</span>
                  <span className="text-stone-800">Multi-Rich Home Decors</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Amount</span>
                  <span className="font-medium text-stone-800">
                    &#8369;
                    {amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Reference No.</span>
                  <span className="font-mono text-stone-800 text-xs">
                    {currentOrder.orderNumber}
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <p className="text-sm text-amber-800 font-medium mb-2">
                  Important:
                </p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>
                    - You will be redirected to {bankInfo.name}'s secure portal
                  </li>
                  <li>- Log in with your online banking credentials</li>
                  <li>- Review and authorize the payment</li>
                  <li>- You will be returned here after completion</li>
                </ul>
              </div>

              <button
                onClick={handleProceedToBank}
                className="w-full bg-[#111] text-white py-3.5 rounded-lg hover:bg-stone-800 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                Continue to {bankInfo.name}
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStage("select");
                    setSelectedBank(null);
                  }}
                  className="flex-1 text-stone-500 hover:text-[#111] py-2 transition-colors text-sm"
                >
                  Change bank
                </button>
                <button
                  onClick={() =>
                    navigate("/checkout", {
                      state: { returnToPayment: true },
                    })
                  }
                  className="flex-1 text-stone-500 hover:text-[#111] py-2 transition-colors text-sm flex items-center justify-center gap-1"
                >
                  <ArrowLeft size={14} />
                  Back to checkout
                </button>
              </div>
            </div>
          )}

          {/* Processing */}
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
                Connecting to {bankInfo?.name}...
              </p>
              <p className="text-stone-400 text-sm">
                Authorizing your bank transfer
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-stone-400 mt-8">
                <Lock size={14} />
                <span>Do not close or refresh this page</span>
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
                Bank transfer via {bankInfo?.name} confirmed.
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
                  <span className="text-stone-500">Bank</span>
                  <span className="text-stone-700">{bankInfo?.name}</span>
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
                The bank transfer could not be completed. This may be due to
                insufficient funds or a session timeout.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setStage("redirect")}
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

        {/* Security footer */}
        <div className="flex items-center justify-center gap-2 text-xs text-stone-400 mt-4">
          <ShieldCheck size={14} />
          <span>Powered by PayMongo - PCI DSS Compliant</span>
        </div>
      </div>
    </div>
  );
}
