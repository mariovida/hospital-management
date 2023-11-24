export interface Invoices {
  id: string;
  inv_number: string;
  created_at: string;
  status: boolean;
  patient_id: number;
  items?: [];
  totalAmount?: number;
}
