import React, { useEffect, useState } from "react";
import PermanentDrawerLeft from "../../drawer";
import {
  Container,
  Typography,
  Toolbar,
  Box,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Button,
} from "@mui/material";
import PermanentDrawerTop from "../../TopDrawer";
import { PackDetails } from "./PackDetailsPage";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Itinerary } from "./Itinerary";
import { Hotel } from "./Hotel";
import { Prices } from "./Prices";
import { Key } from "@mui/icons-material";
import { json, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { imageDb } from "../../../../config";
import { v4 } from "uuid";
import { RoundTripServices } from "../../../services/RoundTripService";

export const AERoundTrips = () => {
  const navigate = useNavigate();
  const pages = ["PackDetails", "Itinerary", "Hotels", "Prices"];
  const [currentPage, setCurrentPage] = useState(1);

  const [packDetails, setPackDetails] = useState(["", "", "", "", 0]); //finished
  const [images, setImages] = useState(["", [[1, ""]]]); //finished
  const [itinerary1, setItinerary1] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [prices, setPrices] = useState(["", "", "", "", "", ""]);

  const [packageImage, setPackageImage] = useState(""); //firestore saved url
  const [packageImageLinks, setPackageImageLinks] = useState([""]); //firestore saved urls

  useEffect(() => {
    console.log(packageImageLinks == "", packageImage == "");
    if (packageImageLinks == "" || packageImage == "") {
    } else {
      makeJson();
      console.log(JSON.stringify(jsonObject, null, 2));
      RoundTripServices.createRoundTrip(JSON.stringify(jsonObject, null, 2));
      navigate("/round-trips");
    }
  }, [packageImageLinks, packageImage]);

  const extractImages = async () => {
    try {
      var ref = await uploadImage(images[0]);
      setPackageImage(ref);

      const packageImageArray = await Promise.all(
        images[1].map(async (image) => {
          var url = await uploadImage(image[1]);
          return url;
        })
      );

      setPackageImageLinks(packageImageArray);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (image) => {
    if (image) {
      const imgRef = ref(imageDb, `roundtripImages/${v4()}`);
      try {
        const snapshot = await uploadString(imgRef, image, "data_url");
        const url = await getDownloadURL(snapshot.ref);
        console.log("Image Uploaded, URL :", url);
        return url;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  const jsonObject = {};
  const makeJson = async () => {
    jsonObject["packageName"] = packDetails[0];
    jsonObject["packageShortDescription"] = packDetails[3];
    jsonObject["packageCoverDescription"] = packDetails[2];
    jsonObject["packageCoverImage"] = packageImage;
    jsonObject["packageImageLinks"] = packageImageLinks;
    jsonObject["packageTitle"] = packDetails[0];
    jsonObject["packageSubTitle"] = packDetails[1];
    jsonObject["packageTotalSeats"] = packDetails[4];
    jsonObject["itenary"] = itinerary1.map((item, index) => {
      return {
        dayNumber: item[0],
        dayName: item[1],
        location: [item[2], item[3], item[4], item[5]],
        description: item[6],
        optionalDescription: item[8],
      };
    });
    jsonObject["hotels"] = hotels.map((item, index) => {
      return {
        hotel: item[0],
        hotelRoomDesc: item[1],
        hotelLocationDesc: item[2],
      };
    });
    jsonObject["prices"] = {
      group: {
        single: prices[0],
        double: prices[1],
        triple: prices[2],
      },
      private: {
        single: prices[3],
        double: prices[4],
        triple: prices[5],
      },
    };
  };

  const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (confirm("Do you really want to publish the pack?")) {
      const newTrip = {
        packDetails,
        images,
        itinerary1,
        hotels,
        prices,
      };
      setLoading(true);
      try {
        await extractImages(); //automaticaly update and extract
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      console.log(JSON.stringify(jsonObject, null, 2));
    } else {
      alert("Submission canceled..!");
    }
  };

  const toggleButtonHandler = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const receiveIti = (data) => setItinerary1(data);

  return (
    <Box
      display="flex"
      sx={{
        flexFlow: "column nowrap",
        justifyContent: "space-between",
        minHeight: "90vh",
        height: "auto",
      }}
      gap={2}
      className="w-full"
    >
      {loading && (
        <Box>
          <Typography variant="h1">loading...</Typography>
        </Box>
      )}
      <Box sx={{ display: "flex" }}>
        <Typography>Dashboard / Round_Trips / Add-Edit_Round_Trips</Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
        }}
        // bgcolor="secondary.main"
      >
        {currentPage == 1 && (
          <PackDetails
            onSaveDetails={(data) => setPackDetails(data)}
            onSaveImages={(imgs) => setImages(imgs)}
            prevImages={images}
            prevDetails={packDetails}
          />
        )}
        {currentPage == 2 && (
          <Itinerary
            onSaveItinerary={(data) => setItinerary1(data)}
            prevItinerary={itinerary1}
          />
        )}
        {currentPage == 3 && (
          <Hotel
            onSaveItinerary={(data) => setHotels(data)}
            prevItinerary={hotels}
          />
        )}
        {currentPage == 4 && (
          <Prices
            onSaveDetails={(data) => setPrices(data)}
            prevDetails={prices}
          />
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Button
          width={10}
          variant="outlined"
          color="error"
          onClick={() => navigate("/round-trips")}
        >
          <Typography variant="subtitle2">Exit</Typography>
        </Button>

        <Button
          disabled={currentPage == 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <KeyboardDoubleArrowLeftIcon />
        </Button>
        <ButtonGroup
          size="small"
          value={currentPage}
          onChange={toggleButtonHandler}
          color="primary"
        >
          {pages.map((page, index) => {
            return (
              <Button
                variant={currentPage == index + 1 ? "contained" : "outlined"}
                key={page}
                value={index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                <Typography variant="body2">
                  &nbsp; {index + 1} &nbsp;
                </Typography>
              </Button>
            );
          })}
        </ButtonGroup>
        <Button
          disabled={currentPage == pages.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <KeyboardDoubleArrowRightIcon />
        </Button>
        <Button
          width={10}
          variant="contained"
          color="primary"
          onClick={submit}
          disabled={!(prices && hotels && itinerary1 && images && packDetails)}
        >
          <Typography variant="subtitle2">Publish</Typography>
        </Button>
      </Box>
    </Box>
  );
};
