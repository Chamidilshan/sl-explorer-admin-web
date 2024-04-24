import api from './api'
import { toast } from 'react-toastify';

const A_ZService = {

    async getA_Z(){
        try{
            const response = await api.get('/api/v1/a_z');
            console.log(response);
            return response.data;
        }catch(error){
            console.log(error);
            throw error;
        }
    },

    async createA_Z(a_z){
        try{
            const response = await api.post('/api/v1/a_z', a_z);
            console.log(response); 
            toast.success('Sri Lanka A-Z topic created successfully');
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to create the topic : ', error.message);
            throw error;
        }
    },

    async getA_ZById(a_zId){
        try{
            const response = await api.get(`/api/v1/a_z/${a_zId}`);
            console.log(response);
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to fetch Sri Lanka A-Z details: ', error.message);
            throw error;
        }
    },
    
    async deleteA_Z(a_zId){
        try{
            const response = await api.delete(`/api/v1/a_z/${a_zId}`);
            console.log(response);
            toast.success('Topic deleted successfully');
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to delete Topic : ', error.message);
            throw error;
        }
    },

    async updateA_Z(a_zId, a_z){
        try{
            const response = await api.patch(`/api/v1/a_z/${a_zId}`, a_z);
            console.log(response);
            toast.success('Topic updated successfully');
            return response.data;
        }catch(error){
            console.log(error);
            toast.error('Failed to update the topic : ', error.message);
            throw error;
        }
    }
 
}

export default A_ZService
