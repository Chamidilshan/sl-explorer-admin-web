import React, { useEffect, useState } from 'react'
import PermanentDrawerLeft from '../components/drawer'
import Box from '@mui/material/Box';
import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, DialogActions } from "@mui/material";
import HotelService from '../services/HotelService';
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { imageDb } from '../../config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';


export const Hotels = () => {

  const columns = [
    // {id: '_id', name: 'ID'},
    {id: 'hotelName', name: 'Name'},
    {id: 'hotelDistrict', name: 'District'},
    {id: 'hotelImage', name: 'Image'},
    {id: 'action', name: 'Actions'},
  ]

  const [_id, idChange] = useState(0);
  const [hotelName, hotelNameChange] = useState('');
  const [hotelDistrict, hotelDistrictChange] = useState('');
  const [hotelImage, hotelImageChange] = useState('');
  const [open, openChange] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const [img,setImg] =useState('')
  const [imgUrl,setImgUrl] =useState([])
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [hotelIdToDelete, setHotelIdToDelete] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('Add Hotel');

  const handleDelete = (hotelId) => { 
    setHotelIdToDelete(hotelId);
    setDeleteConfirmationOpen(true);
  };

  const cancelDelete = () => {
    setHotelIdToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await HotelService.deleteHotel(hotelIdToDelete);
      setHotels((prevHotels) => prevHotels.filter((hotel) => hotel._id !== hotelIdToDelete));
    } catch (error) {
      console.error('Error deleting hotel:', error);
      toast.error('Failed to delete hotel: ', error.message);
    } finally {
      setDeleteConfirmationOpen(false);
    }
  };



    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setImg(file);
  
      const reader = new FileReader();
      reader.onload = () => {
        setImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    };

    const handleClick = async () => {
      if (img) {
        const imgRef = ref(imageDb, `hotelImages/${v4()}`);
        try {
          const snapshot = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(snapshot.ref);
          console.log('Uploaded image URL:', url);
          hotelImageChange(url);
          setImgUrl((data) => [...data, url]);
          return url;
        } catch (error) {
          console.error('Error uploading image:', error);
          throw error; 
        }
      }
    };



  const functionAdd = ()=>{
    setIsEdit(false);
    setTitle('Add hotel');
    openPopUp();
  }

  const handleEdit = async (id)=>{
    setIsEdit(true);
    setTitle('Update Hotel');
    openPopUp();

    try{
      const hotel = await HotelService.getHotel(id);
      if(hotel){
        hotelNameChange(hotel.body.hotelName);
        hotelDistrictChange(hotel.body.hotelDistrict);
        setImg(null);
        idChange(hotel.body._id);
        setImgUrl(hotel.body.hotelImage); 
      }{
        // toast.error('Hotel not found');
        console.error('Hotel not found');
      }
    }catch(error){
      console.error('Error fetching hotel details:', error);
    }

  }

  const closePopUp = ()=>{
    openChange(false);
  }

  const openPopUp = ()=>{ 
    openChange(true);
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  }

  const handleRowPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  }

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      setLoading(true);
      const imageUrl = await handleClick();  
      const newHotel = {
        hotelName,
        hotelDistrict,
        hotelImage: imageUrl, 
      };
      if (isEdit) {
        // Call the update function instead of create function
        await HotelService.updateHotel(_id, newHotel); 
        fetchHotels(); 
      } else {
        // Call the create function
        await HotelService.createHotel(newHotel); 
        fetchHotels();
      }
      setLoading(false);
      openChange(false);
    } catch (error) {
      setLoading(false);
      toast.error('Failed to save hotel: ', error.message);
      console.error('Error:', error);
    }
  }; 
  
  const [hotels, setHotels] = useState([]);

  useEffect(() => { 
    fetchHotels();
  }, []);
 
  async function fetchHotels() {
    try {
      const data = await HotelService.getHotels();
      console.log('Hotels data:', data.data);
      setHotels(data.data);
    } catch (error) {
      console.log('Error fetching hotels:', error);
    }
  }

  
  

  return (
    <>
    <div >
    <Box sx={{ display: 'flex' }}>
     <h1 className='text-cyan-900'>Hotels</h1>
    </Box>
     
     <Paper sx={{margin: '1%', pl: '10%'}}>
      <div className='flex justify-end'>
        <Button onClick={functionAdd} variant="contained" color="primary">Add New Hotel</Button>
      </div>
      <div style={{margin: '1%'}}> 
      <TableContainer>
        <Table style={{border: '1px solid #D4D4D4', color: '#262626'}}>
          <TableHead>
            <TableRow style={{backgroundColor: '#D4D4D4'}}>
            {columns.map((column) => (
              <TableCell key={column.id} style={{color: '#262626', fontSize: '18px', fontWeight: 600}}>
                {column.name}
              </TableCell>
            ))}
            </TableRow> 
          </TableHead>
          <TableBody >
          {hotels.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map((hotel) => ( 
              <TableRow key={hotel._id} >
                {/* <TableCell>{hotel._id}</TableCell> */}
                <TableCell style={{fontSize: '16px'}}>{hotel.hotelName}</TableCell>
                <TableCell style={{fontSize: '16px'}}>{hotel.hotelDistrict}</TableCell>
                <TableCell style={{fontSize: '16px'}}>
                  <img src={hotel.hotelImage} alt={hotel.hotelName} style={{ maxWidth: '100px' }} />
                </TableCell>
                <TableCell>
                <Button variant='contained' onClick={e=>{handleEdit(hotel._id)}} color='primary' sx={{margin: '5px'}} >Edit</Button>
                  <Button variant='contained' onClick={e=>{handleDelete(hotel._id)}} style={{backgroundColor: '#D97706'}} >Delete</Button>
                </TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>
      </TableContainer> 
    <TablePagination
      rowsPerPageOptions={[2, 5, 10, 20]}
      rowsPerPage={rowsPerPage}
      page={page}
      count={hotels.length} 
      component={'div'}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowPerPageChange}>
    </TablePagination>

      </div>
     </Paper>

     <Dialog open={open} onClose={closePopUp} fullWidth maxWidth='sm' >
      <DialogTitle>
        <span>{title}</span>
      </DialogTitle> 
      <DialogContent> 
        <form onSubmit={handleSubmit}> 
          <Stack spacing={2} margin={2}>
            <TextField value={hotelName} required onChange={e=>{hotelNameChange(e.target.value)}} variant='outlined' label='Hotel Name'></TextField>
            <TextField value={hotelDistrict} onChange={e=>{hotelDistrictChange(e.target.value)}} variant='outlined' label='Hotel District'></TextField>
            <input type="file" onChange={handleFileChange}/> 
            {img !== '' ? (imgUrl && <img src={imgUrl} alt="Selected" />) : null} 
                <br/>
            <Button type='submit' variant='contained' disabled={loading}>Save</Button>
          </Stack>
        </form> 
      </DialogContent>
     </Dialog>

     <Dialog open={deleteConfirmationOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this hotel?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color='secondary'>Delete</Button>
        </DialogActions>
      </Dialog>

    </div>  
   </> 
  )
} 
