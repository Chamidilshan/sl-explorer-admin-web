import React, { useEffect, useState } from 'react'
import PermanentDrawerLeft from '../components/drawer'
import Box from '@mui/material/Box';
import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import HotelService from '../services/HotelService';
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'

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

    const handleClick = () =>{
    //  if(img !==null){
    //     const imgRef =  ref(imageDb,`files/${v4()}`)
    //     uploadBytes(imgRef,img).then(value=>{
    //         console.log(value)
    //         getDownloadURL(value.ref).then(url=>{
    //             setImgUrl(data=>[...data,url])
    //         })
    //     })
    //  }
    }


  const functionAdd = ()=>{
    openPopUp();
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

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const newHotel = {
      hotelName,
      hotelDistrict,
      hotelImage
    };

    try{
      setLoading(true); 
      await HotelService.createHotel(newHotel);
      setLoading(false);
      openChange(false);
    }catch(error){
      setLoading(false);
      toast.error('Failed to create hotel : ', error.message); 
      console.log('Error:', error);
    }
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
    <div >
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
                <Button variant='contained' color='primary' sx={{margin: '5px'}} >Edit</Button>
                  <Button variant='contained' color='secondary' >Delete</Button>
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
        <span>Create A Hotel</span>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} margin={2}>
            <TextField value={hotelName} required onChange={e=>{hotelNameChange(e.target.value)}} variant='outlined' label='Hotel Name'></TextField>
            <TextField value={hotelDistrict} onChange={e=>{hotelDistrictChange(e.target.value)}} variant='outlined' label='Hotel District'></TextField>
            <TextField value={hotelImage} onChange={e=>{hotelImageChange(e.target.value)}} variant='outlined' label='Hotel Image'></TextField>
            <input type="file" onChange={(e)=>setImg(e.target.files[0])} /> 
                <button onClick={handleClick}>Upload</button>
                <br/>
                {/* {
                    imgUrl.map(dataVal=><div>
                        <img src={dataVal} height="200px" width="200px" />
                        <br/> 
                    </div>)
                } */}
            <Button type='submit' variant='contained' disabled={loading}>Save</Button>
          </Stack>
        </form> 
      </DialogContent>
     </Dialog>
    </div>  
   </>
  )
}
