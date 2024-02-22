import React, { useState } from "react";
import PermanentDrawerLeft from "../components/drawer";
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
import PermanentDrawerTop from "../components/TopDrawer";
import { PackDetails } from "../components/tripComponents/PackDetails/PackDetailsPage";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Itinerary } from "../components/tripComponents/PackDetails/Itinerary";
import { Hotel } from "../components/tripComponents/PackDetails/Hotel";
import { Prices } from "../components/tripComponents/PackDetails/Prices";
import { Key } from "@mui/icons-material";
import { json } from "react-router-dom";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { imageDb } from "../../config";
import { v4 } from "uuid";
import { RoundTripServices } from "../services/RoundTripService";

export const RoundTrips = () => {
  const pages = ["PackDetails", "Itinerary", "Hotels", "Prices"];
  const [currentPage, setCurrentPage] = useState(1);

  const [packDetails, setPackDetails] = useState(["", "", "", "", 0]); //finished
  const [images, setImages] = useState(["", [[1, ""]]]); //finished
  const [itinerary, setItinerary] = useState([[""]]);
  const [hotels, setHotels] = useState([[""]]);
  const [prices, setPrices] = useState(["", "", "", "", "", ""]);

  const [packageCoverImage, setPackageCoverImage] = useState(""); //firestore saved url
  const [packageImageLinks, setPackageImageLinks] = useState([""]); //firestore saved urls

  const extractImages = async () => {
    try {
      var ref = await uploadImage(images[0]);
      setPackageCoverImage(ref);

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
    jsonObject["packageCoverImage"] = packageCoverImage;
    jsonObject["packageImageLinks"] = packageImageLinks;
    jsonObject["packageTitle"] = packDetails[0];
    jsonObject["packageSubTitle"] = packDetails[1];
    jsonObject["packageTotalSeats"] = packDetails[4];
    jsonObject["itenary"] = itinerary.map((item, index) => {
      if (index == 0) return;
      else {
        return {
          dayNumber: item[0],
          dayName: item[1],
          location: [item[2], item[3], item[4], item[5]],
          description: item[6],
          optionalDescription: item[8],
        };
      }
    });
    jsonObject["hotels"] = hotels.map((item, index) => {
      if (index == 0) return;
      else {
        return {
          hotel: item[0],
          hotelRoomDesc: item[1],
          hotelLocationDesc: item[2],
        };
      }
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
    const newTrip = {
      packDetails,
      images,
      itinerary,
      hotels,
      prices,
    };
    setLoading(true);
    try {
      await extractImages(); //automaticaly update and extract
      await makeJson();
      await RoundTripServices.createRoundTrip(
        JSON.stringify(jsonObject, null, 2)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    console.log(JSON.stringify(jsonObject, null, 2));

    // console.log(JSON.stringify(newTrip, null, 2));
    // console.log(newTrip);
  };

  const toggleButtonHandler = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box
      display="flex"
      sx={{
        flexFlow: "column nowrap",
        justifyContent: "space-between",
        minHeight: "90vh",
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
        <Typography>Dashboard / Round Trips</Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexFlow: "row wrap",
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
            onSaveItinerary={(data) => setItinerary(data)}
            prevItinerary={itinerary}
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
          disabled={currentPage == 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <KeyboardDoubleArrowLeftIcon />
        </Button>
        <ToggleButtonGroup
          size="small"
          value={currentPage}
          onChange={toggleButtonHandler}
          color="primary"
          exclusive
        >
          {pages.map((page, index) => {
            return (
              <ToggleButton
                key={page}
                value={index + 1}
                onClick={() => setCurrentPage(index + 1)}
              >
                <Typography variant="body2">
                  &nbsp; {index + 1} &nbsp;
                </Typography>
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
        <Button
          disabled={currentPage == pages.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <KeyboardDoubleArrowRightIcon />
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={submit}
          disabled={!(prices && hotels && itinerary && images && packDetails)}
        >
          <Typography variant="subtitle2">Submit</Typography>
        </Button>
      </Box>
    </Box>
  );
};
