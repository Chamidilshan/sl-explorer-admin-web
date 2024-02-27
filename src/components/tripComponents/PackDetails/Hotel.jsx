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
import { HotelModal } from "./HotelModal";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SaveIcon from "@mui/icons-material/Save";
import HotelService from "../../../services/HotelService";

export const Hotel = ({ onSaveItinerary, prevItinerary }) => {
  const [itinerary, setItinerary] = useState(prevItinerary);
  const [dataToEdit, setDataToEdit] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);

  const [hotelsList, setHotelsList] = useState([]);

  const [loading, setLoading] = useState(true);
  useState(async () => {
    try {
      setLoading(true);
      const data = await await HotelService.getHotels();
      setHotelsList(data.data);
      setLoading(false);
      console.log("Hotels data:", data.data);
    } catch (error) {
      console.log("Error fetching hotels:", error);
    }
  }, []);

  const handleSave = (data) => {
    setItinerary((prevItinerary) => {
      return [...prevItinerary, data];
    });
  };

  //this is for 1 itinerary from modal
  const handleSaveExisting = (data) => {
    setDataToEdit("");
    setIsEditing(false);
    setOpen(false);
    setItinerary((itinerary) => {
      var newOne = itinerary;
      newOne[editingIndex] = data;
      return newOne;
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = (e, reason) => {
    if (reason == "backdropClick") {
      return;
    }
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    maxHeight: "95vh",
    bgcolor: "background.paper",
    borderRadius: "10px",
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="loading-animation" />
        </div>
      ) : (
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
          <Box
            sx={{
              height: "60vh",
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
                    <TableCell>Hotel</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Change</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itinerary.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {
                            hotelsList[
                              hotelsList.findIndex(
                                (hotel) => hotel._id == item[0]
                              )
                            ].hotelName
                          }
                        </TableCell>
                        <TableCell>{item[1]}</TableCell>
                        <TableCell>
                          <Box className="flex flex-row justify-center align-center gap-2">
                            <Button
                              startIcon={<EditNoteIcon />}
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                console.log(itinerary[index]);
                                setDataToEdit(itinerary[index]);
                                setIsEditing(true);
                                setEditingIndex(index);
                                console.log(dataToEdit);
                                setOpen(true);
                              }}
                            >
                              <Typography variant="subtitle2">Edit</Typography>
                            </Button>
                            <Button
                              startIcon={<DeleteOutlineIcon />}
                              variant="contained"
                              color="error"
                              onClick={() => {
                                setItinerary((prevItinerary) => {
                                  const newItinerary = prevItinerary.filter(
                                    (item, i) => i !== index
                                  );
                                  return newItinerary;
                                });
                              }}
                            >
                              <Typography variant="subtitle2">
                                Delete
                              </Typography>
                            </Button>
                          </Box>
                        </TableCell>
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

            <Box p={2} className="flex flex-row justify-center">
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                disabled={itinerary.length === 0}
                onClick={() => {
                  alert("Hotels Saved!");
                  console.log(itinerary);
                  onSaveItinerary(itinerary);
                }}
              >
                <Typography variant="subtitle2">Save Hotels</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // ref={modalRef}
      >
        <Box sx={style}>
          <HotelModal
            onSave={handleSave}
            onClose={handleClose}
            data={dataToEdit}
            isEditing={isEditing}
            onSaveExisting={handleSaveExisting}
          />
        </Box>
      </Modal>
    </>
  );
};
