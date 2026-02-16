import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "./cartSlice";

export interface ShippingAddress {
  fullName: string;
  contactNumber: string;
  email: string;
  streetAddress: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export interface BillingAddress extends ShippingAddress {
  sameAsShipping: boolean;
}

export interface PaymentMethod {
  type: "card" | "gcash" | "ewallet" | "bank_transfer" | "billease" | "saved";
  cardNumber?: string;
  cardHolder?: string;
  gcashNumber?: string;
  bankName?: string;
  ewalletProvider?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  deliveryStatus: "confirmed" | "preparing" | "in_transit" | "delivered";
  transactionReference: string;
  createdAt: string;
  paidAt?: string;
}

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
}

const loadOrdersFromStorage = (): Order[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("multirich-orders");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const initialState: OrderState = {
  orders: loadOrdersFromStorage(),
  currentOrder: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder(state, action: PayloadAction<Omit<Order, "id" | "createdAt">>) {
      const newOrder: Order = {
        ...action.payload,
        id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      };
      state.orders.unshift(newOrder);
      state.currentOrder = newOrder;

      if (typeof window !== "undefined") {
        localStorage.setItem("multirich-orders", JSON.stringify(state.orders));
      }
    },
    updateOrderPaymentStatus(
      state,
      action: PayloadAction<{ orderId: string; status: Order["paymentStatus"]; paidAt?: string }>
    ) {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.paymentStatus = action.payload.status;
        if (action.payload.paidAt) {
          order.paidAt = action.payload.paidAt;
        }
      }
      if (state.currentOrder?.id === action.payload.orderId) {
        state.currentOrder.paymentStatus = action.payload.status;
        if (action.payload.paidAt) {
          state.currentOrder.paidAt = action.payload.paidAt;
        }
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("multirich-orders", JSON.stringify(state.orders));
      }
    },
    updateDeliveryStatus(
      state,
      action: PayloadAction<{ orderId: string; status: Order["deliveryStatus"] }>
    ) {
      const order = state.orders.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.deliveryStatus = action.payload.status;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("multirich-orders", JSON.stringify(state.orders));
      }
    },
    setCurrentOrder(state, action: PayloadAction<Order | null>) {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
  },
});

export const {
  createOrder,
  updateOrderPaymentStatus,
  updateDeliveryStatus,
  setCurrentOrder,
  clearCurrentOrder,
} = orderSlice.actions;
export default orderSlice.reducer;