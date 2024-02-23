import React, { useEffect, useState } from "react";
import PermanentDrawerLeft from "../components/drawer";
import Box from "@mui/material/Box";
import {Button,Checkbox,Dialog,DialogContent,DialogTitle,FormControlLabel,IconButton,Paper,Radio,RadioGroup,Stack,Tab,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TextField,DialogActions,} from "@mui/material";
import FestivalService from "../services/FestivalService";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { imageDb } from "../../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const Festivals = () => {
  const columns = [
    // {id: '_id', name: 'ID'},
    { id: "festivalName", name: "Name" },
    { id: "festivalCoverImage", name: "Cover Image" },
    { id: "festivalDescription", name: "About" },
    { id: "festivalDate", name: "Date" },
    { id: "festivalTitle", name: "Celebrations" },
    { id: "festivalImageLinks", name: "Slide Images" },
    { id: "action", name: "Actions" },
  ];

  const [_id, idChange] = useState(0);
  const [festivalName, festivalNameChange] = useState("");
  const [festivalCoverImage, festivalCoverImageChange] = useState("");
  const [festivalDescription, festivalDescriptionChange] = useState("");
  const [festivalImageLinks, festivalImageLinksChange] = useState("");
  const [festivalDate, festivalDateChange] = useState("");
  const [festivalTitle, festivalTitleChange] = useState("");
  const [open, openChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [imgUrl1, setImgUrl1] = useState([]);
  const [imgUrl2, setImgUrl2] = useState([]);
  const [imgUrl3, setImgUrl3] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [festivalIdToDelete, setFestivalIdToDelete] = useState(null);

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("Add Festivals/Events");

  const handleDelete = (festivalId) => {
    setFestivalIdToDelete(festivalId);
    setDeleteConfirmationOpen(true);
  };

  const cancelDelete = () => {
    setFestivalIdToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await FestivalService.deleteFestival(festivalIdToDelete);
      setFestivals((prevFestivals) =>
        prevFestivals.filter((festival) => festival._id !== festivalIdToDelete)
      );
    } catch (error) {
      console.error("Error deleting festival/event:", error);
      toast.error("Failed to delete festival/event: ", error.message);
    } finally {
      setDeleteConfirmationOpen(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChangeImages = (e, index) => {
    const file = e.target.files[0];
    if (index === 1) {
      setImg1(file);
    } else if (index === 2) {
      setImg2(file);
    } else if (index === 3) {
      setImg3(file);
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (index === 1) {
        setImgUrl1(reader.result);
      } else if (index === 2) {
        setImgUrl2(reader.result);
      } else if (index === 3) {
        setImgUrl3(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClick = async () => {
    if (img) {
      const imgRef = ref(imageDb, `festivalCoverImage/${v4()}`);
      try {
        const snapshot = await uploadBytes(imgRef, img);
        const url = await getDownloadURL(snapshot.ref);
        console.log("Uploaded image URL:", url);
        festivalCoverImageChange(url);
        setImgUrl((data) => [...data, url]);
        return url;
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
    }
  };

  const handleClickForImages = async () => {
    const urls = [];
    if (img1) {
      const imgRef1 = ref(imageDb, `festivalImageLinks/${v4()}`);
      try {
        const snapshot1 = await uploadBytes(imgRef1, img1);
        const url1 = await getDownloadURL(snapshot1.ref);
        urls.push(url1);
      } catch (error) {
        console.error("Error uploading image 1:", error);
        throw error;
      }
    }
    if (img2) {
      const imgRef2 = ref(imageDb, `festivalImageLinks/${v4()}`);
      try {
        const snapshot2 = await uploadBytes(imgRef2, img2);
        const url2 = await getDownloadURL(snapshot2.ref);
        urls.push(url2);
      } catch (error) {
        console.error("Error uploading image 2:", error);
        throw error;
      }
    }
    if (img3) {
      const imgRef3 = ref(imageDb, `festivalImageLinks/${v4()}`);
      try {
        const snapshot3 = await uploadBytes(imgRef3, img3);
        const url3 = await getDownloadURL(snapshot3.ref);
        urls.push(url3);
      } catch (error) {
        console.error("Error uploading image 3:", error);
        throw error;
      }
    }
    return urls;
  };

  const functionAdd = () => {
    setIsEdit(false);
    setTitle("Add Festival/Event");
    openPopUp();
  };

  const handleEdit = async (id) => {
    setIsEdit(true);
    setTitle("Update Festival/Event");
    openPopUp();

    try {
      const festival = await FestivalService.getFestivalById(id);
      if (festival) {
        festivalNameChange(festival.body.festivalName);
        setImg(null);
        idChange(festival.body._id);
        setImgUrl(festival.body.festivalImage);
      }
      {
        console.error("Festival/Event not found");
      }
    } catch (error) {
      console.error("Error fetching festival/event details:", error);
    }
  };

  const closePopUp = () => {
    openChange(false);
  };

  const openPopUp = () => {
    openChange(true);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const imageUrl = await handleClick();
      const imageUrls = await handleClickForImages();
      const newFestival = {
        festivalName,
        festivalCoverImage: imageUrl,
        festivalDate,
        festivalDescription,
        festivalImageLinks: imageUrls,
        festivalTitle,
      };
      if (isEdit) {
        await FestivalService.updateFestival(_id, newFestival);
        fetchFestivals();
      } else {
        await FestivalService.createFestival(newFestival);
        fetchFestivals();
      }
      setLoading(false);
      openChange(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to save Festival/Event: ", error.message);
      console.error("Error:", error);
    }
  };

  const [festivals, setFestivals] = useState([]);

  useEffect(() => {
    fetchFestivals();
  }, []);

  async function fetchFestivals() {
    try {
      const data = await FestivalService.getFestival();
      console.log("Festivals data:", data);
      setFestivals(data);
    } catch (error) {
      console.log("Error fetching Festivals:", error);
    }
  }

  return (
    <>
      <div>
        <Box sx={{ display: "flex" }}>
          <h1 className="text-cyan-900">Festivals & Events</h1>
        </Box>

        <Paper sx={{ margin: "0.1%", pl: "2%", pr: "2%" }}>
          <div className="flex justify-end">
            <Button onClick={functionAdd} variant="contained" color="primary">
              Add New Festival/Event
            </Button>
          </div>
          <div style={{ margin: "0.1%" }}>
            <TableContainer>
              <Table style={{ border: "1px solid #D4D4D4", color: "#262626" }}>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#D4D4D4" }}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{
                          color: "#262626",
                          fontSize: "18px",
                          fontWeight: 600,
                        }}
                      >
                        {column.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {festivals
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((festival) => (
                      <TableRow key={festival._id}>
                        {/* <TableCell>{festival._id}</TableCell> */}
                        <TableCell style={{ fontSize: "16px" }}>
                          {festival.festivalName}
                        </TableCell>
                        <TableCell style={{ fontSize: "16px", width: "100px" }}>
                          <img
                            src={festival.festivalCoverImage}
                            alt={festival.festivalCoverImage}
                            style={{ maxWidth: "100px" }}
                          />
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: "16px",
                            minWidth: "350px",
                            maxWidth: "600px",
                            wordWrap: "break-word", 
                            whiteSpace: "normal",
                          }}
                        >
                          {festival.festivalDescription}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: "16px",
                            width: "100px",
                            overflowWrap: "break-word",
                          }}
                        >
                          {festival.festivalDate}
                        </TableCell>
                        <TableCell
                          style={{
                            fontSize: "16px",
                            width: "300px",
                            overflowWrap: "break-word",
                          }}
                        >
                          {festival.festivalTitle}
                        </TableCell>
                        <TableCell style={{ fontSize: "16px", width: "100px" }}>
                          {festival.festivalImageLinks.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Slide ${index + 1}`}
                              style={{ maxWidth: "100px", margin: "5px 0" }}
                            />
                          ))}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={(e) => {
                              handleEdit(festival._id);
                            }}
                            color="primary"
                            sx={{ margin: "5px" }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            onClick={(e) => {
                              handleDelete(festival._id);
                            }}
                            style={{ backgroundColor: "#D97706" }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[2, 5, 10, 20]}
              rowsPerPage={rowsPerPage}
              page={page}
              count={festivals.length}
              component={"div"}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowPerPageChange}
            ></TablePagination>
          </div>
        </Paper>

        <Dialog open={open} onClose={closePopUp} fullWidth maxWidth="sm">
          <DialogTitle>
            <span>{title}</span>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} margin={2}>
                <TextField
                  value={festivalName}
                  required
                  onChange={(e) => {
                    festivalNameChange(e.target.value);
                  }}
                  variant="outlined"
                  label="Festival/Event Name"
                ></TextField>
                <input type="file" onChange={handleFileChange} />
                {img !== ""
                  ? imgUrl && <img src={imgUrl} alt="Selected" />
                  : null}
                <br />
                <TextField
                  value={festivalDate}
                  onChange={(e) => {
                    festivalDateChange(e.target.value);
                  }}
                  variant="outlined"
                  label="Festival/Event Date"
                ></TextField>
                <TextField
                  value={festivalDescription}
                  onChange={(e) => {
                    festivalDescriptionChange(e.target.value);
                  }}
                  variant="outlined"
                  label="About Festival/Event"
                ></TextField>
                <TextField
                  value={festivalTitle}
                  onChange={(e) => {
                    festivalTitleChange(e.target.value);
                  }}
                  variant="outlined"
                  label="Celebration Method"
                ></TextField>
                <input
                  type="file"
                  onChange={(e) => handleFileChangeImages(e, 1)}
                />
                {img1 !== ""
                  ? imgUrl1 && <img src={imgUrl1} alt="Selected" />
                  : null}
                <br />
                <input
                  type="file"
                  onChange={(e) => handleFileChangeImages(e, 2)}
                />
                {img2 !== ""
                  ? imgUrl2 && <img src={imgUrl2} alt="Selected" />
                  : null}
                <br />
                <input
                  type="file"
                  onChange={(e) => handleFileChangeImages(e, 3)}
                />
                {img3 !== ""
                  ? imgUrl3 && <img src={imgUrl3} alt="Selected" />
                  : null}
                <br />
                <Button type="submit" variant="contained" disabled={loading}>
                  Save
                </Button>
              </Stack>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteConfirmationOpen} onClose={cancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this Festival/Event?
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete}>Cancel</Button>
            <Button onClick={confirmDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
