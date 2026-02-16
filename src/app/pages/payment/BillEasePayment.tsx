import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "motion/react";
import {
  Lock,
  Wallet,
  Check,
  XCircle,
  Loader2,
  ArrowLeft,
  ShieldCheck,
  CalendarDays,
  Info,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateOrderPaymentStatus } from "../../store/orderSlice";
import { clearCart } from "../../store/cartSlice";
import { resetCheckout } from "../../store/checkoutSlice";

type Stage = "plan" | "verify" | "processing" | "success" | "failed";

const billEaseSchema = yup.object({
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .test("valid-mobile", "Enter a valid mobile number", (val) => {
      const clean = (val || "").replace(/\D/g, "");
      return clean.length >= 10 && clean.length <= 12;
    }),
  agreedToTerms: yup
    .boolean()
    .oneOf([true], "You must agree to BillEase terms")
    .required("You must agree to BillEase terms"),
});

type BillEaseFormData = yup.InferType<typeof billEaseSchema>;

const installmentPlans = [
  { months: 3, interestRate: 0, label: "3 months" },
  { months: 6, interestRate: 3.49, label: "6 months" },
  { months: 9, interestRate: 5.49, label: "9 months" },
  { months: 12, interestRate: 7.49, label: "12 months" },
];

export default function BillEasePayment() {
  const [stage, setStage] = useState<Stage>("plan");
  const [selectedPlan, setSelectedPlan] = useState(0); // index
  const [transactionRef, setTransactionRef] = useState("");

  const { currentOrder } = useAppSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<BillEaseFormData>({
    resolver: yupResolver(billEaseSchema),
    defaultValues: {
      mobileNumber: "",
      agreedToTerms: false,
    },
  });

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
  const plan = installmentPlans[selectedPlan];
  const totalWithInterest = amount * (1 + plan.interestRate / 100);
  const monthlyPayment = totalWithInterest / plan.months;

  const handleContinue = () => {
    setStage("verify");
  };

  const onSubmit = (_data: BillEaseFormData) => {
    setStage("processing");
    const ref = `BE${Date.now()}${Math.random()
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

  return (
    <div className="min-h-screen bg-[#f5f2ed] pt-24 pb-16">
      <div className="max-w-xl mx-auto px-4">
        {/* PayMongo + BillEase Header */}
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

          <div className="bg-amber-50 px-6 py-4 border-b border-amber-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-700">Total purchase amount</p>
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
              <Wallet size={20} className="text-amber-600" />
              <div>
                <span className="text-sm font-medium text-amber-800">
                  BillEase
                </span>
                <p className="text-xs text-amber-600">Buy Now, Pay Later</p>
              </div>
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
          {/* Plan Selection */}
          {stage === "plan" && (
            <div className="space-y-5">
              <div>
                <h3 className="font-medium text-stone-800 mb-1">
                  Choose your installment plan
                </h3>
                <p className="text-sm text-stone-500">
                  Split your payment into easy monthly installments
                </p>
              </div>

              <div className="space-y-3">
                {installmentPlans.map((plan, index) => {
                  const totalAmount = amount * (1 + plan.interestRate / 100);
                  const monthly = totalAmount / plan.months;
                  const isSelected = selectedPlan === index;

                  return (
                    <button
                      key={plan.months}
                      onClick={() => setSelectedPlan(index)}
                      className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                        isSelected
                          ? "border-[#111] bg-stone-50"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected
                                ? "border-[#111]"
                                : "border-stone-300"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#111]" />
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-stone-800">
                              {plan.label}
                            </span>
                            {plan.interestRate === 0 && (
                              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                0% Interest
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-stone-800">
                            &#8369;
                            {monthly.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            <span className="text-stone-500 text-xs font-normal">
                              /mo
                            </span>
                          </p>
                          {plan.interestRate > 0 && (
                            <p className="text-xs text-stone-400">
                              {plan.interestRate}% interest
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="bg-stone-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Purchase Amount</span>
                  <span className="text-stone-800">
                    &#8369;
                    {amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                {installmentPlans[selectedPlan].interestRate > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-stone-500">
                      Interest ({installmentPlans[selectedPlan].interestRate}%)
                    </span>
                    <span className="text-stone-800">
                      &#8369;
                      {(totalWithInterest - amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-medium border-t border-stone-200 pt-2">
                  <span className="text-stone-700">Total Amount</span>
                  <span className="text-stone-900">
                    &#8369;
                    {totalWithInterest.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-stone-700 flex items-center gap-1">
                    <CalendarDays size={14} />
                    Monthly Payment
                  </span>
                  <span className="text-[#111]">
                    &#8369;
                    {monthlyPayment.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-[#111] text-white py-3.5 rounded-lg hover:bg-stone-800 transition-colors font-medium"
              >
                Continue with{" "}
                {installmentPlans[selectedPlan].label} plan
              </button>

              <button
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
            </div>
          )}

          {/* Verification */}
          {stage === "verify" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <h3 className="font-medium text-stone-800 mb-1">
                  Verify your identity
                </h3>
                <p className="text-sm text-stone-500">
                  BillEase needs to verify your identity for the installment
                  plan
                </p>
              </div>

              {/* Plan Summary */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3">
                <CalendarDays
                  size={18}
                  className="text-amber-600 mt-0.5 flex-shrink-0"
                />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">
                    {plan.label} installment plan
                  </p>
                  <p className="text-amber-700">
                    &#8369;
                    {monthlyPayment.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    per month
                    {plan.interestRate > 0 &&
                      ` at ${plan.interestRate}% interest`}
                  </p>
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Registered Mobile Number
                </label>
                <input
                  type="tel"
                  {...register("mobileNumber")}
                  placeholder="09XX XXX XXXX"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111] ${
                    errors.mobileNumber ? "border-red-400" : "border-stone-300"
                  }`}
                />
                {errors.mobileNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.mobileNumber.message}
                  </p>
                )}
                <p className="text-xs text-stone-400 mt-1">
                  We'll send an OTP to this number for verification
                </p>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex gap-3">
                <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">How BillEase works:</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>- Quick credit check (no hard inquiry)</li>
                    <li>- Instant approval in most cases</li>
                    <li>- First payment due 30 days from today</li>
                    <li>
                      - Pay via GCash, Maya, bank transfer, or over-the-counter
                    </li>
                  </ul>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("agreedToTerms")}
                  className="w-4 h-4 rounded border-stone-300 mt-0.5"
                />
                <span className="text-sm text-stone-600">
                  I agree to BillEase's{" "}
                  <span className="text-[#111] underline cursor-pointer">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-[#111] underline cursor-pointer">
                    Privacy Policy
                  </span>
                  , and authorize the credit check.
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="text-red-500 text-xs">
                  {errors.agreedToTerms.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#111] text-white py-3.5 rounded-lg hover:bg-stone-800 transition-colors font-medium"
              >
                Apply & Pay with BillEase
              </button>

              <button
                type="button"
                onClick={() => setStage("plan")}
                className="w-full text-stone-500 hover:text-[#111] py-2 transition-colors text-sm flex items-center justify-center gap-1"
              >
                <ArrowLeft size={14} />
                Change plan
              </button>
            </form>
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
                Processing Application
              </h3>
              <p className="text-stone-600 mb-2">
                BillEase is reviewing your application...
              </p>
              <p className="text-stone-400 text-sm">
                This usually takes just a few seconds
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
                Application Approved!
              </h3>
              <p className="text-stone-600 mb-6">
                Your BillEase installment plan has been activated.
              </p>
              <div className="bg-stone-50 p-5 rounded-lg mb-6 text-left space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">BillEase Reference</span>
                  <span className="font-mono font-medium text-[#111]">
                    {transactionRef}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Purchase Amount</span>
                  <span className="font-medium text-[#111]">
                    &#8369;
                    {amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Plan</span>
                  <span className="text-stone-700">
                    {plan.label} @ &#8369;
                    {monthlyPayment.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    /mo
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">First Payment Due</span>
                  <span className="text-stone-600">
                    {new Date(
                      Date.now() + 30 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("en-PH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
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
                Application Not Approved
              </h3>
              <p className="text-stone-600 mb-8">
                Unfortunately, BillEase was unable to approve your application
                at this time. You may try again or choose a different payment
                method.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setStage("verify");
                    resetForm();
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
          <span>Powered by PayMongo x BillEase</span>
        </div>
      </div>
    </div>
  );
}