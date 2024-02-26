import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import ChatIcon from "@mui/icons-material/Chat";
import {
  CelebrationOutlined,
  JoinLeft,
  JoinRight,
  Message,
  NotificationAdd,
  Settings,
  Weekend,
} from "@mui/icons-material";
import { AppBar, IconButton, Typography } from "@mui/material";

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
    // console.log("selectedItem:", selectedItem);
    if (mainRouteList.indexOf(props.route) != -1) {
      setSelectedItem(props.route);
    }
  }, [props.route]);

  return (
    <>
      <AppBar
        style={{ backgroundColor: "white", border: "1px solid #CCC" }}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="top"
      >
        <div className="w-full flex justify-between">
          <Toolbar style={{ width: "40%" }}></Toolbar>
          <Toolbar>
            <img src="../../src/assets/logo.png" width={80} height={50} />
          </Toolbar>
          <Toolbar
            style={{ width: "40%" }}
            className="flex justify-end align-end"
          >
            <Link to="/messages">
              <IconButton size="large">
                <ChatIcon
                  style={{
                    fontSize: "large",
                    color: "black",
                    margin: "3px",
                  }}
                />
              </IconButton>
            </Link>

            <Typography variant="body2" color="black">
              Claudia
            </Typography>
            <img
              src="../../src/assets/addImage.png"
              width={60}
              height={60}
              style={{ borderRadius: "50%" }}
            />
          </Toolbar>
        </div>
      </AppBar>
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
          <div className="w-full flex justify-center">
            <h3
              style={{
                color: "#EEA412",
                fontWeight: "bolder",
              }}
            >
              {props.in ?? selectedItem}
            </h3>
          </div>
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
            <Link to={route} key={route}>
              <ListItem
                onClick={(e) => {
                  setSelectedItem(route);
                }}
                sx={{
                  backgroundColor:
                    selectedItem === route ? "#FFA412" : "inherit",
                  "&:hover": {
                    backgroundColor: "#FFA412",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: selectedItem === route ? "white" : "inherit" }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ color: selectedItem === route ? "white" : "inherit" }}
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
}
