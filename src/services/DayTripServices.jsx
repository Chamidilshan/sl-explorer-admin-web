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

  async getDayTrip(tripId) {
    try {
      const response = await api.get(`/api/v1/dayTrips/package/${tripId}`);
      console.log(response);
      // toast.success("All packages has been loaded..!");
      return response;
    } catch (error) {
      toast.error("Something went wrong..!\n" + error.message);
      throw error;
    }
  },

  async updateDayTrip(tripId, trip) {
    try {
      const response = await api.put(`/api/v1/dayTrips/${tripId}`, trip, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      toast.success("Package has been updated successfully");
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong..!/n" + e.message);
      throw e;
    }
  },

  async deleteDayTrip(tripId) {
    try {
      const response = await api.delete(`/api/v1/dayTrips/${tripId}`);
      console.log(response);
      toast.success("Package has been deleted successfully");
      return true;
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong..!/n" + e.message);
      throw e;
    }
  },
};
