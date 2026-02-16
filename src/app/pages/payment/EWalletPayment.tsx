import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Lock,
  Smartphone,
  Check,
  XCircle,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  Clock,
  QrCode,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateOrderPaymentStatus } from "../../store/orderSlice";
import { clearCart } from "../../store/cartSlice";
import { resetCheckout } from "../../store/checkoutSlice";

type Stage = "select" | "qr" | "processing" | "success" | "failed";

const ewallets = [
  {
    id: "gcash",
    name: "GCash",
    color: "bg-blue-600",
    textColor: "text-blue-600",
    bgLight: "bg-blue-50",
    description: "Pay with your GCash wallet",
  },
  {
    id: "maya",
    name: "Maya",
    color: "bg-green-600",
    textColor: "text-green-600",
    bgLight: "bg-green-50",
    description: "Pay with Maya (formerly PayMaya)",
  },
  {
    id: "grabpay",
    name: "GrabPay",
    color: "bg-emerald-600",
    textColor: "text-emerald-600",
    bgLight: "bg-emerald-50",
    description: "Pay with GrabPay wallet",
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    color: "bg-orange-600",
    textColor: "text-orange-600",
    bgLight: "bg-orange-50",
    description: "Pay with ShopeePay wallet",
  },
];

// Generate a deterministic fake QR code pattern
function FakeQRCode({ data, size = 200 }: { data: string; size?: number }) {
  const cells = 25;
  const cellSize = size / cells;

  // Generate pattern from data string
  const pattern: boolean[][] = [];
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = (hash << 5) - hash + data.charCodeAt(i);
    hash |= 0;
  }

  for (let row = 0; row < cells; row++) {
    pattern[row] = [];
    for (let col = 0; col < cells; col++) {
      // Finder patterns (3 corners)
      const inTopLeft = row < 7 && col < 7;
      const inTopRight = row < 7 && col >= cells - 7;
      const inBottomLeft = row >= cells - 7 && col < 7;

      if (inTopLeft || inTopRight || inBottomLeft) {
        const r = inTopLeft ? row : inTopRight ? row : row - (cells - 7);
        const c = inTopLeft ? col : inTopRight ? col - (cells - 7) : col;
        if (r === 0 || r === 6 || c === 0 || c === 6) {
          pattern[row][col] = true;
        } else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          pattern[row][col] = true;
        } else {
          pattern[row][col] = false;
        }
      } else {
        // Data area - pseudo-random based on hash
        const seed = (hash * (row * cells + col + 1)) & 0xffff;
        pattern[row][col] = seed % 3 !== 0;
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" />
      {pattern.map((row, r) =>
        row.map(
          (filled, c) =>
            filled && (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#111"
              />
            )
        )
      )}
    </svg>
  );
}

export default function EWalletPayment() {
  const [stage, setStage] = useState<Stage>("select");
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [transactionRef, setTransactionRef] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const { currentOrder } = useAppSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const walletInfo = ewallets.find((w) => w.id === selectedWallet);

  // Countdown timer for QR code
  useEffect(() => {
    if (stage !== "qr") return;
    if (timeLeft <= 0) {
      setStage("failed");
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [stage, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectWallet = (walletId: string) => {
    setSelectedWallet(walletId);
    setTimeLeft(300);
    setStage("qr");
  };

  const handleSimulatePayment = useCallback(() => {
    if (!currentOrder) return;
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
  }, [currentOrder, dispatch]);

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
              <Smartphone size={20} className="text-indigo-600" />
              <span className="text-sm font-medium text-stone-700">
                E-Wallet
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
          {/* Wallet Selection */}
          {stage === "select" && (
            <div className="space-y-4">
              <h3 className="font-medium text-stone-800 mb-4">
                Choose your e-wallet
              </h3>

              <div className="space-y-3">
                {ewallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleSelectWallet(wallet.id)}
                    className="w-full flex items-center gap-4 p-4 border-2 border-stone-200 rounded-lg hover:border-stone-400 transition-all text-left group"
                  >
                    <div
                      className={`w-12 h-12 ${wallet.bgLight} rounded-lg flex items-center justify-center`}
                    >
                      <span
                        className={`font-medium text-sm ${wallet.textColor}`}
                      >
                        {wallet.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#111]">{wallet.name}</p>
                      <p className="text-xs text-stone-500">
                        {wallet.description}
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

          {/* QR Code Display */}
          {stage === "qr" && walletInfo && (
            <div className="text-center space-y-5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div
                  className={`w-8 h-8 ${walletInfo.bgLight} rounded-lg flex items-center justify-center`}
                >
                  <span
                    className={`font-medium text-xs ${walletInfo.textColor}`}
                  >
                    {walletInfo.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium text-stone-800">
                  {walletInfo.name}
                </span>
              </div>

              <p className="text-sm text-stone-600">
                Scan this QR code with your {walletInfo.name} app to pay
              </p>

              {/* QR Code */}
              <div className="inline-block p-4 bg-white border-2 border-stone-200 rounded-xl shadow-sm">
                <FakeQRCode
                  data={`${walletInfo.id}_${currentOrder.id}_${amount}`}
                  size={220}
                />
              </div>

              {/* Timer */}
              <div className="flex items-center justify-center gap-2">
                <Clock size={16} className="text-stone-400" />
                <span
                  className={`text-sm font-medium ${
                    timeLeft < 60 ? "text-red-500" : "text-stone-600"
                  }`}
                >
                  Expires in {formatTime(timeLeft)}
                </span>
              </div>

              {/* Instructions */}
              <div className="bg-stone-50 p-4 rounded-lg text-left">
                <p className="font-medium text-stone-700 text-sm mb-3">
                  How to pay:
                </p>
                <ol className="text-sm text-stone-600 space-y-2">
                  <li className="flex gap-3">
                    <span className="w-5 h-5 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      1
                    </span>
                    Open your {walletInfo.name} app
                  </li>
                  <li className="flex gap-3">
                    <span className="w-5 h-5 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      2
                    </span>
                    Tap "Scan QR" or the QR code icon
                  </li>
                  <li className="flex gap-3">
                    <span className="w-5 h-5 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      3
                    </span>
                    Scan the QR code above
                  </li>
                  <li className="flex gap-3">
                    <span className="w-5 h-5 bg-stone-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                      4
                    </span>
                    Confirm the payment in the app
                  </li>
                </ol>
              </div>

              {/* Simulate payment button (for demo purposes) */}
              <button
                onClick={handleSimulatePayment}
                className="w-full bg-[#111] text-white py-3.5 rounded-lg hover:bg-stone-800 transition-colors font-medium"
              >
                <span className="flex items-center justify-center gap-2">
                  <QrCode size={18} />
                  Simulate Payment (Demo)
                </span>
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStage("select");
                    setSelectedWallet(null);
                  }}
                  className="flex-1 text-stone-500 hover:text-[#111] py-2 transition-colors text-sm"
                >
                  Change wallet
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
                Confirming payment with {walletInfo?.name}...
              </p>
              <p className="text-stone-400 text-sm">
                Please wait while we verify your transaction
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
                Your {walletInfo?.name} payment has been confirmed.
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
                  <span className="text-stone-700">{walletInfo?.name}</span>
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
                {timeLeft <= 0
                  ? "The QR code has expired. Please try again."
                  : "We couldn't confirm your payment. Please try again."}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setTimeLeft(300);
                    setStage("qr");
                  }}
                  className="w-full bg-[#111] text-white py-3.5 rounded-lg hover:bg-stone-800 transition-colors font-medium"
                >
                  Try Again
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
