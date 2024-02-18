import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Container, Divider, Paper, TextField } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  borderRadius: "10px",
};

const saveDetails = () => {
  alert(
    "Save Details: ",
    packName,
    packSubtitle,
    packCoverDescription,
    packShortDescription
  );
};

export function HotelModal() {
  const [packName, setPackName] = useState("");
  const [packSubtitle, setPackSubtitle] = useState("");
  const [packCoverDescription, setPackCoverDescription] = useState("");
  const [packShortDescription, setPackShortDescription] = useState("");

  return (
    <Box sx={style}>
      <Box pt={2} pl={4} pb={1}>
        <Typography variant="subtitle2" sx={{ fontWeight: "550" }}>
          Add Hotel
        </Typography>
      </Box>

      <Divider
        sx={{
          width: "100%",
          bgcolor: "primary",
        }}
      />

      <Box
        p={2}
        display="flex"
        sx={{
          flexFlow: "row wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          p: 4,
        }}
        width="100%"
        gap={2}
      >
        <Box
          sx={{
            flex: "display",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "45%",
            minWidth: "250px",
          }}
          gap={1}
        >
          <Typography variant="body2">Hotel Name</Typography>
          <TextField
            fullWidth
            value={packName}
            onChange={(e) => setPackName(e.target.value)}
            placeholder="Sri Lanka Culture & Nature"
            size="small"
          />
        </Box>

        <Box
          sx={{
            flex: "display",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "45%",
            minWidth: "250px",
          }}
          gap={1}
        >
          <Typography variant="body2">Hotel Subtitle</Typography>
          <TextField
            fullWidth
            value={packSubtitle}
            onChange={(e) => setPackSubtitle(e.target.value)}
            placeholder="9 Days/8 Nights Highlights Tour"
            size="small"
          />
        </Box>

        <Box
          sx={{
            flex: "display",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            minWidth: "250px",
          }}
          gap={1}
        >
          <Typography variant="body2">Day</Typography>

          <TextField
            multiline
            value={packCoverDescription}
            onChange={(e) => setPackCoverDescription(e.target.value)}
            rows={2}
            type="text"
            size="small"
            helperText="Will be shown in the package lists"
            fullWidth
            placeholder="Sri Lanka, the pearl of the Indian Ocean, is rich in beautiful sights  ..."
          />
        </Box>

        <Box
          sx={{
            flex: "display",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            minWidth: "250px",
          }}
          gap={1}
        >
          <Typography variant="body2">Short Description</Typography>

          <TextField
            multiline
            value={packShortDescription}
            onChange={(e) => setPackShortDescription(e.target.value)}
            rows={3}
            type="text"
            size="small"
            helperText="Will be shown in the package details page"
            fullWidth
            placeholder="Cover Description Our comprehensive 9-day Sri Lanka tour will show you the highlights of our island, tell you the history ..."
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={saveDetails}
          disabled={
            !(
              packName &&
              packSubtitle &&
              packShortDescription &&
              packCoverDescription
            )
          }
          aria-label="save package details"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
