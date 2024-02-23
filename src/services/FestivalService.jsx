import api from './api'
import { toast } from 'react-toastify';

const FestivalService = {

    async getFestival(){
        try{
            const response = await api.get('/api/v1/festivals');
            console.log(response);
            return response.data;
        }catch(error){
            console.log(error);
            throw error;
        }
    },

    async createFestival(festival){
        try{
            const response = await api.post('/api/v1/festivals', festival);
            console.log(response); 
            toast.success('Festival/Event created successfully');
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to create Festival/Event : ', error.message);
            throw error;
        }
    },

    async getFestivalById(festivalId){
        try{
            const response = await api.get(`/api/v1/festivals/${festivalId}`);
            console.log(response);
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to fetch festival/event details: ', error.message);
            throw error;
        }
    },
    
    async deleteFestival(festivalId){
        try{
            const response = await api.delete(`/api/v1/festivals/${festivalId}`);
            console.log(response);
            toast.success('Festival/Event deleted successfully');
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to delete Festival/Event : ', error.message);
            throw error;
        }
    },

    async updateFestival(festivalId, festival){
        try{
            const response = await api.patch(`/api/v1/festivals/${festivalId}`, festival);
            console.log(response);
            toast.success('Festival/Event updated successfully');
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to update festival/event : ', error.message);
            throw error;
        }
    }
 
}

export default FestivalService
