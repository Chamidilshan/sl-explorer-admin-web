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
} from "@mui/material";
import PermanentDrawerTop from "../components/TopDrawer";
import { PackDetails } from "../components/TripComponents/PackDetails/PackDetails";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Itinerary } from "../components/tripComponents/PackDetails/Itinerary";
import { Hotel } from "../components/tripComponents/PackDetails/Hotel";

export const RoundTrips = () => {
  const totalPages = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [packName, setPackName] = useState("");
  const [packSubtitle, setPackSubtitle] = useState("");
  const [packCoverDescription, setPackCoverDescription] = useState("");
  const [packShortDescription, setPackShortDescription] = useState("");

  console.log("currentPage is: ", currentPage);

  const toggleButtonHandler = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box
      display="flex"
      sx={{
        flexFlow: "column nowrap",
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
      }}
      gap={2}
    >
      <Box sx={{ display: "flex" }}>
        <Typography>Dashboard / Round Trips</Typography>
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
        <PackDetails />
        {/* <Itinerary />
        <Hotel /> */}
      </Box>

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Button
          disabled={currentPage == 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <KeyboardDoubleArrowLeftIcon />
        </Button>
        <ToggleButtonGroup
          size="small"
          value={currentPage}
          onChange={toggleButtonHandler}
          color="primary"
          exclusive
        >
          <ToggleButton value={1} aria-label="page 1">
            <Typography variant="body2">&nbsp; 1 &nbsp;</Typography>
          </ToggleButton>
          <ToggleButton value={2} aria-label="page 2">
            <Typography variant="body2">&nbsp; 2 &nbsp;</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          disabled={currentPage == totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <KeyboardDoubleArrowRightIcon />
        </Button>
      </Box>
    </Box>
  );
};
