import api from './api'
import { toast } from 'react-toastify';

const HotelService = {

    async getHotels(){
        try{
            const response = await api.get('/api/v1/hotels');
            console.log(response);
            return response.data;
        }catch(error){
            console.log(error);
            throw error;
        }
    },

    async createHotel(hotel){
        try{
            const response = await api.post('/api/v1/hotels', hotel);
            console.log(response); 
            toast.success('Hotel created successfully');
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to create hotel : ', error.message);
            throw error;
        }
    },
    
    async deleteHotel(hotelId){
        try{
            const response = await api.delete(`/api/v1/hotels/${hotelId}`);
            console.log(response);
            toast.success('Hotel deleted successfully');
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to delete hotel : ', error.message);
            throw error;
        }
    },
 
}

export default HotelService