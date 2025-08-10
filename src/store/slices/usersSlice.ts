import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  me: any | null;
  isLoaded: boolean;
  authToken: string | null;
  tokenExpiry: number | null;
}

const initialState: UserState = {
  me: null,
  isLoaded: false,
  authToken: null,
  tokenExpiry: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.me = action.payload;
      state.isLoaded = true;
    },
    setAuthToken: (
      state,
      action: PayloadAction<{ token: string; expiry?: number }>,
    ) => {
      state.authToken = action.payload.token;
      // Set expiry to 1 hour from now if not provided
      state.tokenExpiry = action.payload.expiry || Date.now() + 3600000;
    },
    clearUserData: (state) => {
      state.me = null;
      state.isLoaded = false;
      state.authToken = null;
      state.tokenExpiry = null;
    },
  },
});

export const { setUserData, setAuthToken, clearUserData } = userSlice.actions;
export default userSlice.reducer;
