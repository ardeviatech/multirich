import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "motion/react";
import { Mail, CheckCircle } from "lucide-react";

const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (_data: FormData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f8f6f3] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-sm shadow-sm border border-stone-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h2
              className="text-2xl text-[#111] mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Check Your Email
            </h2>
            <p className="text-stone-600 mb-6">
              We've sent password reset instructions to your email address. Please check your inbox
              and follow the link to reset your password.
            </p>
            <Link
              to="/login"
              className="inline-block w-full bg-[#111] text-white py-3 rounded-sm hover:bg-stone-800 transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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
          <p className="text-stone-600 mt-2 text-sm">Reset your password</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-sm shadow-sm border border-stone-200 p-8">
          <div className="mb-6">
            <h2
              className="text-xl text-[#111] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Forgot Password?
            </h2>
            <p className="text-stone-600 text-sm">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#111] text-white py-3 rounded-sm hover:bg-stone-800 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center text-sm text-stone-600">
            Remember your password?{" "}
            <Link to="/login" className="text-[#111] font-medium hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-stone-600 hover:text-[#111] text-sm">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
