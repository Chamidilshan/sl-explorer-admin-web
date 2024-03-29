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

export function ItineraryModal({
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
  const [location4, setLocation4] = useState(isEditing ? data[5] : "");
  const [description, setDescription] = useState(isEditing ? data[6] : "");
  const [option, setOption] = useState(isEditing ? data[7] : false);
  const [optional, setOptional] = useState(isEditing ? data[8] : "");
  const [optionPrice, setOptionPrice] = useState(isEditing ? data[9] : "");

  const firstRef = React.useRef(null);

  const [final, setFinal] = useState([]);

  React.useEffect(() => {
    if (final.indexOf("submitted") != -1) {
      !isEditing ? onSave(final) : onSaveExisting(final);
      onClose();
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
          Add Itinerary
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
            <Typography variant="body2">Day Number</Typography>
            <TextField
              required
              type="number"
              fullWidth
              ref={firstRef}
              value={dayNumber}
              onChange={(e) => setDayNumber(e.target.value)}
              placeholder="3"
              size="small"
            />
          </Box>

          <Box className=" flex flex-col" sx={{ width: "45%" }} gap={1}>
            <Typography variant="body2">Day Name & Title</Typography>
            <TextField
              required
              fullWidth
              value={dayName}
              onChange={(e) => setDayName(e.target.value)}
              placeholder="Thursday - Arrival"
              size="small"
            />
          </Box>

          <Box className=" flex flex-col" sx={{ width: "45%" }} gap={1}>
            <Typography variant="body2">Location 1</Typography>
            <TextField
              required
              fullWidth
              value={location1}
              onChange={(e) => {
                setLocation1(e.target.value);
              }}
              placeholder="Hambantota"
              size="small"
            />
          </Box>

          <Box className=" flex flex-col" sx={{ width: "45%" }} gap={1}>
            <Typography variant="body2">Location 2</Typography>
            <TextField
              fullWidth
              value={location2}
              onChange={(e) => {
                setLocation2(e.target.value);
              }}
              placeholder="Tangalle"
              size="small"
            />
          </Box>

          <Box className=" flex flex-col" sx={{ width: "45%" }} gap={1}>
            <Typography variant="body2">Location 3</Typography>
            <TextField
              fullWidth
              value={location3}
              onChange={(e) => {
                setLocation3(e.target.value);
              }}
              placeholder="Kirinda"
              size="small"
            />
          </Box>

          <Box className=" flex flex-col" sx={{ width: "45%" }} gap={1}>
            <Typography variant="body2">Location 4</Typography>
            <TextField
              fullWidth
              value={location4}
              onChange={(e) => {
                setLocation4(e.target.value);
              }}
              placeholder="Matara"
              size="small"
            />
          </Box>

          <Box className="w-full flex flex-col" gap={1}>
            <Typography variant="body2">Day Description</Typography>

            <TextField
              required
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              type="text"
              size="small"
              placeholder="Trip begins from ..."
            />
          </Box>

          <Box className="w-full">
            <FormControlLabel
              label="Option"
              control={
                <Checkbox
                  checked={option}
                  onChange={(e) => {
                    setOption(e.target.checked);
                  }}
                />
              }
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "45%",
              minWidth: "200px",
            }}
            gap={1}
          >
            <Typography variant="body2">Option Description</Typography>

            <TextField
              disabled={!option}
              value={optional}
              onChange={(e) => setOptional(e.target.value)}
              type="text"
              size="small"
              fullWidth
              placeholder="Beach bath in hambantota in the end"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "45%",
              minWidth: "200px",
            }}
            gap={1}
          >
            <Typography variant="body2">Option Price</Typography>

            <TextField
              disabled={!option}
              value={optionPrice}
              onChange={(e) => setOptionPrice(e.target.value)}
              type="number"
              size="small"
              fullWidth
              placeholder="49"
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
