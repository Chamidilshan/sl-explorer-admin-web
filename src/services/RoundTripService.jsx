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
      return response.data;
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong", e.message);
      throw error;
    }
  },
};
