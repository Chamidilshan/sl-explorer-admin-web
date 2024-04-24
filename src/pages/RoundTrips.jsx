import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Breadcrumbs,
  Hidden,
  ButtonGroup,
} from "@mui/material";
import { Link, Navigate, Route, json, useNavigate } from "react-router-dom";
import { RoundTripServices } from "../services/RoundTripService";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { set } from "firebase/database";

export const RoundTrips = () => {
  const [roundTrips, setRoundTrips] = useState([]); //array of objects? || object?
  const [loading, setLoading] = useState(false);

  useState(async () => {
    try {
      setLoading(true);
      var resp = await RoundTripServices.getRoundtrips();
      setRoundTrips(resp);
    } catch (e) {
      toast.error("Error fetching round trips: ", e.message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const columns = [
    {
      field: "packageCoverImage",
      headerName: "Cover Image",
      width: 120,
      renderCell: (params) => (
        <img width="110" height="50" src={params.value} />
      ),
    },
    { field: "packageName", headerName: "Package Name", width: 200 },
    { field: "packageTitle", headerName: "Title", width: 150 },
    {
      field: "packageSubTitle",
      headerName: "Subtitle",
      width: 150,
    },
    {
      field: "packageTotalSeats",
      headerName: "Max Seats",
      width: 60,
      type: "number",
    },
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
    {
      field: "actions",
      headerName: "Actions",
      width: 240,
      renderCell: (params) => (
        <Box className="flex flex-row justify-between align-center gap-2">
          {/* <Box className="flex flex-column justify-between align-center gap-2"> */}
          <ButtonGroup>
            <Button
              size="small"
              variant="outlined"
              onClick={async () => {
                var resp = await RoundTripServices.moveUpATrip(params.row);
                if (resp) {
                  resp = await RoundTripServices.getRoundtrips();
                  setRoundTrips(resp);
                }
              }}
            >
              <ArrowDropUpIcon sx={{ fontSize: "large" }} />
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={async () => {
                var resp = await RoundTripServices.moveDownATrip(params.row);
                if (resp) {
                  resp = await RoundTripServices.getRoundtrips();
                  setRoundTrips(resp);
                }
              }}
            >
              <ArrowDropDownIcon sx={{ fontSize: "large" }} />
            </Button>
          </ButtonGroup>
          {/* </Box> */}
          <Link to={`/round-trips/edit-round-trips/${params.row._id}`}>
            <Button variant="contained" color="primary">
              <EditNoteIcon fontSize="small" />
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              if (confirm("Are you sure you want to delete this round trip?")) {
                try {
                  var resp = await RoundTripServices.deleteRoundTrip(
                    params.row._id
                  );
                  if (resp) {
                    setRoundTrips(
                      roundTrips.filter(
                        (item, i) => item._id !== params.row._id
                      )
                    );
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </Button>
        </Box>
      ),
    },
  ];

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
          <Link underline="hover" color="inherit" to="/">
            Dashboard
          </Link>
          <Typography color={"textPrimary"}>Round Trips</Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
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
          <>
            <Hidden smDown>
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
            </Hidden>
            <Hidden smUp>
              <DataGrid
                getRowId={(row) => row._id}
                rows={roundTrips}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 50 },
                  },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                // checkboxSelection
              />
            </Hidden>
          </>
        )}
        {/* <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "red", fontWeight: "600" }}>
                    <TableCell>Name</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Subtitle</TableCell>
                    <TableCell>Total Seats</TableCell>
                    <TableCell>Itineraries</TableCell>
                    <TableCell>Hotels</TableCell>
                    <TableCell>Prices</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roundTrips.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{item.packageName}</TableCell>
                        <TableCell>{item.packageTitle}</TableCell>
                        <TableCell>{item.packageSubTitle}</TableCell>
                        <TableCell>{item.packageTotalSeats}</TableCell>
                        <TableCell>
                          <Button variant="text">See Itineraries</Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="text">See Hotels</Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="text">See Prices</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer> */}
      </Box>

      <Box className="w-full flex justify-end">
        <Link to={"/round-trips/add-round-trips"}>
          <Button
            width={10}
            variant="contained"
            color="primary"
            // startIcon={<add}
          >
            <Typography variant="subtitle2">Add New</Typography>
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
