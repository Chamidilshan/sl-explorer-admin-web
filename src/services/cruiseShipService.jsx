import api from "./api";
import { toast } from "react-toastify";

const cruiseShipService = {
  // async getcruiseShip(){
  //     try{
  //         const response = await api.get('/api/v1/cruiseShips');
  //         console.log(response);
  //         return response.data;
  //     }catch(error){
  //         console.log(error);
  //         throw error;
  //     }
  // },

  async createcruiseShip(cruiseShip) {
    try {
      const response = await api.post("/api/v1/cruiseShips", cruiseShip);
      console.log(response);
      toast.success("cruiseShip created successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to create cruiseShip : ", error.message);
      throw error;
    }
  },

  async deletecruiseShip(cruiseShipId) {
    try {
      const response = await api.delete(`/api/v1/cruiseShips/${cruiseShipId}`);
      console.log(response);
      toast.success("cruiseShip deleted successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete cruiseShip : ", error.message);
      throw error;
    }
  },

  async getcruiseShip(cruiseShipId) {
    try {
      const response = await api.get(`/api/v1/cruiseShips/${cruiseShipId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch cruiseShip details: ", error.message);
      throw error;
    }
  },

  async updatecruiseShip(cruiseShipId, cruiseShip) {
    try {
      const response = await api.patch(
        `/api/v1/cruiseShips/${cruiseShipId}`,
        cruiseShip
      );
      console.log(response);
      toast.success("cruiseShip updated successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to update cruiseShip : ", error.message);
      throw error;
    }
  },

  async createcruiseShip(cruiseShip) {
    try {
      const response = await api.post("/api/v1/cruiseShips", cruiseShip);
      console.log(response);
      toast.success("cruiseShip created successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to create cruiseShip : ", error.message);
      throw error;
    }
  },

  async deletecruiseShip(cruiseShipId) {
    try {
      const response = await api.delete(`/api/v1/cruiseShips/${cruiseShipId}`);
      console.log(response);
      toast.success("cruiseShip deleted successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete cruiseShip : ", error.message);
      throw error;
    }
  },

  async getcruiseShipById(cruiseShipId) {
    try {
      const response = await api.get(`/api/v1/cruiseShips/${cruiseShipId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch cruiseShip details: ", error.message);
      throw error;
    }
  },

  async updatecruiseShip(cruiseShipId, cruiseShip) {
    try {
      const response = await api.patch(
        `/api/v1/cruiseShips/${cruiseShipId}`,
        cruiseShip
      );
      console.log(response);
      toast.success("cruiseShip updated successfully");
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to update cruiseShip : ", error.message);
      throw error;
    }
  },
};

export default cruiseShipService;
