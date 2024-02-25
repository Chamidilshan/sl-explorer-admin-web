import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import MailIcon from "@mui/icons-material/Mail";
import {
  CelebrationOutlined,
  JoinLeft,
  JoinRight,
  Message,
  NotificationAdd,
  Settings,
  Weekend,
} from "@mui/icons-material";

const drawerWidth = 240;

export default function PermanentDrawerLeft(props) {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(props.route ?? "/");

  console.log(props.route);

  const mainRouteList = [
    "/",
    "/cruise-ships",
    "/round-trips",
    "/day-trips",
    "/hotels",
    "/festivals",
    "/notification-campaign",
    "/messages",
    "/settings",
  ];

  useEffect(() => {
    console.log("selectedItem:", selectedItem);
    if (mainRouteList.indexOf(selectedItem) != -1) {
      navigate(selectedItem);
    }
  }, [selectedItem, navigate]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <h2
          style={{ color: "#FFA412", marginLeft: "20px", fontWeight: "bolder" }}
        >
          {props.in ?? selectedItem}
        </h2>
      </Toolbar>
      <List sx={{ color: "#737791" }}>
        {[
          { route: "/", text: "Dashboard", icon: <DashboardIcon /> },
          {
            route: "/cruise-ships",
            text: "Cruise Ships",
            icon: <DirectionsBoatIcon />,
          },
          { route: "/round-trips", text: "Round Trips", icon: <JoinLeft /> },
          { route: "/day-trips", text: "Day Trips", icon: <JoinRight /> },
          { route: "/hotels", text: "Hotels", icon: <Weekend /> },
          {
            route: "/festivals",
            text: "Festivals & Events",
            icon: <CelebrationOutlined />,
          },
          {
            route: "/notification-campaign",
            text: "Notification Campaign",
            icon: <NotificationAdd />,
          },
          { route: "/messages", text: "Messages", icon: <Message /> },
          { route: "/settings", text: "Settings", icon: <Settings /> },
        ].map(({ route, text, icon }) => (
          <ListItem
            key={route}
            onClick={(e) => {
              setSelectedItem(route);
            }}
            sx={{
              backgroundColor: selectedItem === route ? "#FFA412" : "inherit",
              "&:hover": {
                backgroundColor: "#FFA412",
              },
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText
              primary={text}
              sx={{ color: selectedItem === route ? "white" : "inherit" }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
