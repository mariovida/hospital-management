import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { api } from "@src/services/invoice_api";
import { Invoices } from "@src/types/invoices";

type InvoiceState = {
  invoices: Invoices[];
  selectedInvoice: Invoices[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: InvoiceState = {
  invoices: [],
  selectedInvoice: [],
  status: "idle",
  error: null,
};

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async () => {
    return await api.getInvoices();
  }
);

export const fetchInvoiceDetails = createAsyncThunk(
  "invoices/fetchInvoiceDetails",
  async (id: string | number) => {
    return await api.getInvoiceDetails(id);
  }
);

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(fetchInvoiceDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedInvoice = action.payload;
      });
  },
});

export const invoiceReducer = invoicesSlice.reducer;
