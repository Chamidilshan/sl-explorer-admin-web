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
      <Box sx={{ display: "flex" }}>
        <h1 className="text-cyan-900">Cruise Ships</h1>
      </Box>
    </>
  );
};
