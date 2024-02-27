import api from "./api";
import { toast } from "react-toastify";

export const RoundTripServices = {
  async createRoundTrip(trip) {
    try {
      const response = await api.post("/api/v1/roundTrips", trip, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      toast.success("Package has been added successfully");
      alert("Package Created\nCheck and then Please go back..!");
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong..!/n" + e.message);
      throw e;
    }
  },

  async updateRoundTrip(trip) {
    try {
      const response = await api.put("/api/v1/roundTrips", trip, {
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

  async deleteRoundTrip(tripId) {
    try {
      const response = await api.delete(`/api/v1/roundTrips/${tripId}`);
      console.log(response);
      toast.success("Package has been deleted successfully");
      return true;
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong..!/n" + e.message);
      return false;
      throw e;
    }
  },

  async getRoundtrips() {
    try {
      const response = await api.get("/api/v1/roundtrips");
      console.log(response);
      // toast.success("All packages have been loaded..!");
      return response.data;
    } catch (error) {
      toast.error("Something went wrong..!\n" + error.message);
      throw error;
    }
  },

  async getRoundtripById(tripId) {
    try {
      const response = await api.get(`/api/v1/roundtrips/${tripId}`);
      console.log(response);
      toast.success("Package has been loaded..!");
      return response.data;
    } catch (error) {
      toast.error("Something went wrong..!\n" + error.message);
      throw error;
    }
  },
};
