import api from './api';
import { toast } from 'react-toastify';

const OrdersService = {

    async getOrders(){
        try{
            const response = await api.get('/api/v1/orders');
            console.log(response);
            return response.data;
        }catch(error){
            console.log(error);
            throw error;
        }
    },

    async updateOrderPrices(actualPrice, discount, advancePrice, finalPrice, orderId){
        try{

            const updatedPrices = {
                discount: discount,
                advancePrice: advancePrice,
                finalPrice: finalPrice,
            };
            const response = await api.put(`/api/v1/orders/${orderId}`, updatedPrices);
            console.log(response.status);
            console.log(response);
        }catch(e){

        }
    },

    async updateOrderStatus(orderId){
        try{

            const updatedStatus = {
                orderId: orderId,
                status: "Invoice",
            };
            const response = await api.post(`/api/v1/orders/status`, updatedStatus);
            console.log(response.status);
            toast.success("Order status updated successfully");
            console.log(response); 
        }catch(e){
            console.log(e);
            toast.error("Error updating order status");
        }
    }

}

export default OrdersService;