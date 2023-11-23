import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { api } from "@src/services/user_api";
import { Users, UserCredentials } from "@src/types/users";

type UserState = {
  items: Users[];
  userInfo: Users[];
  role: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: UserState = {
  items: [],
  userInfo: [],
  role: null,
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await api.getUsers();
});

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData: UserCredentials) => {
    return await api.loginUser(userData);
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData: UserCredentials) => {
    return await api.register(userData);
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<Users[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload && action.payload.accessToken !== undefined) {
          state.userInfo = action.payload.user;
          localStorage.setItem("token", action.payload.accessToken);
          localStorage.setItem("userRole", action.payload.user.role);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Handle login failure here
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload && action.payload.accessToken) {
          localStorage.setItem("token", action.payload.accessToken);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        // Handle registration failure here
      });
  },
});

export const userReducer = usersSlice.reducer;
