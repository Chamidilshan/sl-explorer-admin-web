import React, { useState } from 'react';
import PermanentDrawerLeft from '../components/drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid'; 
import { imageDb } from '../../config';
import NotificationService from '../services/NotificationService';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export const NotificationCampaign = () => {
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddNotification = async () => {
    if (img && title && body) {
      setLoading(true);
      const imageUrl = await uploadImageToFirebase();
      if (imageUrl) {
        await sendNotification(title, body, imageUrl);
        setLoading(false);  
      }
    } else {
      alert('Please select an image and fill in the title and body fields.');
    }
  }; 

  const uploadImageToFirebase = async () => {
    const imgRef = ref(imageDb, `notificationImages/${v4()}`);
    try {
      const snapshot = await uploadBytes(imgRef, img);
      const url = await getDownloadURL(snapshot.ref);
      console.log('Uploaded image URL:', url);
      return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const sendNotification = async (title, body, imageUrl) => {
    try {
      await NotificationService.sendNotification(title, body, imageUrl);
      console.log('Notification sent successfully');
      // Reset form fields after successful submission
      setImg(null);
      setImgUrl('');
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <> 
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ ml: 2, mt: 2 }}>Notification Campaign</Typography>
      </Box>

      <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box ml={40} mt={4}>
        <Box sx={{ ml: 2, mb: 2 }}>
          <form>
            <Typography variant="h6" sx={{ mb: 1, textAlign: 'left', fontSize: '18px' }}>Title</Typography>
            <TextField
              id="title"
              variant="outlined"
              size="small"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 1, textAlign: 'left', fontSize: '18px' }}>Body</Typography>
            <TextField
              id="body"
              variant="outlined"
              fullWidth
              size="small"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 1, textAlign: 'left', fontSize: '18px' }}>Image</Typography>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <input type="file" onChange={handleFileChange} /> 
              {imgUrl && <img src={imgUrl} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />} 
              <br/>
            </Box>
            <Button variant="contained" sx={{ mt: 2 }} color="primary" onClick={handleAddNotification}>Add Notification</Button>
          </form> 
        </Box>
      </Box>
    </>
  );
};
 