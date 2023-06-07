import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { api } from "@src/services/doctor_api";
import { Doctors } from "@src/types/doctors";

type DoctorState = {
  doctors: Doctors[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: DoctorState = {
  doctors: [],
  status: "idle",
  error: null,
};

export const addNewDoctor = createAsyncThunk(
  "doctors/addNewDoctor",
  async (doctorData: Doctors) => {
    return await api.addNewDoctor(doctorData);
  }
);

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewDoctor.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addNewDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const doctorReducer = doctorsSlice.reducer;
