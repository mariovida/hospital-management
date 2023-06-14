import { Patients } from "@src/types/patients";
import { fetchWithToken } from "@src/utils/fetchWithToken";

export const api = {
  getPatients: async (): Promise<Patients[]> => {
    return fetchWithToken("http://localhost:3000/patients");
  },
  getPatientRecords: async (id: string): Promise<Patients[]> => {
    return fetchWithToken(`http://localhost:3000/patients/records/${id}`);
  },
  addNewPatient: async (patientData: Patients): Promise<any> => {
    return fetchWithToken("http://localhost:3000/patients/add-new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });
  },
};
