import { DeleteForeverRounded, Filter, Key } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Stack,
  TextField,
  Typography,
  Container,
  CardMedia,
  Input,
  IconButton,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export const Dates = ({ onSaveDetails, prevDetails }) => {
  const [basicDetails, setBasicDetails] = useState(prevDetails);
  const [fd, setFd] = useState(false);

  const saveDetails = (e) => {
    // e.preventDefault();
    // setBasicDetails([gs, gd, gt, ps, pd, pt]);
    // setFd(true);
    // toast.success("Price details saved..!");
  };

  useEffect(() => {
    if (fd) {
      console.log(basicDetails);
      onSaveDetails(basicDetails);
    }
  }, [basicDetails]);

  /////////////////////////////////////////////////////////////////////

  const [day, setDay] = useState(basicDetails[0]);
  const [dayDetails, setDayDetails] = useState(basicDetails[1]);
  const [bookableUntil, setBookableUntil] = useState(basicDetails[2]);

  return (
    <Box
      sx={{
        minWidth: "350px",
        width: "80%",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          border: "1px solid #e0e0e0",
          borderRadius: "6px",
          minWidth: "350px",
          width: "100%",
        }}
      >
        <Typography p={1} variant="subtitle2">
          Date Details
        </Typography>
        <Divider
          sx={{
            width: "100%",
            bgcolor: "primary",
          }}
        />

        <form onSubmit={saveDetails} className="w-full">
          <Box
            p={2}
            display="flex"
            sx={{
              flexFlow: "column",
              justifyContent: "space-evenly",
            }}
            width="100%"
            gap={2}
          >
            {/* Required details */}
            <Box
              p={2}
              display="flex"
              sx={{
                flexFlow: "row wrap",
                justifyContent: "space-evenly",
                border: "1px solid #a0a0a0",
                borderRadius: "6px",
              }}
              width="100%"
              gap={2}
            >
              <Box className="w-1/3 flex flex-col items-start" gap={0.5}>
                <Typography variant="body2">Starts&nbsp;every: </Typography>
                <TextField
                  select
                  type="number"
                  fullWidth
                  value={day}
                  onChange={(e) => {
                    console.log("Day selected:", e.target.value);
                    setDay(e.target.value);
                  }}
                  placeholder="- select -"
                  label="--select Day--"
                  size="small"
                >
                  {dayList.map((day) => (
                    <MenuItem key={day.id} value={day.id}>
                      {day.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box className="w-1/3 flex flex-col items-start" gap={0.5}>
                <Typography variant="body2">Bookable Until: </Typography>
                <TextField
                  type="date"
                  fullWidth
                  value={bookableUntil}
                  onChange={(e) => setBookableUntil(e.target.value)}
                  placeholder="--Select a date--"
                  size="small"
                />
              </Box>
            </Box>

            <Typography p={1} variant="subtitle2" className="w-full">
              -- Particular Date's Details --
            </Typography>

            {dayDetails.map((item, index) => {
              return (
                <Box
                  p={2}
                  display="flex"
                  sx={{
                    flexFlow: "row wrap",
                    justifyContent: "space-evenly",
                    border: "1px solid #e0e0e0",
                    borderRadius: "6px",
                  }}
                  width="100%"
                  gap={2}
                >
                  <Box className="w-1/4 flex flex-col items-start" gap={0.5}>
                    <Typography variant="body2">Date</Typography>
                    <TextField
                      type="date"
                      fullWidth
                      value={item[0]}
                      onChange={(e) => {
                        // setDayDetails(e.target.value);
                      }}
                      size="small"
                    />
                  </Box>

                  <Box className="w-1/4 flex flex-col items-start" gap={0.5}>
                    <Typography variant="body2">Availability</Typography>
                    <TextField
                      select
                      fullWidth
                      value={item[1]}
                      onChange={(e) => {
                        // setDayDetails(e.target.value);
                      }}
                      placeholder="--Select--"
                      label="--Select--"
                      size="small"
                    >
                      <MenuItem key={true} value={true}>
                        Available
                      </MenuItem>
                      <MenuItem key={false} value={false}>
                        Unavailable
                      </MenuItem>
                    </TextField>
                  </Box>

                  <Box className="w-1/4 flex flex-col items-start" gap={0.5}>
                    <Typography variant="body2">Filled Seats</Typography>
                    <TextField
                      type="number"
                      fullWidth
                      value={item[2]}
                      //   onChange={(e) => setBookableUntil(e.target.value)}
                      placeholder="5"
                      size="small"
                    />
                  </Box>

                  <Button
                    variant="outlined"
                    color="error"
                    onClick={(e) => {
                      var prev = dayDetails;
                      prev = prev.filter((previous, ind) => ind != index);
                      setDayDetails(prev);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </Box>
              );
            })}
            <Box
              p={2}
              display="flex"
              sx={{
                flexFlow: "row wrap",
                justifyContent: "space-evenly",
              }}
              width="100%"
              gap={2}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() =>
                  // setHotels((prevHotels) => [...prevHotels, ""])
                  setDayDetails((prev) => [...prev, ""])
                }
              >
                Add
              </Button>
            </Box>

            {/* Save button */}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              aria-label="save package details"
              disabled={!day}
            >
              Save
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

const dayList = [
  { id: 1, name: "Sunday" },
  { id: 2, name: "Monday" },
  { id: 3, name: "Tuesday" },
  { id: 4, name: "Wednesday" },
  { id: 5, name: "Thursday" },
  { id: 6, name: "Friday" },
  { id: 7, name: "Saturday" },
];
