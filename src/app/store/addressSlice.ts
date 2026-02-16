import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  id: string;
  type: "shipping" | "billing";
  isDefault: boolean;
  fullName: string;
  contactNumber: string;
  streetAddress: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: string;
  label?: string; // e.g., "Home", "Office"
}

interface AddressState {
  addresses: Address[];
}

const loadAddressesFromStorage = (): Address[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("multirich-addresses");
    if (saved) return JSON.parse(saved);
  }
  return [
    {
      id: "addr_1",
      type: "shipping",
      isDefault: true,
      fullName: "Juan Dela Cruz",
      contactNumber: "+63 917 123 4567",
      streetAddress: "123 Marble Street",
      barangay: "San Lorenzo",
      city: "Makati",
      province: "Metro Manila",
      postalCode: "1223",
      label: "Home",
    },
  ];
};

const initialState: AddressState = {
  addresses: loadAddressesFromStorage(),
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress(state, action: PayloadAction<Omit<Address, "id">>) {
      const newAddress: Address = {
        ...action.payload,
        id: `addr_${Date.now()}`,
      };
      if (newAddress.isDefault) {
        state.addresses = state.addresses.map((a) =>
          a.type === newAddress.type ? { ...a, isDefault: false } : a
        );
      }
      state.addresses.push(newAddress);
      localStorage.setItem("multirich-addresses", JSON.stringify(state.addresses));
    },
    updateAddress(state, action: PayloadAction<Address>) {
      const index = state.addresses.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        if (action.payload.isDefault) {
          state.addresses = state.addresses.map((a) =>
            a.type === action.payload.type ? { ...a, isDefault: false } : a
          );
        }
        state.addresses[index] = action.payload;
        localStorage.setItem("multirich-addresses", JSON.stringify(state.addresses));
      }
    },
    deleteAddress(state, action: PayloadAction<string>) {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
      localStorage.setItem("multirich-addresses", JSON.stringify(state.addresses));
    },
    setDefaultAddress(state, action: PayloadAction<{ id: string; type: "shipping" | "billing" }>) {
      state.addresses = state.addresses.map((a) => {
        if (a.type === action.payload.type) {
          return { ...a, isDefault: a.id === action.payload.id };
        }
        return a;
      });
      localStorage.setItem("multirich-addresses", JSON.stringify(state.addresses));
    },
  },
});

export const { addAddress, updateAddress, deleteAddress, setDefaultAddress } = addressSlice.actions;
export default addressSlice.reducer;
