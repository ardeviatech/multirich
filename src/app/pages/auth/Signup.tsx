import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/authSlice";

const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type FormData = yup.InferType<typeof schema>;

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"credentials" | "otp" | "success">("credentials");
  const [otpCode, setOtpCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange", // Enable real-time validation
  });

  // Watch password fields for real-time validation
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // Real-time password mismatch check
  const passwordMismatch = password && confirmPassword && password !== confirmPassword;

  // Countdown timer for resend
  useEffect(() => {
    if (step !== "otp") return;
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer, step]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setUserEmail(data.email);
    // Simulate sending OTP
    setTimeout(() => {
      const otp = generateOTP();
      setGeneratedOTP(otp);
      setStep("otp");
      setIsLoading(false);
      setResendTimer(60);
      setCanResend(false);
      // In a real app, OTP would be sent to email
      // For demo purposes, we'll show it in a toast-like hint
      console.log("OTP Code:", otp);
    }, 1200);
  };

  const handleOtpChange = useCallback((index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, "").slice(0, 6);
      const newOtp = [...otpCode];
      for (let i = 0; i < digits.length && index + i < 6; i++) {
        newOtp[index + i] = digits[i];
      }
      setOtpCode(newOtp);
      setOtpError("");
      const focusIndex = Math.min(index + digits.length, 5);
      otpRefs.current[focusIndex]?.focus();
      return;
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);
    setOtpError("");

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }, [otpCode]);

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "Enter") {
      // Submit OTP when Enter is pressed
      verifyOTP();
    }
  };

  const verifyOTP = () => {
    const enteredCode = otpCode.join("");
    if (enteredCode.length < 6) {
      setOtpError("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      if (enteredCode === generatedOTP) {
        setStep("success");
        // Dispatch login with minimal user data (profile incomplete)
        dispatch(
          login({
            user: {
              id: "usr_" + Math.random().toString(36).substr(2, 9),
              firstName: "",
              lastName: "",
              email: userEmail,
              phone: "",
              role: "customer",
              company: "",
            },
            accessToken: "demo_token_" + Date.now(),
            isEmailVerified: true,
          })
        );
        setIsVerifying(false);
        // Navigate to dashboard after brief success animation
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setOtpError("Invalid verification code. Please try again.");
        setIsVerifying(false);
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    if (!canResend) return;
    const otp = generateOTP();
    setGeneratedOTP(otp);
    setResendTimer(60);
    setCanResend(false);
    setOtpCode(["", "", "", "", "", ""]);
    setOtpError("");
    console.log("New OTP Code:", otp);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1
              className="text-[#111] tracking-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem",
                fontWeight: 400,
              }}
            >
              Multi-Rich Home Decors
            </h1>
          </Link>
          <p className="text-stone-600 mt-2 text-sm">
            {step === "credentials" && "Create your account"}
            {step === "otp" && "Verify your email"}
            {step === "success" && "You're all set!"}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
                step === "credentials"
                  ? "bg-[#111] text-white"
                  : "bg-[#111] text-white"
              }`}
            >
              {step === "credentials" ? "1" : <CheckCircle2 size={14} />}
            </div>
            <span className="text-xs text-stone-500 hidden sm:inline">Account</span>
          </div>
          <div className={`w-8 h-px ${step !== "credentials" ? "bg-[#111]" : "bg-stone-300"}`} />
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
                step === "otp"
                  ? "bg-[#111] text-white"
                  : step === "success"
                  ? "bg-[#111] text-white"
                  : "bg-stone-200 text-stone-400"
              }`}
            >
              {step === "success" ? <CheckCircle2 size={14} /> : "2"}
            </div>
            <span className="text-xs text-stone-500 hidden sm:inline">Verify</span>
          </div>
        </div>

        {/* Form Card */}
        <AnimatePresence mode="wait">
          {step === "credentials" && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-sm shadow-sm border border-stone-200 p-8"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="w-full pl-10 pr-12 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-transparent"
                      placeholder="Minimum 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                    <input
                      {...register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      className="w-full pl-10 pr-12 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-transparent"
                      placeholder="Re-enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>
                  )}
                  {passwordMismatch && (
                    <p className="text-red-600 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>

                {/* Terms */}
                <div className="text-sm text-stone-600">
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="text-[#111] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#111] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#111] text-white py-3 rounded-sm hover:bg-stone-800 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending verification code..." : "Continue"}
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center text-sm text-stone-600">
                Already have an account?{" "}
                <Link to="/login" className="text-[#111] font-medium hover:underline">
                  Sign in
                </Link>
              </div>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-sm shadow-sm border border-stone-200 p-8"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#f5f2ed] rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={28} className="text-[#111]" />
                </div>
                <h2
                  className="text-xl text-[#111] mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                  Check Your Email
                </h2>
                <p className="text-stone-600 text-sm">
                  We've sent a 6-digit verification code to
                </p>
                <p className="text-[#111] text-sm font-medium mt-1">{userEmail}</p>
              </div>

              {/* OTP Demo Hint */}
              <div className="bg-amber-50 border border-amber-200 rounded-sm p-3 mb-5">
                <p className="text-amber-800 text-xs text-center">
                  Demo mode — your verification code is: <span className="font-mono font-medium tracking-wider">{generatedOTP}</span>
                </p>
              </div>

              {/* OTP Input */}
              <div className="flex justify-center gap-2.5 mb-4">
                {otpCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { otpRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`w-11 h-13 text-center text-lg border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-transparent transition-colors ${
                      otpError
                        ? "border-red-300 bg-red-50"
                        : digit
                        ? "border-[#111] bg-[#faf9f7]"
                        : "border-stone-300"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-red-600 text-xs text-center mb-4">{otpError}</p>
              )}

              {/* Resend */}
              <div className="text-center mb-6">
                {canResend ? (
                  <button
                    onClick={handleResendOTP}
                    className="text-[#111] text-sm hover:underline font-medium"
                  >
                    Resend verification code
                  </button>
                ) : (
                  <p className="text-stone-500 text-sm">
                    Resend code in <span className="text-[#111] font-medium">{resendTimer}s</span>
                  </p>
                )}
              </div>

              {/* Verify Button */}
              <button
                onClick={verifyOTP}
                disabled={isVerifying}
                className="w-full bg-[#111] text-white py-3 rounded-sm hover:bg-stone-800 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed mb-4"
              >
                {isVerifying ? "Verifying..." : "Verify Email"}
              </button>

              {/* Back Button */}
              <button
                onClick={() => {
                  setStep("credentials");
                  setOtpCode(["", "", "", "", "", ""]);
                  setOtpError("");
                }}
                className="w-full flex items-center justify-center gap-2 text-stone-600 hover:text-[#111] py-2 transition-colors text-sm"
              >
                <ArrowLeft size={14} />
                Back to signup
              </button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-sm shadow-sm border border-stone-200 p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5"
              >
                <CheckCircle2 size={40} className="text-green-600" />
              </motion.div>
              <h2
                className="text-2xl text-[#111] mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                Email Verified!
              </h2>
              <p className="text-stone-600 text-sm mb-2">
                Your account has been created successfully.
              </p>
              <p className="text-stone-500 text-xs">
                Redirecting you to your dashboard...
              </p>
              <div className="mt-4">
                <div className="w-8 h-8 border-2 border-stone-200 border-t-[#111] rounded-full animate-spin mx-auto" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-stone-600 hover:text-[#111] text-sm">
            &larr; Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}