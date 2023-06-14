import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { api } from "@src/services/patient_api";
import { Patients } from "@src/types/patients";

type PatientState = {
  patients: Patients[];
  selectedRecords: Patients[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: PatientState = {
  patients: [],
  selectedRecords: [],
  status: "idle",
  error: null,
};

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    return await api.getPatients();
  }
);

export const fetchPatientRecords = createAsyncThunk(
  "patients/fetchPatientRecords",
  async (id: string) => {
    return await api.getPatientRecords(id);
  }
);

export const addNewPatient = createAsyncThunk(
  "patients/addNewPatient",
  async (patientData: Patients) => {
    return await api.addNewPatient(patientData);
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(fetchPatientRecords.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedRecords = action.payload;
      })
      .addCase(addNewPatient.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addNewPatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const patientReducer = patientsSlice.reducer;
