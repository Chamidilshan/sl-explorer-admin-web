import React from "react";
import PermanentDrawerLeft from "../components/drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MessageSidebar from "../components/messages/MessageSideBar";
import Chat from "../components/messages/Chat";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

export const Messages = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* <PermanentDrawerLeft /> */}
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Messages
          </Typography>
        </Toolbar>
        <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
          <MessageSidebar />
          <Chat />
        </Box>
      </Box>
    </Box>
  );
};
