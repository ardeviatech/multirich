import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  categorySlug: string;
  subProductId: string;
  image: string;
  price: number;
  quantity: number;
  finish?: string;
  thickness?: string;
  size?: string;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.12; // 12% VAT in Philippines
  const total = subtotal + tax;
  return { subtotal, tax, total };
};

const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("multirich-cart");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const initialItems = loadCartFromStorage();
const initialTotals = calculateTotals(initialItems);

const initialState: CartState = {
  items: initialItems,
  ...initialTotals,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.tax = totals.tax;
      state.total = totals.total;

      if (typeof window !== "undefined") {
        localStorage.setItem("multirich-cart", JSON.stringify(state.items));
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }

      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.tax = totals.tax;
      state.total = totals.total;

      if (typeof window !== "undefined") {
        localStorage.setItem("multirich-cart", JSON.stringify(state.items));
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);

      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.tax = totals.tax;
      state.total = totals.total;

      if (typeof window !== "undefined") {
        localStorage.setItem("multirich-cart", JSON.stringify(state.items));
      }
    },
    clearCart(state) {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.total = 0;

      if (typeof window !== "undefined") {
        localStorage.removeItem("multirich-cart");
      }
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
