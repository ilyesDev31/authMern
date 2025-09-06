import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export default userSlice.reducer;
export const { logout, setCredentials } = userSlice.actions;
