import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, X } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { deleteAddress, setDefaultAddress, addAddress } from "../../store/addressSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";

const addressSchema = yup.object({
  label: yup.string().default(""),
  type: yup
    .string()
    .oneOf(["shipping", "billing"] as const)
    .required("Type is required")
    .default("shipping"),
  fullName: yup.string().required("Full name is required"),
  contactNumber: yup.string().required("Contact number is required"),
  streetAddress: yup.string().required("Street address is required"),
  barangay: yup.string().required("Barangay is required"),
  city: yup.string().required("City is required"),
  province: yup.string().required("Province is required"),
  postalCode: yup.string().required("Postal code is required"),
  isDefault: yup.boolean().default(false),
});

type AddressFormData = yup.InferType<typeof addressSchema>;

export default function DashboardAddresses() {
  const addresses = useAppSelector((state) => state.address.addresses);
  const dispatch = useAppDispatch();
  const [showAddModal, setShowAddModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      label: "",
      type: "shipping",
      fullName: "",
      contactNumber: "",
      streetAddress: "",
      barangay: "",
      city: "",
      province: "",
      postalCode: "",
      isDefault: false,
    },
  });

  const watchedType = watch("type");

  const onSubmit = (data: AddressFormData) => {
    dispatch(
      addAddress({
        ...data,
        type: data.type as "shipping" | "billing",
        isDefault: data.isDefault ?? false,
      })
    );
    toast.success("Address added successfully");
    setShowAddModal(false);
    reset();
  };

  const handleOpenModal = () => {
    reset();
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    reset();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteAddress(id));
      toast.success("Address deleted");
    }
  };

  const handleSetDefault = (id: string, type: "shipping" | "billing") => {
    dispatch(setDefaultAddress({ id, type }));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1
          className="text-4xl text-[#111]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
        >
          My Addresses
        </h1>
        <button
          onClick={handleOpenModal}
          className="inline-flex items-center gap-2 bg-[#111] text-white px-6 py-3 hover:bg-stone-800 transition-colors"
          style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}
        >
          <Plus size={18} />
          ADD NEW ADDRESS
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <motion.div
            key={address.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`bg-white border p-6 rounded-sm relative group transition-all ${
              address.isDefault ? "border-[#111] ring-1 ring-[#111]" : "border-stone-200"
            }`}
          >
            {address.isDefault && (
              <div className="absolute top-4 right-4 text-green-600 flex items-center gap-1">
                <CheckCircle2 size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Default</span>
              </div>
            )}

            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-stone-100 rounded-sm text-stone-600">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-medium text-[#111] flex items-center gap-2">
                  {address.label || "Address"}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 border border-stone-200 px-1.5 py-0.5 rounded-sm">
                    {address.type}
                  </span>
                </h3>
                <p className="text-sm font-semibold mt-1">{address.fullName}</p>
                <p className="text-sm text-stone-600">{address.contactNumber}</p>
              </div>
            </div>

            <div className="space-y-1 text-sm text-stone-600 mb-6">
              <p>{address.streetAddress}</p>
              <p>
                {address.barangay}, {address.city}
              </p>
              <p>
                {address.province}, {address.postalCode}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <div className="flex gap-4">
                <button className="text-xs text-[#111] font-semibold flex items-center gap-1 hover:underline">
                  <Edit2 size={14} />
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="text-xs text-red-600 font-semibold flex items-center gap-1 hover:underline"
                >
                  <Trash2 size={14} />
                  DELETE
                </button>
              </div>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id, address.type)}
                  className="text-xs text-stone-500 hover:text-[#111] font-semibold underline"
                >
                  SET AS DEFAULT
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for adding address */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-white max-w-lg w-full p-8 rounded-sm shadow-xl relative"
             >
                <button onClick={handleCloseModal} className="absolute top-4 right-4 text-stone-400 hover:text-[#111]">
                  <X size={20} />
                </button>
                <h2 className="text-2xl mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Add New Address</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Label</label>
                      <input 
                        type="text" 
                        {...register("label")}
                        placeholder="Home / Office" 
                        className="w-full border border-stone-200 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Type</label>
                      <select 
                        {...register("type")}
                        className="w-full border border-stone-200 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111]"
                      >
                        <option value="shipping">Shipping</option>
                        <option value="billing">Billing</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Full Name *</label>
                    <input 
                      type="text" 
                      {...register("fullName")}
                      className={`w-full border px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111] ${
                        errors.fullName ? "border-red-400" : "border-stone-200"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Contact Number *</label>
                      <input 
                        type="text" 
                        {...register("contactNumber")}
                        className={`w-full border px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111] ${
                          errors.contactNumber ? "border-red-400" : "border-stone-200"
                        }`}
                      />
                      {errors.contactNumber && (
                        <p className="text-red-500 text-xs mt-1">{errors.contactNumber.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Postal Code *</label>
                      <input 
                        type="text" 
                        {...register("postalCode")}
                        className={`w-full border px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111] ${
                          errors.postalCode ? "border-red-400" : "border-stone-200"
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Street Address *</label>
                    <input 
                      type="text" 
                      {...register("streetAddress")}
                      className={`w-full border px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111] ${
                        errors.streetAddress ? "border-red-400" : "border-stone-200"
                      }`}
                    />
                    {errors.streetAddress && (
                      <p className="text-red-500 text-xs mt-1">{errors.streetAddress.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Barangay *</label>
                      <input 
                        type="text" 
                        {...register("barangay")}
                        className={`w-full border px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111] ${
                          errors.barangay ? "border-red-400" : "border-stone-200"
                        }`}
                      />
                      {errors.barangay && (
                        <p className="text-red-500 text-xs mt-1">{errors.barangay.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">City *</label>
                      <input 
                        type="text" 
                        {...register("city")}
                        className={`w-full border px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111] ${
                          errors.city ? "border-red-400" : "border-stone-200"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1 uppercase tracking-wider">Province *</label>
                    <input 
                      type="text" 
                      {...register("province")}
                      className={`w-full border px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-[#111] ${
                        errors.province ? "border-red-400" : "border-stone-200"
                      }`}
                    />
                    {errors.province && (
                      <p className="text-red-500 text-xs mt-1">{errors.province.message}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 py-2">
                    <input 
                      type="checkbox" 
                      id="isDefault" 
                      {...register("isDefault")}
                      className="w-4 h-4 accent-[#111]"
                    />
                    <label htmlFor="isDefault" className="text-sm text-stone-600">Set as default {watchedType} address</label>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                     <button
                       type="button"
                       onClick={handleCloseModal}
                       className="w-full border border-stone-200 text-[#111] px-6 py-3 hover:bg-stone-50 transition-colors text-sm font-semibold uppercase tracking-wider"
                     >
                       CANCEL
                     </button>
                     <button
                       type="submit"
                       className="w-full bg-[#111] text-white px-6 py-3 hover:bg-stone-800 transition-colors text-sm font-semibold uppercase tracking-wider"
                     >
                       SAVE ADDRESS
                     </button>
                  </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
