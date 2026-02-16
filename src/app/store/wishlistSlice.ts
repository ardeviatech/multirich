import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
  category: any;
  id: string;
  productId: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  categorySlug: string;
  subProductId: string;
  image: string;
  price: number;
  addedAt: string;
}

export interface WishlistState {
  items: WishlistItem[];
}

const loadWishlistFromStorage = (): WishlistItem[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("multirich-wishlist");
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const initialState: WishlistState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<Omit<WishlistItem, "addedAt">>) {
      const exists = state.items.some(
        (item) =>
          item.productId === action.payload.productId &&
          item.variantId === action.payload.variantId,
      );

      if (!exists) {
        state.items.push({
          ...action.payload,
          addedAt: new Date().toISOString(),
        });

        if (typeof window !== "undefined") {
          localStorage.setItem(
            "multirich-wishlist",
            JSON.stringify(state.items),
          );
        }
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);

      if (typeof window !== "undefined") {
        localStorage.setItem("multirich-wishlist", JSON.stringify(state.items));
      }
    },
    clearWishlist(state) {
      state.items = [];

      if (typeof window !== "undefined") {
        localStorage.removeItem("multirich-wishlist");
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
