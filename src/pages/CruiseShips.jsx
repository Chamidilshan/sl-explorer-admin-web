import React, { useState } from "react";
import { Typography, Box, Button, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cruiseShipService } from "../services/cruiseShipService";
import { DataGrid } from "@mui/x-data-grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export const CruiseShips = () => {
<<<<<<< Updated upstream
  
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
=======
  const [roundTrips, setRoundTrips] = useState([]); //array of objects? || object?
  const [loading, setLoading] = useState(false);
>>>>>>> Stashed changes

  const columns = [
    { field: "packageCategoryName", headerName: "Category Name", width: 150 },
    { field: "packageName", headerName: "Package Name", width: 150 },
    { field: "packageDays", headerName: "Days", width: 80, type: "number" },
    { field: "prices", headerName: "Price", width: 120, type: "number" },
    // {
    //   field: "packageShortDescription",
    //   headerName: "Short Description",
    //   width: 250,
    // },
    // {
    //   field: "packageCoverDescription",
    //   headerName: "Cover Description",
    //   width: 250,
    // },
    { field: "packageTitle", headerName: "Package Title", width: 150 },
    { field: "packageSubTitle", headerName: "Package Subtitle", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => (
        <Box className="flex flex-row justify-between align-center gap-2">
          <Button size="small" variant="outlined">
            <ArrowDropUpIcon sx={{ fontSize: "large" }} />
          </Button>
          <Button size="small" variant="outlined">
            <ArrowDropDownIcon sx={{ fontSize: "large" }} />
          </Button>
          <Link to={`/cruise-ships/edit-cruise-ships/${params.row._id}`}>
            <Button
              startIcon={<EditNoteIcon />}
              variant="contained"
              color="primary"
            >
              <Typography variant="subtitle2">Edit</Typography>
            </Button>
          </Link>
          <Button
            startIcon={<DeleteOutlineIcon />}
            variant="contained"
            color="error"
            onClick={async () => {
              if (confirm("Are you sure you want to delete this day trip?")) {
                console.log(params.row._id);
                var resp = await cruiseShipService.deleteCruiseShip(params.row._id);
                if (resp) {
                  setRoundTrips(
                    roundTrips.filter((item, i) => item._id !== params.row._id)
                  );
                }
                // need to call the delete function here
              }
              // setItinerary((prevItinerary) => {
              //   const newItinerary = prevItinerary.filter(
              //     (item, i) => i !== index
              //   );
              //   return newItinerary;
              // });
            }}
          >
            <Typography variant="subtitle2">Delete</Typography>
          </Button>
        </Box>
      ),
    },
  ];
  
  console.log("Cruise Ships 1 :", roundTrips);
 

  useState(async () => {
    try {
      setLoading(true);
      var resp = await cruiseShipService.getCruiseShip();
      setRoundTrips(resp);
    } catch (e) {
      toast.error("Error fetching cruise ships: ", e.message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

<<<<<<< Updated upstream
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
=======
  // <Route

  return (
    <Box
      display="flex"
      sx={{
        flexFlow: "column nowrap",
        justifyContent: "space-between",
        minHeight: "80vh",
      }}
      gap={2}
    >
      <Box sx={{ display: "flex" }}>
        <Breadcrumbs aria-label="bread crumps" separator={<NavigateNextIcon />}>
          <Link to="/">Dashboard</Link>
          <Typography color="text.primary">Cruise Ships</Typography>
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          mb: 4,
          width: "100%",
          height: "100%",
          display: "flex",
          flexFlow: "row wrap",
        }}
        // bgcolor="secondary.main"
      >
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="loading-animation" />
          </div>
        ) : (
          <DataGrid
            getRowId={(row) => row._id}
            rows={roundTrips}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            // checkboxSelection
          />
        )}
        {/* <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "red", fontWeight: "600" }}>
                    <TableCell>Category Name</TableCell>
                    <TableCell>Package Name</TableCell>
                    <TableCell>Days</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Short Description</TableCell>
                    <TableCell>Cover Description</TableCell>
                    <TableCell>Package Title</TableCell>
                    <TableCell>Package Subtitle</TableCell>
                    <TableCell>Available Dates</TableCell>
                    <TableCell>Hotels</TableCell>
                    <TableCell>Services</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roundTrips.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{item.packageCategoryName}</TableCell>
                        <TableCell>{item.packageName}</TableCell>
                        <TableCell>{item.packageDays}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell width={20}>
                          {item.packageShortDescription}
                        </TableCell>
                        <TableCell>{item.packageCoverDescription}</TableCell>
                        <TableCell>{item.packageTitle}</TableCell>
                        <TableCell>{item.packageSubTitle}</TableCell>
                        <TableCell>
                          <Button variant="text">See Dates</Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="text">See Hotels</Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="text">See Services</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer> */}
      </Box>

      <Box className="w-full flex justify-end">
        <Link to={"/cruise-ships/add-cruise-ships"}>
          <Button
            width={10}
            variant="contained"
            color="primary"
            // onClick={() => {
            //   setIsAddingNew(true);
            // }}
            // startIcon={<add}
          >
            <Typography variant="subtitle2">Add New</Typography>
          </Button>
        </Link>
      </Box>
    </Box>
>>>>>>> Stashed changes
  );
};
