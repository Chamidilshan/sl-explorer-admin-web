import api from "./api";
import { toast } from "react-toastify";

export const cruiseShipService = {
  async createCruiseShip(trip) {
    try {
      const response = await api.post("/api/v1/cruiseShips", trip, {
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

  async getCruiseShip() {
    try {
      const response = await api.get("/api/v1/cruiseShips");
      console.log(response);
      // toast.success("All packages has been loaded..!");

      return response.data;
    } catch (error) {
      toast.error("Something went wrong..!\n" + error.message);
      throw error;
    }
  },

  async getCruiseShipById(tripId) {
    try {
      const response = await api.get(`/api/v1/cruiseShips/package/${tripId}`);
      console.log(response);
      // toast.success("All packages has been loaded..!");
      return response;
    } catch (error) {
      toast.error("Something went wrong..!\n" + error.message);
      throw error;
    }
  },

  async updateCruiseShip(tripId, trip) {
    try {
      const response = await api.put(`/api/v1/cruiseShips/${tripId}`, trip, {
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
  
  async deleteCruiseShip(tripId) {
    try {
      const response = await api.delete(`/api/v1/cruiseShips/${tripId}`);
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