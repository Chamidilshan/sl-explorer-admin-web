import {
  Box,
  ButtonBase,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Modal,
  backdropClasses,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { ItineraryModal } from "./ItineraryModal";
import { HotelModal } from "./HotelModal";

export const Hotel = () => {
  const [itinerary, setItinerary] = useState([[""]]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (e, reason) => {
    if (reason == "backdropClick") {
      //   return;
      setOpen(false);
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        backd
      >
        <HotelModal />
      </Modal>
      <Box
        sx={{
          height: "80%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          width="100%"
          sx={{
            display: "flex",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: "700" }}>
            Hotels
          </Typography>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Day No.</TableCell>
                <TableCell>Hotel Name</TableCell>
                <TableCell>Hotel Location</TableCell>
                <TableCell>Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itinerary.map((item) => {
                return (
                  <TableRow>
                    <TableCell>{item[0]}</TableCell>
                    <TableCell>{item[1]}</TableCell>
                    <TableCell>{item[2]}</TableCell>
                    <TableCell>{item[3]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2} sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={handleOpen}
          >
            <Typography variant="subtitle2">Add New</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
