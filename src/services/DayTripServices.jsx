import api from "./api";
import { toast } from "react-toastify";

export const DayTripServices = {
  async createDayTrip(trip) {
    try {
      const response = await api.post("/api/v1/dayTrips", trip, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      toast.success("Package has been added successfully");
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong..!/n" + e.message);
      throw e;
    }
  },

  async getDayTrips() {
    try {
      const response = await api.get("/api/v1/dayTrips");
      console.log(response);
      // toast.success("All packages has been loaded..!");

      return response.data;
    } catch (error) {
      toast.error("Something went wrong..!\n" + error.message);
      throw error;
    }
  },
};
