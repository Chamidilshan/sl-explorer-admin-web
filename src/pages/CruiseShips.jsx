import React, { useEffect, useState } from 'react'
import PermanentDrawerLeft from '../components/drawer'
import Box from '@mui/material/Box';
import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, DialogActions } from "@mui/material";
import cruiseShipService from '../services/cruiseShipService';
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { imageDb } from '../../config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

export const CruiseShips = () => {
  
    const columns = [
      // {id: '_id', name: 'ID'},
      {id: 'cruiseShipDate', name: 'Date'},
      {id: 'cruiseShipName', name: 'Name'},
      {id: 'cruiseShipPackage', name: 'Package'},
      {id: 'cruiseShipImage', name: 'Image'},
      {id: 'action', name: 'Actions'},
    ]
  
    const [_id, idChange] = useState(0);
    const [cruiseShipDate, cruiseShipDateChange] = useState('');
    const [cruiseShipName, cruiseShipNameChange] = useState('');
    const [cruiseShipPackage, cruiseShipPackageChange] = useState('');
    const [cruiseShipImage, cruiseShipImageChange] = useState('');
    const [open, openChange] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
  
    const [img,setImg] =useState('')
    const [imgUrl,setImgUrl] =useState([])
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [cruiseShipIdToDelete, setcruiseShipIdToDelete] = useState(null);
  
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState('Add cruiseShip');
  
    const handleDelete = (cruiseShipId) => { 
      setHotelIdToDelete(cruiseShipId);
      setDeleteConfirmationOpen(true);
    };
  
    const cancelDelete = () => {
      setHotelIdToDelete(null);
      setDeleteConfirmationOpen(false);
    };
  
    const confirmDelete = async () => {
      try {
        await cruiseShipService.deletecruiseShip(cruiseShipIdToDelete);
        setHotels((prevcruiseShips) => prevcruiseShips.filter((cruiseShip) => cruiseShip._id !== cruiseShipIdToDelete));
      } catch (error) {
        console.error('Error deleting cruiseShip:', error);
        toast.error('Failed to delete cruiseShip: ', error.message);
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
        const imgRef = ref(imageDb, `cruiseShipImages/${v4()}`);
        try {
          const snapshot = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(snapshot.ref);
          console.log('Uploaded image URL:', url);
          cruiseShipImageChange(url);
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
      setTitle('Add cruiseShip');
      openPopUp();
    }

    const handleEdit = async (id)=>{
      setIsEdit(true);
      setTitle('Update cruiseShip');
      openPopUp();
  
      try{
        const cruiseShip = await cruiseShipService.getcruiseShip(id);
        if(cruiseShip){
          cruiseShipNameChange(cruiseShip.body.cruiseShipName);
          cruiseShipDateChange(cruiseShip.body.cruiseShipDate);
          cruiseShipPackageChange(cruiseShip.body.cruiseShipPackage);
          setImg(null);
          idChange( cruiseShip.body._id);
          setImgUrl( cruiseShip.body. cruiseShipImage); 
        }{
          // toast.error(' cruiseShip not found');
          console.error(' cruiseShip not found');
        }
      }catch(error){
        console.error('Error fetching  cruiseShip details:', error);
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
        const newcruiseShip = {
          cruiseShipName,
          cruiseShipPackage,
          cruiseShipDate,
          cruiseShipImage: imageUrl, 
        };
        if (isEdit) {
          // Call the update function instead of create function
          await cruiseShipService.updatecruiseShip(_id, newcruiseShip); 
          fetchcruiseShips(); 
        } else {
          // Call the create function
          await cruiseShipService.createcruiseShip(newcruiseShip); 
          fetchcruiseShips();
        }
        setLoading(false);
        openChange(false);
      } catch (error) {
        setLoading(false);
        toast.error('Failed to save cruiseShip: ', error.message);
        console.error('Error:', error);
      }
    }; 
    
    const [cruiseShips, setcruiseShips] = useState([]);
  
    useEffect(() => { 
      fetchcruiseShips();
    }, []);
   
    async function fetchcruiseShips() {
      try {
        const data = await cruiseShipService.getcruiseShips();
        console.log('cruiseShips data:', data.data);
        setcruiseShips(data.data);
      } catch (error) {
        console.log('Error fetching cruiseShips:', error);
      }
    }




  

  return (
    <>
      <div>
        <Box className='w-full' sx={{ display: 'flex' }}>
          <h1 className='text-cyan-900'>CruiseShips</h1>
        </Box>
        <Paper className='w-full'>
          <div className='flex justify-end w-full'>
            <Button onClick={functionAdd} variant="contained" color="primary">Add New Cruise</Button>
          </div>
          <div style={{margin: '1%'}}> 
      <TableContainer className='w-full'>
        <Table style={{border: '1px solid #D4D4D4', color: '#262626'}} className='min-w-max'>
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
          {cruiseShips.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map((cruiseShip) => ( 
              <TableRow key={cruiseShip._id} >
                {/* <TableCell>{cruiseShip._id}</TableCell> */}

                <TableCell style={{fontSize: '16px'}}>{cruiseShip.cruiseShipName}</TableCell>
                <TableCell style={{fontSize: '16px'}}>{cruiseShip.cruiseShipDate}</TableCell>
                <TableCell style={{fontSize: '16px'}}>{cruiseShip.cruiseShipPackage}</TableCell>
                <TableCell style={{fontSize: '16px'}}>
                  <img src={cruiseShip.cruiseShipImage} alt={cruiseShip.cruiseShiplName} style={{ maxWidth: '100px' }} />
                </TableCell>
                <TableCell>
                <Button variant='contained' onClick={e=>{handleEdit(cruiseShip._id)}} color='primary' sx={{margin: '5px'}} >Edit</Button>
                  <Button variant='contained' onClick={e=>{handleDelete(cruiseShip._id)}} style={{backgroundColor: '#D97706'}} >Delete</Button>
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
      count={cruiseShips.length} 
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
            <TextField value={cruiseShipName} required onChange={e=>{cruiseShipNameChange(e.target.value)}} variant='outlined' label='cruiseShip Name'></TextField>
            <TextField value={cruiseShipDate} required onChange={e=>{cruiseShipDateChange(e.target.value)}} variant='outlined' label='cruiseShip Date'></TextField>
            <TextField value={cruiseShipPackage} onChange={e=>{cruiseShipPackageChange(e.target.value)}} variant='outlined' label='cruiseShip Package'></TextField>
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
          Are you sure you want to delete this cruiseShip?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color='secondary'>Delete</Button>
        </DialogActions>
      </Dialog>






      </div>
    </>
  );
};
