import { Appointments } from "@src/types/appointments";
import { fetchWithToken } from "@src/utils/fetchWithToken";

export const api = {
  addNewAppointment: async (
    appointmentData: Appointments,
    id: string | number
  ): Promise<any> => {
    return fetchWithToken("http://localhost:3000/appointments/add-new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ appointmentData, id }),
    });
  },
};
