import { useState } from "react";
import { motion } from "motion/react";
import { User, Mail, Phone, Building2, ShieldCheck, Save } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateUser } from "../../store/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

const settingsSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  company: yup.string().optional().nullable().required(),
});

type SettingsForm = yup.InferType<typeof settingsSchema>;

export default function DashboardSettings() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsForm>({
    resolver: yupResolver(settingsSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      company: user?.company || "",
    },
  });

  const onSubmit = (data: SettingsForm) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      dispatch(updateUser(data));
      setIsSubmitting(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1
        className="text-4xl text-[#111] mb-8"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
      >
        Account Settings
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Section */}
          <section className="bg-white border border-stone-200 rounded-sm p-8">
            <h2 className="text-xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Personal Information</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">First Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                    <input
                      {...register("firstName")}
                      className={`w-full border pl-11 pr-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111] ${
                        errors.firstName ? "border-red-400" : "border-stone-200"
                      }`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                    <input
                      {...register("lastName")}
                      className={`w-full border pl-11 pr-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111] ${
                        errors.lastName ? "border-red-400" : "border-stone-200"
                      }`}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                  <input
                    {...register("email")}
                    disabled
                    className="w-full border border-stone-200 pl-11 pr-4 py-3 text-sm rounded-sm bg-stone-50 text-stone-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-[10px] text-stone-400 mt-1">Email cannot be changed for security reasons.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                    <input
                      {...register("phone")}
                      className={`w-full border pl-11 pr-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111] ${
                        errors.phone ? "border-red-400" : "border-stone-200"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-2 uppercase tracking-wider">Company (Optional)</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                    <input
                      {...register("company")}
                      className="w-full border border-stone-200 pl-11 pr-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#111] text-white px-8 py-3 hover:bg-stone-800 transition-colors text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <Save size={16} />
                  )}
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </section>

          {/* Password Section */}
          <section className="bg-white border border-stone-200 rounded-sm p-8">
            <h2 className="text-xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Security & Password</h2>
            <div className="space-y-4">
              <p className="text-sm text-stone-600">Update your password to keep your account secure.</p>
              <button className="border border-stone-300 text-[#111] px-6 py-2.5 hover:bg-stone-50 transition-colors text-xs font-semibold uppercase tracking-wider">
                CHANGE PASSWORD
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-sm p-6 text-center">
             <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-200">
                <User size={32} className="text-stone-400" />
             </div>
             <h3 className="font-medium text-[#111]">{user?.firstName} {user?.lastName}</h3>
             <p className="text-xs text-stone-500 mb-6 uppercase tracking-wider">Registered Since 2024</p>
             <button className="text-xs text-[#111] font-semibold border-b border-[#111] pb-0.5 hover:text-stone-600 hover:border-stone-600 transition-colors">
               UPLOAD PHOTO
             </button>
          </div>

          <div className="bg-[#111] text-white rounded-sm p-6">
            <div className="flex items-start gap-3 mb-4">
              <ShieldCheck className="text-green-400 shrink-0" size={20} />
              <div>
                <p className="text-sm font-medium">Verified Account</p>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">Your account is fully verified. You can place orders and track shipments seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}