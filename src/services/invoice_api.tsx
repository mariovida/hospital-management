import { Invoices } from "@src/types/invoices";
import { fetchWithToken } from "@src/utils/fetchWithToken";

export const api = {
  getInvoices: async (): Promise<Invoices[]> => {
    return fetchWithToken("http://localhost:3000/invoices");
  },
};
