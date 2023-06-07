import { configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";

import { userReducer } from "@src/store/slices/usersSlice";
import { patientReducer } from "@src/store/slices/patientsSlice";
import { doctorReducer } from "@src/store/slices/doctorsSlice";
import { invoiceReducer } from "@src/store/slices/invoicesSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    patients: patientReducer,
    doctors: doctorReducer,
    invoices: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
