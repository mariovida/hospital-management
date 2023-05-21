import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { api } from "@src/services/appointment_api";
import { Appointments } from "@src/types/appointments";

type AppointmentState = {
  appointments: Appointments[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: AppointmentState = {
  appointments: [],
  status: "idle",
  error: null,
};

export const addNewAppointment = createAsyncThunk(
  "doctors/addNewAppointment",
  async ({
    appointmentData,
    id,
  }: {
    appointmentData: Appointments;
    id: string | number;
  }) => {
    return await api.addNewAppointment(appointmentData, id);
  }
);

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAppointment.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addNewAppointment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const appointmentReducer = appointmentsSlice.reducer;
