import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Breadcrumbs,
  Paper,
  Divider,
  TextField,
  CardMedia,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Modal,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { imageDb } from "../../../config.js";
import { RoundTripServices } from "../../services/RoundTripService.jsx";
import CustomDropzone from "../customDropZone";
import ImageIcon from "@mui/icons-material/Image";
import HideImageIcon from "@mui/icons-material/HideImage";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import HotelService from "../../services/HotelService.jsx";
import { CheckBox } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { green } from "@mui/material/colors";
import { DayTripServices } from "../../services/DayTripServices.jsx";

export const AddDayTrips = () => {
  const [packDetails, setPackDetails] = useState([
    "", //categ name
    "", //pack name
    "", //pack short
    "", //cover desc
    "", //title
    "", //subtitle
    true, //one daay 6
    false, //teo 7
    false, //three 8
  ]);
  const [images, setImages] = useState(["", [[1, ""]]]); //finished
  const [services, setServices] = useState([""]);
  const [hotels, setHotels] = useState([""]);
  const [prices, setPrices] = useState([0, 0, 0]);
  const [weekdays, setWeekdays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [isFetching, setIsFetching] = useState(false);
  const { tripId } = useParams();
  useEffect(() => {
    if (tripId != undefined) {
      setIsFetching(true);
      const resp = DayTripServices.getDayTrip(tripId)
        .then((response) => {
          console.log(response.data);
          setPackDetails([
            response.data.packageCategoryName,
            response.data.packageName,
            response.data.packageShortDescription,
            response.data.packageCoverDescription,
            response.data.packageTitle,
            response.data.packageSubTitle,
            response.data.packageDays == 1,
            response.data.packageDays == 2,
            response.data.packageDays == 3,
          ]);
          setImages([
            response.data.packageCoverImage,
            response.data.packageImageLinks.map((item, index) => [index, item]),
          ]);
          setServices(response.data.services);
          setHotels(response.data.hotels);
          setPrices([
            response.data.price,
            response.data.price,
            response.data.price,
          ]);
          setWeekdays(
            response.data.avaliableDates.map((item) => item.avaliability)
          );
        })
        .then(() => {
          setIsFetching(false);
        });
    }
  }, [tripId]);

  const [packageImage, setPackageImage] = useState(""); //firestore saved url
  const [packageImageLinks, setPackageImageLinks] = useState([""]); //firestore saved urls

  useEffect(() => {
    // console.log(packageImageLinks, packageImage);
    if (packageImageLinks[images[1].length - 1] != "" && packageImage != "") {
      try {
        console.log(packDetails[6]);
        makeJson();
        if (packDetails[6]) {
          jsonObject["packageDays"] = 1;
          jsonObject["price"] = prices[0];
          console.log(JSON.stringify(jsonObject, null, 2));
          tripId
            ? DayTripServices.updateDayTrip(
                tripId,
                JSON.stringify(jsonObject, null, 2)
              )
            : DayTripServices.createDayTrip(
                JSON.stringify(jsonObject, null, 2)
              );
        }
        console.log(packDetails[7]);
        if (packDetails[7]) {
          jsonObject["packageDays"] = 2;
          jsonObject["price"] = prices[1];
          console.log(JSON.stringify(jsonObject, null, 2));
          tripId
            ? DayTripServices.updateDayTrip(
                tripId,
                JSON.stringify(jsonObject, null, 2)
              )
            : DayTripServices.createDayTrip(
                JSON.stringify(jsonObject, null, 2)
              );
        }
        console.log(packDetails[8]);
        if (packDetails[8]) {
          jsonObject["packageDays"] = 3;
          jsonObject["price"] = prices[2];
          console.log(JSON.stringify(jsonObject, null, 2));
          tripId
            ? DayTripServices.updateDayTrip(
                tripId,
                JSON.stringify(jsonObject, null, 2)
              )
            : DayTripServices.createDayTrip(
                JSON.stringify(jsonObject, null, 2)
              );
        }
        alert(
          `Package has been ${
            tripId != undefined ? "updated" : "created"
          }..!\n<< Check and go back <<`
        );
      } catch (e) {
        toast.error("Creating/Updating package failed..!" + e);
        console.log(e);
      } finally {
        setPackageImage("");
        setPackageImageLinks([""]);
      }
      // navigate("/day-trips");
    }
  }, [packageImageLinks, packageImage]);

  function isURL(str) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlPattern.test(str);
  }
  const extractImages = async () => {
    try {
      if (!isURL(images[0])) {
        var ref = await uploadImage(images[0]);
        setPackageImage(ref);
      } else {
        setPackageImage(images[0]);
      }

      const packageImageArray = await Promise.all(
        images[1].map(async (image) => {
          var ref;
          if (!isURL(image[1])) {
            ref = await uploadImage(image[1]);
          } else {
            ref = image[1];
          }
          // var url = await uploadImage(image[1]);
          return ref;
        })
      );
      setPackageImageLinks(packageImageArray);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (image) => {
    if (image) {
      const imgRef = ref(imageDb, `daytripImages/${v4()}`);
      try {
        const snapshot = await uploadString(imgRef, image, "data_url");
        const url = await getDownloadURL(snapshot.ref);
        return url;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const jsonObject = {};
  const makeJson = async () => {
    jsonObject["packageCategoryName"] = packDetails[0];
    jsonObject["packageCategoryImage"] =
      "https://firebasestorage.googleapis.com/v0/b/sl-explorer.appspot.com/o/daytripImages%2F71d75cae-4ec6-4c57-9344-fbef4c0e2c9c?alt=media&token=2000ca1e-490b-48df-9607-abdb0fc678e2";
    jsonObject["packageName"] = packDetails[1];
    jsonObject["packageShortDescription"] = packDetails[2];
    jsonObject["packageCoverDescription"] = packDetails[3];
    jsonObject["packageCoverImage"] = packageImage;
    jsonObject["packageImageLinks"] = packageImageLinks;
    jsonObject["packageTitle"] = packDetails[4];
    jsonObject["packageSubTitle"] = packDetails[5];
    // jsonObject["packageTotalSeats"] = packDetails[4];
    jsonObject["services"] = services;
    jsonObject["hotels"] = hotels;
    jsonObject["avaliableDates"] = weekdays.map((item, index) => {
      return { dayName: days[index], avaliability: item };
    });
    // jsonObject["price"] = prices
  };

  const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (confirm("Do you really want to publish the pack?")) {
      // console.log(packDetails, images, services, hotels, prices, weekdays);
      // const newTrip = {
      //   packDetails,
      //   images,
      //   services,
      //   hotels,
      //   prices,
      // };
      setLoading(true);
      try {
        await extractImages(); //automaticaly update and extract
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Submission canceled..!");
    }
  };

  return (
    <Box
      display="flex"
      sx={{
        flexFlow: "column nowrap",
        justifyContent: "space-between",
        minHeight: "85vh",
        height: "auto",
      }}
      gap={2}
      className="w-full"
    >
      <Box sx={{ display: "flex" }}>
        <Breadcrumbs aria-label="Bread crumbs" separator={<NavigateNextIcon />}>
          <Link to="/">Dashboard</Link>
          <Link to="/day-trips">Day Trips</Link>
          <Typography color="text.primary">Add Day Trip</Typography>
        </Breadcrumbs>
      </Box>
      {loading ? (
        <Modal open={true}>
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="loading-animation" />
            <Typography variant="subtitle2" mt={2}>
              Uploading Images...
            </Typography>
            <Typography variant="body2" mt={2}>
              This might take some time according to the image size.
            </Typography>
            <Typography variant="body2" mt={2}>
              size and quality both are crucial to provide better user
              experience.{" "}
            </Typography>
          </div>
        </Modal>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
          }}
          // bgcolor="secondary.main"
        >
          {isFetching ? (
            <div className="w-full h-full flex justify-center items-center">
              <div className="loading-animation" />
            </div>
          ) : (
            <PackDetails
              onSaveDetails={(data) => setPackDetails(data)}
              onSaveImages={(imgs) => setImages(imgs)}
              onSaveServices={(data) => setServices(data)}
              onSaveHotels={(data) => setHotels(data)}
              onSavePrices={(data) => setPrices(data)}
              onSaveWeekdays={(data) => setWeekdays(data)}
              prevImages={images}
              prevDetails={packDetails}
              prevServices={services}
              prevHotels={hotels}
              prevPrices={prices}
              prevWeekdays={weekdays}
            />
          )}
        </Box>
      )}

      <Box
        sx={{
          width: "100%",
        }}
      >
        <Link to={"/day-trips"}>
          <Button width={10} variant="outlined" color="error">
            <Typography variant="subtitle2">Exit</Typography>
          </Button>
        </Link>

        <Button
          sx={{ marginLeft: "30px" }}
          width={10}
          variant="contained"
          color="primary"
          onClick={submit}
          disabled={!(hotels[0] != "" && services[0] != "")}
        >
          <Typography variant="subtitle2">Publish</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export const PackDetails = ({
  onSaveDetails,
  onSaveImages,
  onSaveServices,
  onSaveHotels,
  onSavePrices,
  onSaveWeekdays,
  prevImages,
  prevDetails,
  prevServices,
  prevHotels,
  prevPrices,
  prevWeekdays,
}) => {
  const [basicDetails, setBasicDetails] = useState(prevDetails);
  const [fd, setFd] = useState(false);
  const saveDetails = () => {
    setBasicDetails([
      categoryName,
      packageName,
      packageShortDescription,
      packageCoverDescription,
      packTitle,
      packSubtitle,
      oneDay,
      twoDays,
      threeDays,
    ]);
    setFd(true);
  };
  useEffect(() => {
    if (fd) {
      toast.success("Details Saved..!");
      onSaveDetails(basicDetails);
    }
  }, [basicDetails]);

  const [images, setImages] = useState(prevImages);
  // console.log(images);
  const [fi, setFi] = useState(false);
  const saveImages = (e) => {
    setImages([packageImage, coverImage]);
    toast.success("Images have been saved successfully..!");
    setFi(true);
  };
  useEffect(() => {
    if (fi) {
      // console.log(images);
      onSaveImages(images);
    }
  }, [images]);

  const [categoryName, setCategoryName] = useState(basicDetails[0]);
  const [packageName, setPackageName] = useState(basicDetails[1]);
  const [packageShortDescription, setPackShort] = useState(basicDetails[2]);
  const [packageCoverDescription, setPackCover] = useState(basicDetails[3]);
  const [packTitle, setPackTitle] = useState(basicDetails[4]);
  const [packSubtitle, setPackSubtitle] = useState(basicDetails[5]);
  const [oneDay, setOneDay] = useState(basicDetails[6]);
  const [twoDays, setTwoDays] = useState(basicDetails[7]);
  const [threeDays, setThreeDays] = useState(basicDetails[8]);

  const [oneDayPrice, setOneDayPrice] = useState(prevPrices[0]);
  const [twoDaysPrice, setTwoDaysPrice] = useState(prevPrices[1]);
  const [threeDaysPrice, setThreeDaysPrice] = useState(prevPrices[2]);
  const savePrices = (e) => {
    e.preventDefault();
    setPricesSuccess(true);
    onSavePrices([oneDayPrice, twoDaysPrice, threeDaysPrice]);
  };

  const [count, setCount] = useState(1);
  const [packageImage, setPackageImage] = useState(prevImages[0]);
  const [coverImage, setCoverImage] = useState(prevImages[1]);

  const [detailsSuccess, setDetailsSuccess] = useState(false);
  const [pricesSuccess, setPricesSuccess] = useState(false);
  const [weekdaysSuccess, setWeekdaysSuccess] = useState(false);
  const [imagesSuccess, setImagesSuccess] = useState(false);
  const [hotelsSuccess, setHotelsSuccess] = useState(false);
  const [servicesSuccess, setServicesSuccess] = useState(false);

  useEffect(() => {
    switch (categoryName) {
      case "West Coast Excursions":
        setPackTitle(
          "from/to Colombo, Wadduwa, Waskaduwa, Kalutara, Beruwela, Bentota, Induruwa, Ahungalla & Balapitiya"
        );
        break;
      case "Excursions north-west coast":
        setPackTitle("from/to Negombo, Waikkal");
        break;
      case "East Coast Excursions":
        setPackTitle("from/to Kalkudah & Passikudah, Trincomalee");
        break;
    }
  }, [categoryName]);

  const [hotelsList, setHotelsList] = useState([""]);
  const [hotels, setHotels] = useState(prevHotels);
  const [loading, setLoading] = useState(true);
  const saveHotels = (e) => {
    e.preventDefault();
    setHotelsSuccess(true);
    onSaveHotels(hotels);
  };

  useState(async () => {
    try {
      setLoading(true);
      const data = await await HotelService.getHotels();
      setHotelsList(data.data);
      setLoading(false);
      // console.log("Hotels data:", data.data);
    } catch (error) {
      console.log("Error fetching hotels:", error);
    }
  }, []);

  const [services, setServices] = useState(prevServices);
  const saveServices = (e) => {
    e.preventDefault();
    setServicesSuccess(true);
    onSaveServices(services);
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [weekdays, setWeekdays] = useState(prevWeekdays);
  const saveWeekdays = (e) => {
    e.preventDefault();
    setWeekdaysSuccess(true);
    onSaveWeekdays(weekdays);
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
      <Box
        className="flex flex-col"
        sx={{
          minWidth: "350px",
          width: "45%",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            border: `1px solid ${detailsSuccess ? "green" : "#e0e0e0"}`,
            borderRadius: "6px",
            minWidth: "350px",
            width: "100%",
          }}
        >
          <Box className="w-full flex flex-row justify-between" p={1}>
            <Typography variant="subtitle2">Package Details</Typography>
            {detailsSuccess && <CheckCircleIcon color="success" flex={1} />}
          </Box>
          <Divider
            sx={{
              width: "100%",
              bgcolor: detailsSuccess ? "green" : "#e0e0e0",
            }}
          />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveDetails();
              setDetailsSuccess(true);
            }}
            className="w-full"
          >
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
              <Box className="w-full flex flex-col items-start" gap={0.5}>
                <Typography variant="body2">Category</Typography>
                <TextField
                  select
                  required
                  fullWidth
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="-- select --"
                  helperText="The category it belongs to"
                  size="small"
                >
                  <MenuItem value="West Coast Excursions">
                    West Coast Excursions
                  </MenuItem>
                  <MenuItem value="Excursions north-west coast">
                    Excursions North-West Coast
                  </MenuItem>
                  <MenuItem value="East Coast Excursions">
                    East Coast Excursions
                  </MenuItem>
                </TextField>
              </Box>

              <Box className="w-full flex flex-col items-start" gap={0.5}>
                <Typography variant="body2">Package Title</Typography>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={3}
                  value={packTitle}
                  placeholder="Select a category, first"
                  onChange={(e) => {
                    setPackTitle(e.target.value);
                  }}
                  size="small"
                />
              </Box>

              <Box className="w-full flex flex-col items-start" gap={0.5}>
                <Typography variant="body2">Package Name</Typography>
                <TextField
                  fullWidth
                  required
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="Galle & South West Coast"
                  helperText="The name of the package"
                  size="small"
                />
              </Box>

              <Box className="w-full flex flex-col items-start" gap={0.5}>
                <Typography variant="body2">Package Sub Name</Typography>
                <TextField
                  multiline
                  required
                  rows={2}
                  fullWidth
                  value={packSubtitle}
                  onChange={(e) => setPackSubtitle(e.target.value)}
                  helperText="Shown below the package name"
                  placeholder="Wander the city of history"
                  size="small"
                />
              </Box>

              <Box
                className="w-full flex flex-col items-start p-4"
                gap={0.5}
                sx={{ border: "1px solid #ccc", borderRadius: "6px" }}
              >
                <Typography variant="body2">Offer in:</Typography>
                <Box className="w-full flex flex-row flex-wrap justify-between">
                  <FormControlLabel
                    label="One Day"
                    control={<Checkbox />}
                    checked={oneDay}
                    onChange={(e) => {
                      setOneDay(e.target.checked);
                    }}
                  />
                  <FormControlLabel
                    label="Two Days"
                    control={<Checkbox />}
                    checked={twoDays}
                    onChange={(e) => {
                      setTwoDays(e.target.checked);
                    }}
                  />
                  <FormControlLabel
                    label="Three Days"
                    control={<Checkbox />}
                    checked={threeDays}
                    onChange={(e) => {
                      setThreeDays(e.target.checked);
                    }}
                  />
                </Box>
              </Box>

              <Box className="w-full flex flex-col items-start" gap={0.5}>
                <Typography variant="body2">Cover Description</Typography>
                <TextField
                  rows={3}
                  required
                  multiline
                  value={packageCoverDescription}
                  onChange={(e) => setPackCover(e.target.value)}
                  type="text"
                  size="small"
                  helperText="Will be shown in the package listing pages"
                  fullWidth
                  placeholder="Sri Lanka, the pearl of the Indian Ocean, is rich in beautiful sights  ..."
                />
              </Box>

              <Box className="w-full flex flex-col items-start" gap={0.5}>
                <Typography variant="body2">Short Description</Typography>
                <TextField
                  multiline
                  required
                  rows={3}
                  value={packageShortDescription}
                  onChange={(e) => setPackShort(e.target.value)}
                  type="text"
                  size="small"
                  helperText="Will be shown in the package's details page"
                  fullWidth
                  placeholder="Our comprehensive 9-day Sri Lanka tour will show you the highlights of our island, tell you the history ..."
                />
              </Box>

              <Button
                variant="contained"
                type="submit"
                fullWidth
                // onClick={saveDetails}
                // disabled={
                //   !(
                //     categoryName &&
                //     packTitle &&
                //     packageName &&
                //     packSubtitle &&
                //     packageShortDescription &&
                //     packageCoverDescription
                //   )
                // }
                aria-label="save package details"
              >
                Save
              </Button>
            </Box>
          </form>
        </Paper>

        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            border: `1px solid ${pricesSuccess ? "green" : "#e0e0e0"}`,
            borderRadius: "6px",
            minWidth: "350px",
            width: "100%",
            marginTop: "40px",
          }}
        >
          <Box className=" flex flex-col w-full items-start">
            <Box className="w-full flex flex-row justify-between" p={1}>
              <Typography variant="subtitle2">Price Details</Typography>
              {pricesSuccess && <CheckCircleIcon color="success" flex={1} />}
            </Box>
            <Divider
              sx={{
                width: "100%",
                bgcolor: pricesSuccess ? "green" : "primary",
              }}
            />
            <form style={{ width: "100%" }} onSubmit={savePrices}>
              {oneDay && (
                <Box
                  className="w-full flex flex-row justify-between items-center"
                  p={2}
                >
                  <Typography variant="body2">One Day Price:</Typography>
                  <TextField
                    type="number"
                    required
                    value={oneDayPrice}
                    size="small"
                    onChange={(e) => {
                      setOneDayPrice(e.target.value);
                    }}
                  />
                </Box>
              )}
              {twoDays && (
                <Box
                  className="w-full flex flex-row justify-between items-center"
                  p={2}
                >
                  <Typography variant="body2">Two Days Price:</Typography>
                  <TextField
                    type="number"
                    required
                    value={twoDaysPrice}
                    size="small"
                    onChange={(e) => {
                      setTwoDaysPrice(e.target.value);
                    }}
                  />
                </Box>
              )}
              {threeDays && (
                <Box
                  className="w-full flex flex-row justify-between items-center"
                  p={2}
                >
                  <Typography variant="body2">Three Days Price:</Typography>
                  <TextField
                    type="number"
                    required
                    value={threeDaysPrice}
                    size="small"
                    onChange={(e) => {
                      setThreeDaysPrice(e.target.value);
                    }}
                  />
                </Box>
              )}
              <Box className="w-full" p={2}>
                <Button type="submit" variant="contained" fullWidth>
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>

        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            border: `1px solid ${weekdaysSuccess ? "green" : "#e0e0e0"}`,
            borderRadius: "6px",
            minWidth: "350px",
            width: "100%",
            mt: "40px",
          }}
        >
          <Box className="w-full flex flex-row justify-start" gap={2}>
            <Box className=" flex flex-col w-full items-start">
              <Box className="w-full flex flex-row justify-between" p={1}>
                <Typography variant="subtitle2">Available Weekdays</Typography>
                {weekdaysSuccess && (
                  <CheckCircleIcon color="success" flex={1} />
                )}
              </Box>
              <Divider
                sx={{
                  width: "100%",
                  bgcolor: weekdaysSuccess ? "green" : "primary",
                }}
              />
              <Box
                p="8px 16px"
                className="w-full flex flex-row flex-wrap gap-4 justify-center"
              >
                <form style={{ width: "100%" }} onSubmit={saveWeekdays}>
                  {weekdays.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      control={<Checkbox />}
                      label={days[index]}
                      checked={item}
                      onChange={(e) => {
                        var arr = [...weekdays];
                        arr[index] = e.target.checked;
                        setWeekdays(arr);
                      }}
                    />
                  ))}
                  <Box className="w-full" p={2}>
                    <Button type="submit" variant="contained" fullWidth>
                      Save
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          minWidth: "350px",
          width: "45%",
          gap: "40px",
        }}
      >
        <Paper
          flex={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            border: `1px solid ${imagesSuccess ? "green" : "#e0e0e0"}`,
            borderRadius: "6px",
            minWidth: "350px",
            width: "100%",
          }}
        >
          <Box className="w-full flex flex-row justify-between" p={1}>
            <Typography variant="subtitle2">Cover Image</Typography>
            {imagesSuccess && <CheckCircleIcon color="success" flex={1} />}
          </Box>
          <Divider
            sx={{
              width: "100%",
              bgcolor: `${imagesSuccess ? "green" : "primary"}`,
            }}
          />

          <Box
            width="100%"
            p={1}
            gap={1}
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-around",
            }}
          >
            <Box
              // ref={imageRef}
              width="100%"
              p={1}
              gap={1}
              sx={{
                width: "100%",
                overflowX: "hidden",
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "space-around",
              }}
            >
              <Box
                sx={{
                  height: "90px",
                  width: "150px",
                  bgcolor: "grey.100",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  src={
                    packageImage
                      ? packageImage
                      : "../../src/assets/addImage.png"
                  }
                  alt="cover image"
                  sx={{ width: "100%", height: "100%", fit: "cover" }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexFlow: "column nowrap",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  width: "210px",
                  height: "100%",
                  overflowX: "hidden",
                }}
              >
                <CustomDropzone
                  onFileDrop={(selectedFile) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setPackageImage(reader.result);
                    };
                    reader.readAsDataURL(selectedFile);
                  }}
                />
              </Box>
              <Button size="small" color="error" disabled>
                <DeleteIcon
                  size="small"
                  onClick={() => {
                    var thisId = item.at(0);
                    setCoverImage(
                      coverImage.filter((item) => item.at(0) != thisId)
                    );
                  }}
                />
              </Button>
            </Box>
          </Box>

          <Divider
            sx={{
              width: "100%",
              bgcolor: `${imagesSuccess ? "green" : "primary"}`,
            }}
          />
          <Box className="w-full flex flex-row justify-between" p={1}>
            <Typography variant="subtitle2">Package Images</Typography>
            {imagesSuccess && <CheckCircleIcon color="success" flex={1} />}
          </Box>
          <Divider
            sx={{
              width: "100%",
              bgcolor: `${imagesSuccess ? "green" : "primary"}`,
            }}
          />

          <Box minHeight="300px" width="100%">
            <Box
              width="100%"
              height="100%"
              p={1}
              gap={1}
              sx={{
                display: "flex",
                flexFlow: "column nowrap",
                alignItems: "center",
              }}
            >
              {coverImage.map((item) => (
                <Box
                  key={item[0]}
                  // ref={imageRef}
                  width="100%"
                  p={1}
                  gap={1}
                  sx={{
                    width: "100%",
                    overflowX: "hidden",
                    display: "flex",
                    flexFlow: "row nowrap",
                    justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      height: "90px",
                      width: "150px",
                      bgcolor: "grey.100",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={item[1] ? item[1] : "../../src/assets/addImage.png"}
                      alt="cover image"
                      sx={{ width: "100%", height: "100%", fit: "cover" }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexFlow: "column nowrap",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      width: "210px",
                      height: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    <CustomDropzone
                      onFileDrop={(selectedFile) => {
                        // console.log(selectedFile);
                        var thisId = item.at(0);
                        const reader = new FileReader();
                        reader.onload = () => {
                          // Removing the previous file with the same id
                          setCoverImage((prevCoverImage) =>
                            prevCoverImage.filter((item) => item[0] !== thisId)
                          );

                          // Adding the new file
                          setCoverImage((prevCoverImage) => [
                            ...prevCoverImage,
                            [thisId, reader.result],
                          ]);

                          // Sorting the array based on the first element of each subarray
                          setCoverImage((prevCoverImage) =>
                            prevCoverImage.sort((a, b) => a[0] - b[0])
                          );
                        };
                        reader.readAsDataURL(selectedFile);
                      }}
                    />
                  </Box>
                  <Button
                    size="small"
                    color="error"
                    onClick={(event) => {
                      setCoverImage((prevCoverImage) =>
                        prevCoverImage.filter(
                          (itemTe) => itemTe.at(0) != item.at(0)
                        )
                      );
                    }}
                  >
                    <DeleteIcon size="small" />
                  </Button>
                </Box>
              ))}

              <Button
                variant="contained"
                color="primary"
                onClick={(e) => {
                  setCount(count + 1);
                  setCoverImage((prevCoverImage) => [
                    ...prevCoverImage,
                    [count + 1, ""],
                  ]);
                  setCount(count + 1);
                }}
              >
                <AddIcon />
              </Button>
            </Box>
          </Box>

          <Box p={2} width="100%">
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                saveImages();
                setImagesSuccess(true);
              }}
              aria-label="save image details"
              disabled={packageImage == ""}
            >
              Save
            </Button>
          </Box>
        </Paper>

        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="loading-animation" />
          </div>
        ) : (
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              border: `1px solid ${hotelsSuccess ? "green" : "#e0e0e0"}`,
              borderRadius: "6px",
              minWidth: "350px",
              width: "100%",
            }}
          >
            <Box className="w-full flex flex-row justify-start" gap={2}>
              <Box className=" flex flex-col w-full items-start">
                <Box className="w-full flex flex-row justify-between" p={1}>
                  <Typography variant="subtitle2">Hotels</Typography>
                  {hotelsSuccess && (
                    <CheckCircleIcon color="success" flex={1} />
                  )}
                </Box>
                <Divider
                  sx={{
                    width: "100%",
                    bgcolor: hotelsSuccess ? "green" : "primary",
                  }}
                />
                <form style={{ width: "100%" }} onSubmit={saveHotels}>
                  {hotels.map((item, index) => (
                    <Box p="8px 16px" className="w-full" key={index}>
                      <TextField
                        required
                        select
                        fullWidth
                        value={hotels[index]}
                        onChange={(e) => {
                          const prev = [...hotels];
                          prev[index] = e.target.value;
                          setHotels(prev);
                        }}
                        size="small"
                      >
                        {hotelsList.map((hotel) => (
                          <MenuItem key={hotel._id} value={hotel._id}>
                            {hotel.hotelName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  ))}
                  <Box className="w-full flex justify-between" p={2}>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      color="error"
                      onClick={(e) => {
                        var prev = [...hotels];
                        // console.log(prev.length);
                        prev = prev.filter(
                          (previous, index) => index != hotels.length - 1
                        );
                        setHotels(prev);
                      }}
                    >
                      Delete Last
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() =>
                        setHotels((prevHotels) => [...prevHotels, ""])
                      }
                    >
                      Add
                    </Button>
                  </Box>
                  <Box className="w-full" p={2}>
                    <Button type="submit" variant="contained" fullWidth>
                      Save
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Paper>
        )}

        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            border: `1px solid ${servicesSuccess ? "green" : "#e0e0e0"}`,
            borderRadius: "6px",
            minWidth: "350px",
            width: "100%",
          }}
        >
          <Box className="w-full flex flex-row justify-start" gap={2}>
            <Box className=" flex flex-col w-full items-start">
              <Box className="w-full flex flex-row justify-between" p={1}>
                <Typography variant="subtitle2">Services</Typography>
                {servicesSuccess && (
                  <CheckCircleIcon color="success" flex={1} />
                )}
              </Box>
              <Divider
                sx={{
                  width: "100%",
                  bgcolor: servicesSuccess ? "green" : "primary",
                }}
              />

              <form style={{ width: "100%" }} onSubmit={saveServices}>
                {services.map((item, index) => (
                  <Box p="8px 16px" className="w-full" key={index}>
                    <TextField
                      required
                      fullWidth
                      value={services[index]}
                      onChange={(e) => {
                        const prev = [...services];
                        prev[index] = e.target.value;
                        setServices(prev);
                      }}
                      placeholder="Type the service"
                      size="small"
                    />
                  </Box>
                ))}
                <Box className="w-full flex justify-between" p={2}>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={(e) => {
                      var prev = [...services];
                      prev = prev.filter(
                        (previous, index) => index != services.length - 1
                      );
                      setServices(prev);
                    }}
                  >
                    Delete Last
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setServices((prev) => [...prev, ""])}
                  >
                    Add
                  </Button>
                </Box>
                <Box className="w-full" p={2}>
                  <Button type="submit" variant="contained" fullWidth>
                    Save
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
