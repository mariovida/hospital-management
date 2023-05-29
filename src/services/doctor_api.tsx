import { Doctors } from "@src/types/doctors";
import { fetchWithToken } from "@src/utils/fetchWithToken";

export const api = {
  getDoctors: async (): Promise<Doctors[]> => {
    return fetchWithToken("http://localhost:3000/doctors");
  },
  addNewDoctor: async (doctorData: Doctors): Promise<any> => {
    return fetchWithToken("http://localhost:3000/doctors/add-new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
    });
  },
  changeDoctorStatus: async (
    id: string | number,
    status: string
  ): Promise<any> => {
    return fetchWithToken(
      `http://localhost:3000/doctors/change-status/${id}?status=${status}`
    );
  },
};
