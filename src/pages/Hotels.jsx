import React, { useEffect, useState } from 'react'
import PermanentDrawerLeft from '../components/drawer'
import Box from '@mui/material/Box';
import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import HotelService from '../services/HotelService';

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

  const functionAdd = ()=>{
    openPopUp();
  }

  const closePopUp = ()=>{
    openChange(false);
  }

  const openPopUp = ()=>{ 
    openChange(true);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const _obj= {_id, hotelName, hotelDistrict, hotelImage};
    console.log(_obj);
  }

  const [hotels, setHotels] = useState([]);

  useEffect(() => { 
    async function fetchHotels() {
      try {
        const data = await HotelService.getHotels();
        console.log('Hotels data:', data.data);
        setHotels(data.data);
      } catch (error) {
        console.log('Error fetching hotels:', error);
      }
    }
  
    fetchHotels();
  }, []);
  
  

  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <PermanentDrawerLeft />
     <h1 className='text-cyan-900'>Hotels</h1>
    </Box>
     
     <Paper sx={{margin: '1%', pl: '10%'}}>
      <div className='flex justify-end'>
        <Button onClick={functionAdd} variant="contained" color="primary">Add New Hotel</Button>
      </div>
      <div style={{margin: '1%'}}> 
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{backgroundColor: '#D4D4D4'}}>
            {columns.map((column) => (
              <TableCell key={column.id}>
                {column.name}
              </TableCell>
            ))}
            </TableRow> 
          </TableHead>
          <TableBody>
          {hotels.map((hotel) => (
              <TableRow key={hotel._id}>
                {/* <TableCell>{hotel._id}</TableCell> */}
                <TableCell>{hotel.hotelName}</TableCell>
                <TableCell>{hotel.hotelDistrict}</TableCell>
                <TableCell>
                  <img src={hotel.hotelImage} alt={hotel.hotelName} style={{ maxWidth: '100px' }} />
                </TableCell>
                <TableCell>
                  {/* Actions buttons go here */}
                </TableCell>
              </TableRow>
            ))} 
</TableBody>

        </Table>
      </TableContainer> 
      </div>
     </Paper>

     <Dialog open={open} onClose={closePopUp} fullWidth maxWidth='sm' >
      <DialogTitle>
        <span>Create A Hotel</span>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} margin={2}>
            <TextField value={hotelName} required onChange={e=>{hotelNameChange(e.target.value)}} variant='outlined' label='Hotel Name'></TextField>
            <TextField value={hotelDistrict} onChange={e=>{hotelDistrictChange(e.target.value)}} variant='outlined' label='Hotel District'></TextField>
            <TextField value={hotelImage} onChange={e=>{hotelImageChange(e.target.value)}} variant='outlined' label='Hotel Image'></TextField>
            <Button type='submit' variant='contained'>Save</Button>
          </Stack>
        </form>
      </DialogContent>
     </Dialog>
   </>
  )
}
