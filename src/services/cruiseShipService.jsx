import api from "./api";
import { toast } from "react-toastify";

<<<<<<< Updated upstream
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

    async createcruiseShip(cruiseShip){
        try{
            const response = await api.post('/api/v1/cruiseShips', cruiseShip);
            console.log(response); 
            toast.success('cruiseShip created successfully');
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to create cruiseShip : ', error.message);
            throw error;
        }
    },
    
    async deletecruiseShip(cruiseShipId){
        try{
            const response = await api.delete(`/api/v1/cruiseShips/${cruiseShipId}`);
            console.log(response);
            toast.success('cruiseShip deleted successfully');
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to delete cruiseShip : ', error.message);
            throw error;
        }
    },

    async getcruiseShip(cruiseShipId){
        try{
            const response = await api.get(`/api/v1/cruiseShips/${cruiseShipId}`);
            console.log(response);
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to fetch cruiseShip details: ', error.message);
            throw error;
        }
    },

    async updatecruiseShip(cruiseShipId,cruiseShip){
        try{
            const response = await api.patch(`/api/v1/cruiseShips/${cruiseShipId}`, cruiseShip);
            console.log(response);
            toast.success('cruiseShip updated successfully');
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to update cruiseShip : ', error.message);
            throw error;
        }
=======
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
>>>>>>> Stashed changes
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
