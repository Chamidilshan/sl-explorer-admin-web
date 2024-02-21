import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

export const Hotels = () => {
  return (
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
          height: "45%",
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
            Itinerary
          </Typography>
        </Box>
        <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Day No.</TableCell>
                <TableCell>Day Name</TableCell>
                <TableCell>Day Location</TableCell>
                <TableCell>Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Day 1</TableCell>
                <TableCell>Sunday</TableCell>
                <TableCell>Pinnawela</TableCell>
                <TableCell>Change</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Day 1</TableCell>
                <TableCell>Sunday</TableCell>
                <TableCell>Pinnawela</TableCell>
                <TableCell>Change</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Day 1</TableCell>
                <TableCell>Sunday</TableCell>
                <TableCell>Pinnawela</TableCell>
                <TableCell>Change</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Day 1</TableCell>
                <TableCell>Sunday</TableCell>
                <TableCell>Pinnawela</TableCell>
                <TableCell>Change</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Day 1</TableCell>
                <TableCell>Sunday</TableCell>
                <TableCell>Pinnawela</TableCell>
                <TableCell>Change</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Day 1</TableCell>
                <TableCell>Sunday</TableCell>
                <TableCell>Pinnawela</TableCell>
                <TableCell>Change</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        sx={{
          height: "45%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "red",
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
      </Box>
    </Box>
  );
};
