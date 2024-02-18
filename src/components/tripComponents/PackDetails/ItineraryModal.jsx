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
  width: "50%",
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

export function ItineraryModal() {
  const [packName, setPackName] = useState("");
  const [packSubtitle, setPackSubtitle] = useState("");
  const [packCoverDescription, setPackCoverDescription] = useState("");
  const [packShortDescription, setPackShortDescription] = useState("");

  return (
    <Box sx={style}>
      <Box pt={2} pl={4} pb={1}>
        <Typography variant="subtitle2" sx={{ fontWeight: "550" }}>
          Add Itinerary
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
          <Typography variant="body2">Day</Typography>
          <TextField
            fullWidth
            value={packName}
            onChange={(e) => setPackName(e.target.value)}
            placeholder="Day 01"
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
          <Typography variant="body2">Day Name</Typography>
          <TextField
            fullWidth
            value={packSubtitle}
            onChange={(e) => setPackSubtitle(e.target.value)}
            placeholder="Thursday"
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
          <Typography variant="body2">Location 1</Typography>
          <TextField
            fullWidth
            value={packSubtitle}
            onChange={(e) => setPackSubtitle(e.target.value)}
            placeholder="Hambantota"
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
          <Typography variant="body2">Location 2</Typography>
          <TextField
            fullWidth
            value={packSubtitle}
            onChange={(e) => setPackSubtitle(e.target.value)}
            placeholder="Tangalle"
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
          <Typography variant="body2">Location 3</Typography>
          <TextField
            fullWidth
            value={packSubtitle}
            onChange={(e) => setPackSubtitle(e.target.value)}
            placeholder="Kirinda"
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
          <Typography variant="body2">Location 4</Typography>
          <TextField
            fullWidth
            value={packSubtitle}
            onChange={(e) => setPackSubtitle(e.target.value)}
            placeholder="Matara"
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
          <Typography variant="body2">Day Description</Typography>

          <TextField
            multiline
            value={packCoverDescription}
            onChange={(e) => setPackCoverDescription(e.target.value)}
            rows={2}
            type="text"
            size="small"
            fullWidth
            placeholder="Sri Lanka, the pearl of the Indian Ocean, is rich in beautiful sights  ..."
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
