import React, { useState } from "react";
import { Typography, Box, Button, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { DayTripServices } from "../services/DayTripServices";
import { DataGrid } from "@mui/x-data-grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export const DayTrips = () => {
  const [roundTrips, setRoundTrips] = useState([]); //array of objects? || object?
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "packageCategoryName", headerName: "Category Name", width: 150 },
    { field: "packageName", headerName: "Package Name", width: 150 },
    { field: "packageDays", headerName: "Days", width: 80, type: "number" },
    { field: "price", headerName: "Price", width: 120, type: "number" },
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
          <Link to={`/day-trips/edit-day-trips/${params.row._id}`}>
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
                var resp = await DayTripServices.deleteDayTrip(params.row._id);
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

  console.log("Day trips:", roundTrips);

  useState(async () => {
    try {
      setLoading(true);
      var resp = await DayTripServices.getDayTrips();
      setRoundTrips(resp);
    } catch (e) {
      toast.error("Error fetching day trips: ", e.message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  // <Route

  return (
    <Box
      display="flex"
      sx={{
        flexFlow: "column nowrap",
        justifyContent: "space-between",
        minHeight: "85vh",
      }}
      gap={2}
    >
      <Box sx={{ display: "flex" }}>
        <Breadcrumbs aria-label="bread crumps" separator={<NavigateNextIcon />}>
          <Link to="/">Dashboard</Link>
          <Typography color="text.primary">Day Trips</Typography>
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
        <Link to={"/day-trips/add-day-trips"}>
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
  );
};
