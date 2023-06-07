import { Doctors } from "@src/types/doctors";
import { fetchWithToken } from "@src/utils/fetchWithToken";

export const api = {
  addNewDoctor: async (doctorData: Doctors): Promise<any> => {
    return fetchWithToken("http://localhost:3000/doctors/add-new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctorData),
    });
  },
};
