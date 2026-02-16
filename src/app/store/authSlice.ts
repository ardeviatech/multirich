import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  company: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isProfileComplete: boolean;
  isEmailVerified: boolean;
}

const checkProfileComplete = (user: User | null): boolean => {
  if (!user) return false;
  return !!(user.firstName && user.lastName && user.phone);
};

// Initial user credentials pre-loaded in Redux store
const initialUser: User = {
  id: "usr_001",
  firstName: "Juan",
  lastName: "Dela Cruz",
  email: "juan.delacruz@multirich.ph",
  phone: "+63 917 123 4567",
  role: "admin",
  company: "Multi-Rich Home Decors Inc.",
};

const initialState: AuthState = {
  user: initialUser,
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.multirich-demo-token",
  isAuthenticated: true,
  isProfileComplete: true,
  isEmailVerified: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ user: User; accessToken: string; isEmailVerified?: boolean }>
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isProfileComplete = checkProfileComplete(action.payload.user);
      state.isEmailVerified = action.payload.isEmailVerified ?? true;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isProfileComplete = false;
      state.isEmailVerified = false;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.isProfileComplete = checkProfileComplete(state.user);
      }
    },
    setEmailVerified(state, action: PayloadAction<boolean>) {
      state.isEmailVerified = action.payload;
    },
  },
});

export const { login, logout, setAccessToken, updateUser, setEmailVerified } = authSlice.actions;
export default authSlice.reducer;
