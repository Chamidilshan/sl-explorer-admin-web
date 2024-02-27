import { toast } from "react-toastify";
import axios from 'axios';

const NotificationService = {

  async  sendNotification(title, body, image){
    const url = 'https://fcm.googleapis.com/fcm/send';
    const serverKey = import.meta.env.VITE_REACT_APP_FIREBASE_SERVER_HEADER_KEY;
    const topic = '/topics/ALLNew';
  
    const payload = { 
      to: topic, 
      notification: {
        title: title,
        body: body, 
        image: image
      }
    };


    console.log('Body: ', payload);
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `key=${serverKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      console.log(response.body);
      console.log(response.status);
  
      if (!response.status === 200) {
        throw new Error('Failed to send notification');
      }
      const responseData = await response.json();
      console.log('Notification sent successfully:', responseData);
      toast.success('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error('Error sending notification');
    }
  },

  async sendOrderConfirmationNotification(fcmToken){

    const serverKey = import.meta.env.VITE_REACT_APP_FIREBASE_SERVER_HEADER_KEY;


    try{
 
      const notificationPayload = {
        title: 'Hey, your order has been confirmed!',
        body: 'Thanks for your order. Your journey is about to begin!',
      };

 
      const requestBody = {
        to: fcmToken,
        notification: notificationPayload
      };

      const response = await axios.post('https://fcm.googleapis.com/fcm/send', requestBody, {
      headers: {
        'Authorization': `key=${serverKey}`,
        'Content-Type': 'application/json'
      },
    });
    
    console.log('Notification sent successfully:', response.data);

    }catch(e){
      console.error('Error sending notification:', e);
    }
  }
  

}

export default NotificationService; 