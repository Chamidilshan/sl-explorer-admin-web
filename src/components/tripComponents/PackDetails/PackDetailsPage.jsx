import { DeleteForeverRounded, Filter, Key } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  Stack,
  TextField,
  Typography,
  Container,
  CardMedia,
  Input,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import CustomDropzone from "../../customDropZone";
import ImageIcon from "@mui/icons-material/Image";
import HideImageIcon from "@mui/icons-material/HideImage";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Form, useSubmit } from "react-router-dom";
import { toast } from "react-toastify";

export const PackDetails = ({
  onSaveDetails,
  onSaveImages,
  prevImages,
  prevDetails,
}) => {
  const [basicDetails, setBasicDetails] = useState(prevDetails);
  const [fd, setFd] = useState(false);

  const saveDetails = (e) => {
    e.preventDefault();
    setBasicDetails([
      packageName,
      packSubtitle,
      packageCoverDescription,
      packageShortDescription,
      maximumParticipants,
      packTitle,
    ]);
    setFd(true);
  };

  useEffect(() => {
    if (fd) {
      toast.success("Details Saved..!");
      console.log(basicDetails);
      onSaveDetails(basicDetails);
    }
  }, [basicDetails]);

  const [images, setImages] = useState(prevImages);

  console.log(images);
  const [fi, setFi] = useState(false);

  const saveImages = (e) => {
    e.preventDefault();
    setImages([packageImage, coverImage]);
    toast.success("Images have been saved successfully..!");
    setFi(true);
  };

  useEffect(() => {
    if (fi) {
      console.log(images);
      onSaveImages(images);
    }
  });

  const [packageName, setPackageName] = useState(basicDetails[0]);
  const [packageShortDescription, setPackShort] = useState(basicDetails[3]);
  const [packageCoverDescription, setPackCover] = useState(basicDetails[2]);

  const [packTitle, setPackTitle] = useState(basicDetails[5]);
  const [packSubtitle, setPackSubtitle] = useState(basicDetails[1]);
  const [maximumParticipants, setMaximumParticipants] = useState(
    basicDetails[4]
  );

  const reader = new FileReader();

  const [count, setCount] = useState(1);
  const [packageImage, setPackageImage] = useState(images[0]);
  const [coverImage, setCoverImage] = useState(images[1]);

  // const addCoverImage = (selectedFile) => {
  //   console.log(value);
  //   setCoverImage([...coverImage, selectedFile]);
  // };
  // const changeCoverImage = (e, selectedFile) => {
  //   console.log(value);
  //   // setCoverImage([...coverImage, selectedFile]);
  // };
  // const deleteCoverImage = (e) => {
  //   var value = e.target.value;
  //   console.log(value);
  //   setCoverImage(coverImage.filter((item) => item != value));
  // };

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
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            minWidth: "350px",
            width: "100%",
          }}
        >
          <Typography p={1} variant="subtitle2">
            Package Details
          </Typography>
          <Divider
            sx={{
              width: "100%",
              bgcolor: "primary",
            }}
          />

          <form onSubmit={saveDetails} className="w-full">
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
                <Typography variant="body2">Package Name</Typography>
                <TextField
                  multiline
                  fullWidth
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="Sri Lanka Culture & Nature"
                  size="small"
                />
              </Box>

              <Box className="w-full flex flex-col items-start" gap={0.5}>
                <Typography variant="body2">Package Title</Typography>
                <TextField
                  multiline
                  fullWidth
                  value={packTitle}
                  onChange={(e) => setPackTitle(e.target.value)}
                  placeholder="9 Days"
                  size="small"
                />
              </Box>

              <Box className="w-full flex flex-col items-start" gap={0.5}>
                <Typography variant="body2">Package Subtitle</Typography>
                <TextField
                  multiline
                  fullWidth
                  value={packSubtitle}
                  onChange={(e) => setPackSubtitle(e.target.value)}
                  placeholder="8 Nights"
                  size="small"
                />
              </Box>

              <Box className="w-full flex flex-col items-start" gap={0.5}>
                <Typography variant="body2">Cover Description</Typography>

                <TextField
                  multiline
                  value={packageCoverDescription}
                  onChange={(e) => setPackCover(e.target.value)}
                  minRows={2}
                  type="text"
                  size="small"
                  helperText="Will be shown in the package lists"
                  fullWidth
                  placeholder="Sri Lanka, the pearl of the Indian Ocean, is rich in beautiful sights  ..."
                />
              </Box>

              <Box className="w-full flex flex-col items-start" gap={0.5}>
                <Typography variant="body2">Short Description</Typography>

                <TextField
                  multiline
                  value={packageShortDescription}
                  onChange={(e) => setPackShort(e.target.value)}
                  minRows={3}
                  type="text"
                  size="small"
                  helperText="Will be shown in the package details page"
                  fullWidth
                  placeholder="Our comprehensive 9-day Sri Lanka tour will show you the highlights of our island, tell you the history ..."
                />
              </Box>

              <Box
                className="w-full flex flex-row"
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                gap={0.5}
              >
                <Typography variant="body2">Maximum Participants :</Typography>
                <TextField
                  sx={{ width: "150px" }}
                  type="number"
                  value={maximumParticipants}
                  onChange={(e) => setMaximumParticipants(e.target.value)}
                  placeholder="12"
                  size="small"
                />
              </Box>

              <Button
                variant="contained"
                type="submit"
                fullWidth
                // onClick={saveDetails}
                disabled={
                  !(
                    packageName &&
                    packSubtitle &&
                    packageShortDescription &&
                    packageCoverDescription &&
                    maximumParticipants
                  )
                }
                aria-label="save package details"
              >
                Save
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>

      <Paper
        flex={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          border: "1px solid #e0e0e0",
          borderRadius: "6px",
          minWidth: "350px",
          width: "45%",
        }}
      >
        <Typography p={1} variant="subtitle2">
          Cover Image
        </Typography>
        <Divider
          sx={{
            width: "100%",
            bgcolor: "primary",
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
                  packageImage ? packageImage : "../../src/assets/addImage.png"
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
            bgcolor: "primary",
          }}
        />
        <Typography p={1} variant="subtitle2">
          Package Images
        </Typography>
        <Divider
          sx={{
            width: "100%",
            bgcolor: "primary",
          }}
        />

        <Box minHeight="410px" width="100%">
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
                key={item.at(0)}
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
                      item.at(1) ? item.at(1) : "../../src/assets/addImage.png"
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
                    event.preventDefault();
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
            onClick={saveImages}
            aria-label="save image details"
            disabled={packageImage == ""}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
