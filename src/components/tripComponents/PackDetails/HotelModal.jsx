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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function HotelModal({ onClose, onSave }) {
  const [dayNumber, setDayNumber] = useState("");
  const [dayName, setDayName] = useState("");
  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");
  const [location3, setLocation3] = useState("");
  const [location4, setLocation4] = useState("");
  const [description, setDescription] = useState("");
  const [option, setOption] = useState(false);
  const [optional, setOptional] = useState("");
  const [optionPrice, setOptionPrice] = useState("");

  const firstRef = React.useRef(null);

  const [final, setFinal] = useState([]);

  React.useEffect(() => {
    if (final.indexOf("submitted") != -1) {
      if (
        confirm(
          "Confirm Itinerary\n" +
            final[0] +
            "\n" +
            final[1] +
            "\n" +
            final[2] +
            "\n" +
            final[3] +
            "\n" +
            final[4] +
            "\n" +
            final[5] +
            "\n" +
            final[6] +
            "\n" +
            final[7] +
            "\n" +
            final[8] +
            "\n" +
            final[9] +
            "\n"
        )
      ) {
        onSave(final);
        onClose();
      }
    }
  }, [final]);

  const send = () => {
    var variab = [
      dayNumber,
      dayName,
      location1,
      location2,
      location3,
      location4,
      description,
      option,
      optional,
      optionPrice,
    ];
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          var variab = [
            dayNumber,
            dayName,
            location1,
            location2,
            location3,
            location4,
            description,
            option,
            optional,
            optionPrice,
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
              fullWidth
              ref={firstRef}
              value={dayNumber}
              onChange={(e) => setDayNumber(e.target.value)}
              placeholder="- select -"
              helperText="Id must match an existing hotel"
              size="small"
            />
          </Box>

          <Box className=" flex flex-col" sx={{ width: "45%" }} gap={1}>
            <Typography variant="body2">Location</Typography>
            <TextField
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
              minRows={2}
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
              minRows={2}
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
    </>
  );
}
