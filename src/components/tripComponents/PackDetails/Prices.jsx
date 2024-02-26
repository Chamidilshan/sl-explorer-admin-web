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
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import CustomDropzone from "../../customDropZone";
import ImageIcon from "@mui/icons-material/Image";
import HideImageIcon from "@mui/icons-material/HideImage";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Form, useSubmit } from "react-router-dom";
import { toast } from "react-toastify";

export const Prices = ({ onSaveDetails, prevDetails }) => {
  const [basicDetails, setBasicDetails] = useState(prevDetails);
  const [fd, setFd] = useState(false);

  const saveDetails = (e) => {
    e.preventDefault();
    setBasicDetails([gs, gd, gt, ps, pd, pt]);
    setFd(true);
    toast.success("Price details saved..!");
  };

  useEffect(() => {
    if (fd) {
      console.log(basicDetails);
      onSaveDetails(basicDetails);
    }
  }, [basicDetails]);

  /////////////////////////////////////////////////////////////////////

  const [gs, setGs] = useState(basicDetails[0]);
  const [gd, setGd] = useState(basicDetails[1]);
  const [gt, setGt] = useState(basicDetails[2]);
  const [ps, setPs] = useState(basicDetails[3]);
  const [pd, setPd] = useState(basicDetails[4]);
  const [pt, setPt] = useState(basicDetails[5]);

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
          Price Details
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
              flexFlow: "row wrap",
              justifyContent: "space-evenly",
            }}
            width="100%"
            gap={2}
          >
            <Box className="w-auto flex flex-col items-start" gap={0.5}>
              <Typography variant="body2">Single Room For Groups</Typography>
              <TextField
                type="number"
                fullWidth
                value={gs}
                onChange={(e) => setGs(e.target.value)}
                placeholder="49"
                size="small"
              />
            </Box>

            <Box className="w-auto flex flex-col items-start" gap={0.5}>
              <Typography variant="body2">Double Room For Groups</Typography>
              <TextField
                type="number"
                fullWidth
                value={gd}
                onChange={(e) => setGd(e.target.value)}
                placeholder="49"
                size="small"
              />
            </Box>

            <Box className="w-auto flex flex-col items-start" gap={0.5}>
              <Typography variant="body2">Triple Room For Groups</Typography>
              <TextField
                type="number"
                fullWidth
                value={gt}
                onChange={(e) => setGt(e.target.value)}
                placeholder="49"
                size="small"
              />
            </Box>

            <Divider
              sx={{
                width: "100%",
                bgcolor: "primary",
              }}
            />

            <Box className="w-auto flex flex-col items-start" gap={0.5}>
              <Typography variant="body2">Single Room - Private</Typography>
              <TextField
                type="number"
                fullWidth
                value={ps}
                onChange={(e) => setPs(e.target.value)}
                placeholder="49"
                size="small"
              />
            </Box>

            <Box className="w-auto flex flex-col items-start" gap={0.5}>
              <Typography variant="body2">Double Room - Private</Typography>
              <TextField
                type="number"
                fullWidth
                value={pd}
                onChange={(e) => setPd(e.target.value)}
                placeholder="49"
                size="small"
              />
            </Box>

            <Box className="w-auto flex flex-col items-start" gap={0.5}>
              <Typography variant="body2">Triple Room - Private</Typography>
              <TextField
                type="number"
                fullWidth
                value={pt}
                onChange={(e) => setPt(e.target.value)}
                placeholder="49"
                size="small"
              />
            </Box>

            <Button
              variant="contained"
              type="submit"
              fullWidth
              aria-label="save package details"
              disabled={!gs}
            >
              Save
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
