import * as React from "react";
import { useState } from "react";
import {
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  TextField,
  Button,
  Box,
  Modal,
  Typography,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HotelService from "../../../services/HotelService";

// React.useEffect(async () => {
//   try {
//     const data = await HotelService.getHotels();
//     console.log("Hotels data:", data.data);
//     setHotelsList(data.data);
//   } catch (error) {
//     console.log("Error fetching hotels:", error);
//   }
// }, []);

export function HotelModal({
  onClose,
  onSave,
  onSaveExisting,
  data,
  isEditing,
}) {
  const [dayNumber, setDayNumber] = useState(isEditing ? data[0] : "");
  const [dayName, setDayName] = useState(isEditing ? data[1] : "");
  const [location1, setLocation1] = useState(isEditing ? data[2] : "");
  const [location2, setLocation2] = useState(isEditing ? data[3] : "");
  const [location3, setLocation3] = useState(isEditing ? data[4] : "");

  const [hotelsList, setHotelsList] = useState([]);

  const firstRef = React.useRef(null);

  const [final, setFinal] = useState([]);

  const [loading, setLoading] = useState(false);

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

  React.useEffect(() => {
    if (final.indexOf("submitted") != -1) {
      !isEditing ? onSave(final) : onSaveExisting(final);
      onClose();
    }
  }, [final]);

  const send = () => {
    var variab = [dayNumber, dayName, location1, location2, location3];
    console.log(variab);
    console.log(final);
  };

  return (
    <>
      <Box
        pt={1}
        pl={4}
        pr={4}
        pb={1}
        className="flex flex-row justify-between align-center"
      >
        <Typography pt={1} variant="subtitle2" sx={{ fontWeight: "550" }}>
          Add Hotel
        </Typography>
        <Button size="small" variant="outlined" onClick={onClose} color="error">
          <CloseIcon />
        </Button>
      </Box>

      <Divider
        sx={{
          width: "100%",
          bgcolor: "primary",
        }}
      />
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="loading-animation" />
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            var variab = [
              dayNumber,
              dayName,
              location1,
              location2,
              location3,
              "submitted",
            ];
            setFinal(variab);
          }}
        >
          <Box
            p={2}
            display="flex"
            sx={{
              flexFlow: "row wrap",
              alignItems: "flex-start",
              justifyContent: "space-between",
              p: 4,
              width: "100%",
            }}
            gap={2}
          >
            <Box className=" flex flex-col" sx={{ width: "45%" }} gap={1}>
              <Typography variant="body2">Hotel</Typography>
              <TextField
                required
                select
                fullWidth
                ref={firstRef}
                value={dayNumber}
                onChange={(e) => {
                  console.log("Hotel selected:", e.target.value);
                  setDayNumber(e.target.value);
                }}
                placeholder="- select -"
                label="--select Hotel--"
                size="small"
              >
                {hotelsList.map((hotel) => (
                  <MenuItem key={hotel._id} value={hotel._id}>
                    {hotel.hotelName}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box className=" flex flex-col" sx={{ width: "45%" }} gap={1}>
              <Typography variant="body2">Location</Typography>
              <TextField
                required
                fullWidth
                value={dayName}
                onChange={(e) => setDayName(e.target.value)}
                placeholder="Pinnawela"
                size="small"
              />
            </Box>

            <Box className="w-full flex flex-col" gap={1}>
              <Typography variant="body2">Landmark Description</Typography>
              <TextField
                multiline
                rows={2}
                fullWidth
                value={location1}
                onChange={(e) => {
                  setLocation1(e.target.value);
                }}
                placeholder="Located right on the Maha Oya River, .."
                size="small"
              />
            </Box>

            <Box className="w-full flex flex-col" gap={1}>
              <Typography variant="body2">Hotel Description</Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={location2}
                onChange={(e) => {
                  setLocation2(e.target.value);
                }}
                placeholder="Restaurant, bar/lounge, and rooftop terrace, ..."
                size="small"
              />
            </Box>

            <Box className="w-full flex flex-col" gap={1}>
              <Typography variant="body2">Rooms Description</Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={location3}
                onChange={(e) => {
                  setLocation3(e.target.value);
                }}
                placeholder="20 spacious rooms with balconies or patios ..."
                size="small"
              />
            </Box>

            <Button
              variant="contained"
              fullWidth
              type="submit"
              aria-label="save package details"
            >
              Add
            </Button>
          </Box>
        </form>
      )}
    </>
  );
}
