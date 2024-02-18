import { useState, useContext } from "react";
import "./App.css";
import PermanentDrawerLeft from "./components/drawer.jsx";
import {
  Routes,
  BrowserRouter,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Hotels } from "./pages/Hotels";
import { Settings } from "./pages/Settings.jsx";
import { CruiseShips } from "./pages/CruiseShips.jsx";
import { DayTrips } from "./pages/DayTrips.jsx";
import { RoundTrips } from "./pages/RoundTrips.jsx";
import { Messages } from "./pages/Messages.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { NotificationCampaign } from "./pages/NotificationCampaign.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./contexts/AuthContext.jsx";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PermanentDrawerTop from "./components/TopDrawer";

function App() {
  const [count, setCount] = useState(0);
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  function Front(props) {
    /*props does not need to be props */
    return (
      <Box
        sx={{
          display: "flex",
          height: "100%",
        }}
      >
        {/* <PermanentDrawerTop /> */}
        <PermanentDrawerLeft in={props.in} route={props.route} />
        {props.children}
      </Box>
    );
  }

  // console.log("current user:", currentUser);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />}></Route>
          <Route
            path="/"
            exact
            element={
              <RequireAuth>
                <Front in="Dashboard" route="/">
                  <Home />
                </Front>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/cruise-ships"
            exact
            element={
              <RequireAuth>
                <Front route="/cruise-ships" in="CruiseShips">
                  <CruiseShips />
                </Front>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/round-trips"
            exact
            element={
              <RequireAuth>
                <Front route="/round-trips" in="RoundTrips">
                  <RoundTrips />
                </Front>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/day-trips"
            exact
            element={
              <RequireAuth>
                <Front route="/day-trips" in="DayTrips">
                  <DayTrips />
                </Front>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/hotels"
            exact
            element={
              <RequireAuth>
                <Front route="/hotels" in="Hotels">
                  <Hotels />
                </Front>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/notification-campaign"
            exact
            element={
              <RequireAuth>
                <Front route="/notification-campaign" in="NotificationCampaign">
                  <NotificationCampaign />
                </Front>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/messages"
            exact
            element={
              <RequireAuth>
                <Front route="/messages" in="Messages">
                  <Messages />
                </Front>
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/settings"
            exact
            element={
              <RequireAuth>
                <Front route="/settings" in="Settings">
                  <Settings />
                </Front>
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right"></ToastContainer>
    </>
  );
}

export default App;
