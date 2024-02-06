import { toast } from "react-toastify";

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
  

}

export default NotificationService;