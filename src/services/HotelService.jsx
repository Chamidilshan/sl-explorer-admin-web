import api from './api'

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
    }
 
}

export default HotelService