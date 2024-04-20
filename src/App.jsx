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
import { Festivals } from "./pages/Festival.jsx";
import { AddRoundTrips } from "./components/tripComponents/PackDetails/AddRoundtrips";
import EditRoundTrips from "./components/tripComponents/PackDetails/EditRoundTrips.jsx";
import { AddDayTrips } from "./components/dayTripComponents/AddDayTrips.jsx";

function App() {
  const [count, setCount] = useState(0);
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  function Front(props) {
    return (
      <Box
        className="front w-full h-full pt-12 sm:pl-60"
        sx={{ boxSizing: "border-box" }}
      >
        {/* <PermanentDrawerTop /> */}
        <PermanentDrawerLeft in={props.in} route={props.route} />
        <div className="w-full h-full">{props.children}</div>
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
          />
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
          />
          <Route
            path="/round-trips/edit-round-trips/:tripId"
            exact
            element={
              <RequireAuth>
                <Front
                  route="/round-trips/edit-round-trips/:tripId"
                  in="RoundTrips"
                >
                  <EditRoundTrips />
                </Front>
              </RequireAuth>
            }
          />
          <Route
            path="/round-trips/add-round-trips"
            exact
            element={
              <RequireAuth>
                <Front route="/round-trips/add-round-trips" in="RoundTrips">
                  <AddRoundTrips />
                </Front>
              </RequireAuth>
            }
          />
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
          />
          <Route
            path="/day-trips/edit-day-trips/:tripId"
            exact
            element={
              <RequireAuth>
                <Front route="/day-trips/edit-day-trips/:tripId" in="DayTrips">
                  <AddDayTrips />
                </Front>
              </RequireAuth>
            }
          />
          <Route
            path="/day-trips/add-day-trips"
            exact
            element={
              <RequireAuth>
                <Front route="/day-trips/add-day-trips" in="DayTrips">
                  <AddDayTrips />
                </Front>
              </RequireAuth>
            }
          />
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
          />
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
          />
          <Route
            path="/festivals"
            exact
            element={
              <RequireAuth>
                <Front route="/festivals" in="Festivals & Events">
                  <Festivals />
                </Front>
              </RequireAuth>
            }
          />
          <Route
            path="/notification-campaign"
            exact
            element={
              <RequireAuth>
                <Front
                  route="/notification-campaign"
                  in="Notification Campaign"
                >
                  <NotificationCampaign />
                </Front>
              </RequireAuth>
            }
          />
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
          />
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
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right"></ToastContainer>
    </>
  );
}

export default App;
