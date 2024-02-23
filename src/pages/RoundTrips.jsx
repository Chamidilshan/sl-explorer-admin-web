import React, { useState } from "react";
import PermanentDrawerLeft from "../components/drawer";
import {
  Container,
  Typography,
  Toolbar,
  Box,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import PermanentDrawerTop from "../components/TopDrawer";
import { PackDetails } from "../components/tripComponents/PackDetails/PackDetailsPage";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Itinerary } from "../components/tripComponents/PackDetails/Itinerary";
import { Hotel } from "../components/tripComponents/PackDetails/Hotel";
import { Prices } from "../components/tripComponents/PackDetails/Prices";
import { Key } from "@mui/icons-material";
import { Link, Navigate, Route, json, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { imageDb } from "../../config";
import { v4 } from "uuid";
import { RoundTripServices } from "../services/RoundTripService";
import { AERoundTrips } from "../components/tripComponents/PackDetails/AddEditRoundtrips";

export const RoundTrips = () => {
  const [roundTrips, setRoundTrips] = useState([]); //array of objects? || object?
  const [loading, setLoading] = useState(false);

  useState(async () => {
    var resp = await RoundTripServices.getRoundtrips();
    setRoundTrips(resp);
  }, []);

  const navigate = useNavigate();

  // <Route

  return (
    <Box
      display="flex"
      sx={{
        flexFlow: "column nowrap",
        justifyContent: "space-between",
        minHeight: "90vh",
        width: "80%",
      }}
      gap={2}
    >
      {loading && (
        <Box>
          <Typography variant="h1">loading...</Typography>
        </Box>
      )}
      <Box sx={{ display: "flex" }}>
        <Typography>Dashboard / Round Trips</Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowX: "scroll",
          display: "flex",
          flexFlow: "row wrap",
        }}
        // bgcolor="secondary.main"
      >
        <TableContainer component={Paper} overflowX="scroll">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
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
        </TableContainer>
      </Box>

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Button
          width={10}
          variant="contained"
          color="primary"
          // startIcon={<add}
          onClick={() => {
            navigate("/round-trips/add-round-trips");
          }}
        >
          <Typography variant="subtitle2">Add New</Typography>
        </Button>
      </Box>
      <Box pt={25}></Box>
      <AERoundTrips />
    </Box>
  );
};
