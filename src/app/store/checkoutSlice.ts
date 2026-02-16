import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShippingAddress, BillingAddress } from "./orderSlice";

export interface CheckoutState {
  shippingData: ShippingAddress | null;
  billingData: BillingAddress | null;
  step: "shipping" | "billing" | "payment";
}

const initialState: CheckoutState = {
  shippingData: null,
  billingData: null,
  step: "shipping",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingData(state, action: PayloadAction<ShippingAddress>) {
      state.shippingData = action.payload;
    },
    setBillingData(state, action: PayloadAction<BillingAddress>) {
      state.billingData = action.payload;
    },
    setCheckoutStep(state, action: PayloadAction<CheckoutState["step"]>) {
      state.step = action.payload;
    },
    resetCheckout(state) {
      state.shippingData = null;
      state.billingData = null;
      state.step = "shipping";
    },
  },
});

export const { setShippingData, setBillingData, setCheckoutStep, resetCheckout } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
