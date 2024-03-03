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
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Typography,
  Button,
  Hidden,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 240;

export default function PermanentDrawerLeft(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          <Toolbar style={{ width: "40%" }}>
            <Hidden smUp>
              {!isMenuOpen && (
                <MenuIcon
                  size="large"
                  sx={{ color: "black" }}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                />
              )}
              {isMenuOpen && (
                <CloseIcon
                  size="large"
                  sx={{ color: "black" }}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                />
              )}
            </Hidden>
          </Toolbar>
          <Toolbar>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sl-explorer.appspot.com/o/CommonImageAssets%2Flogo.png?alt=media&token=01bd5d9e-cc6d-4a31-a66d-1ba9294f7ae2"
              width={80}
              height={50}
            />
          </Toolbar>
          <Toolbar
            style={{ width: "40%", gap: "10px" }}
            className="flex justify-end align-end"
          >
            {/* <Divider
              sx={{
                height: "100%",
                width: "0.5px",
                bgcolor: "#ccc",
                ml: "5px",
                mr: "5px",
              }}
            /> */}
            <Button
              size="large"
              variant="outlined"
              sx={{ borderRadius: "100px" }}
            >
              <CalendarMonthIcon
                style={{
                  fontSize: "large",
                  color: "black",
                  margin: "3px",
                }}
              />
            </Button>
            {/* <Divider
              sx={{
                height: "100%",
                width: "0.5px",
                bgcolor: "#ccc",
                ml: "5px",
                mr: "5px",
              }}
            /> */}
            <Link to="/messages">
              <Button
                size="large"
                variant="outlined"
                sx={{ borderRadius: "100px" }}
              >
                <ChatIcon
                  style={{
                    fontSize: "large",
                    color: "black",
                    margin: "3px",
                  }}
                />
              </Button>
            </Link>
            {/* <Divider
              sx={{
                height: "100%",
                width: "0.5px",
                bgcolor: "#ccc",
                ml: "5px",
                mr: "5px",
              }}
            /> */}
            <Button variant="outlined" sx={{ borderRadius: "100px" }}>
              <div className="flex flex-row items-end">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/sl-explorer.appspot.com/o/CommonImageAssets%2Fprofile.avif?alt=media&token=74b10db0-852e-4286-b292-dc6ee9e13f7d"
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    width: "40px",
                    height: "40px",
                  }}
                />
                <Typography variant="subtitle2" color="black" ml={1}>
                  Claudia
                </Typography>
              </div>
            </Button>
          </Toolbar>
        </div>
      </AppBar>

      <Hidden smUp>
        {isMenuOpen && (
          <Box
            className="absolute w-full h-auto p-10 m-0"
            sx={{ backgroundColor: "#eee", zIndex: "100" }}
          >
            <Toolbar>
              <div className="w-full flex justify-center">
                <h3
                  style={{
                    color: "#000",
                    fontWeight: "bolder",
                  }}
                >
                  Menu
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
                {
                  route: "/round-trips",
                  text: "Round Trips",
                  icon: <JoinLeft />,
                },
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
                      setIsMenuOpen(false);
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
                      sx={{
                        color: selectedItem === route ? "white" : "inherit",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{
                        color: selectedItem === route ? "white" : "inherit",
                      }}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        )}
      </Hidden>

      <Hidden smDown>
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
          <Toolbar
            sx={{
              backgroundColor: "#FFA412",
            }}
          >
            <div className="w-full flex justify-center">
              <h3
                style={{
                  color: "#FFF",
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
              {
                route: "/round-trips",
                text: "Round Trips",
                icon: <JoinLeft />,
              },
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
      </Hidden>
    </>
  );
}
