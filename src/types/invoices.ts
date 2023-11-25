export interface Invoices {
  id: string;
  inv_number?: string;
  created_at: string;
  status?: string;
  patient_id: number;
  items?: [];
  total_price?: number;
}
