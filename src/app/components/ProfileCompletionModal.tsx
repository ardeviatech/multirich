import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Phone, Building2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateUser } from "../store/authSlice";

const profileSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone number is required"),
  company: yup.string().optional().nullable().required(),
});

type ProfileFormData = yup.InferType<typeof profileSchema>;

interface ProfileCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function ProfileCompletionModal({
  isOpen,
  onClose,
  onComplete,
}: ProfileCompletionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      company: user?.company || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      dispatch(
        updateUser({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          company: data.company || "",
        })
      );
      setIsSubmitting(false);
      onComplete();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md mx-4 bg-white rounded-sm shadow-xl border border-stone-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#f5f2ed] px-6 py-5 border-b border-stone-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <User size={20} className="text-[#111]" />
                  </div>
                  <div>
                    <h2
                      className="text-xl text-[#111]"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 500,
                      }}
                    >
                      Complete Your Profile
                    </h2>
                    <p className="text-stone-600 text-xs mt-0.5">
                      Required before placing an order
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-stone-400 hover:text-stone-600 transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-sm p-3 mb-1">
                <div className="flex gap-2">
                  <CheckCircle2 size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-amber-800 text-xs">
                    Please provide your full name and contact number so we can process your orders and deliveries.
                  </p>
                </div>
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Email Address
                </label>
                <div className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-sm text-stone-500 text-sm">
                  {user?.email}
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="prof-firstName"
                    className="block text-sm font-medium text-stone-700 mb-1.5"
                  >
                    First Name *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                      size={16}
                    />
                    <input
                      {...register("firstName")}
                      type="text"
                      id="prof-firstName"
                      className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-transparent text-sm"
                      placeholder="Juan"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="prof-lastName"
                    className="block text-sm font-medium text-stone-700 mb-1.5"
                  >
                    Last Name *
                  </label>
                  <input
                    {...register("lastName")}
                    type="text"
                    id="prof-lastName"
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-transparent text-sm"
                    placeholder="Dela Cruz"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="prof-phone"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    size={16}
                  />
                  <input
                    {...register("phone")}
                    type="tel"
                    id="prof-phone"
                    className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-transparent text-sm"
                    placeholder="+63 917 123 4567"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Company (optional) */}
              <div>
                <label
                  htmlFor="prof-company"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Company <span className="text-stone-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Building2
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    size={16}
                  />
                  <input
                    {...register("company")}
                    type="text"
                    id="prof-company"
                    className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-transparent text-sm"
                    placeholder="Your company or project"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-stone-300 text-stone-700 py-2.5 rounded-sm hover:bg-stone-50 transition-colors text-sm"
                >
                  Later
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#111] text-white py-2.5 rounded-sm hover:bg-stone-800 transition-colors disabled:bg-stone-400 disabled:cursor-not-allowed text-sm"
                >
                  {isSubmitting ? "Saving..." : "Save & Continue"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
