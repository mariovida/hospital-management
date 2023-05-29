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

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async () => {
    return await api.getDoctors();
  }
);

export const addNewDoctor = createAsyncThunk(
  "doctors/addNewDoctor",
  async (doctorData: Doctors) => {
    return await api.addNewDoctor(doctorData);
  }
);

export const changeDoctorStatus = createAsyncThunk(
  "doctors/changeDoctorStatus",
  async ({ id, status }: { id: string | number; status: string | any }) => {
    return await api.changeDoctorStatus(id, status);
  }
);

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(addNewDoctor.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addNewDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(changeDoctorStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(changeDoctorStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const doctorReducer = doctorsSlice.reducer;
