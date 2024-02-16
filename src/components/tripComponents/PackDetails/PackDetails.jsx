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
} from "@mui/material";
import React from "react";
import { useState } from "react";

const PackDetails = () => {
  const [packName, setPackName] = useState("");
  const [packSubtitle, setPackSubtitle] = useState("");
  const [packCoverDescription, setPackCoverDescription] = useState("");
  const [packShortDescription, setPackShortDescription] = useState("");

  const saveDetails = () => {
    alert(
      "Save Details: ",
      packName,
      packSubtitle,
      packCoverDescription,
      packShortDescription
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        flexFlow: "row wrap",
        justifyContent: "space-around",
      }}
      display="flex"
      gap={2}
    >
      <Paper
        flex={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          border: "1px solid #e0e0e0",
          borderRadius: "6px",
          minWidth: "300px",
          width: "45%",
        }}
      >
        <Typography p={1} variant="subtitle2">
          Package Details
        </Typography>
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
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          width="100%"
          gap={2}
        >
          <Box
            display="flex"
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
            width="100%"
            gap={1}
          >
            <Typography variant="body2">Package Name</Typography>
            <TextField
              fullWidth
              value={packName}
              onChange={(e) => setPackName(e.target.value)}
              placeholder="Sri Lanka Culture & Nature"
              size="small"
            />
          </Box>

          <Box
            display="flex"
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
            width="100%"
            gap={1}
          >
            <Typography variant="body2">Package Subtitle</Typography>
            <TextField
              fullWidth
              value={packSubtitle}
              onChange={(e) => setPackSubtitle(e.target.value)}
              placeholder="9 Days/8 Nights Highlights Tour"
              size="small"
            />
          </Box>

          <Box
            display="flex"
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
            width="100%"
            gap={1}
          >
            <Typography variant="body2">Cover Description</Typography>

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
            display="flex"
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
            width="100%"
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
              helperText="Will be shown in the package lists"
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
      </Paper>

      <Paper
        flex={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          border: "1px solid #e0e0e0",
          borderRadius: "6px",
          minWidth: "300px",
          width: "45%",
        }}
      >
        <Typography p={1} variant="subtitle2">
          Cover Image
        </Typography>
        <Divider
          sx={{
            width: "100%",
            bgcolor: "primary",
          }}
        />

        <Box
          width="100%"
          p={2}
          gap={2}
          sx={{ display: "flex", flexFlow: "column nowrap" }}
        >
          <Box
            width="100px"
            height="100px"
            sx={{
              bgcolor: "grey.300",
              borderRadius: "6px",
            }}
          >
            asnsna
          </Box>
          <Box
            width="100px"
            height="100px"
            sx={{
              bgcolor: "grey.300",
              borderRadius: "6px",
            }}
          >
            asnsna
          </Box>
        </Box>

        <Divider
          sx={{
            width: "100%",
            bgcolor: "primary",
          }}
        />
        <Typography p={1} variant="subtitle2">
          Package Images
        </Typography>
        <Divider
          sx={{
            width: "100%",
            bgcolor: "primary",
          }}
        />
      </Paper>
    </Box>
  );
};

export { PackDetails };
