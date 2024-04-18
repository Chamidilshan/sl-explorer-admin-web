import React, { useEffect, useState } from "react";
import PermanentDrawerLeft from "../components/drawer";
import Box from "@mui/material/Box";
import {Button,Checkbox,Dialog,DialogContent,DialogTitle,FormControlLabel,IconButton,Paper,Radio,RadioGroup,Stack,Tab,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TextField,DialogActions,} from "@mui/material";
import A_ZService from "../services/SLA_ZService";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { imageDb } from "../../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";


export const SL_A_Zs = () => {
    const columns = [
        // {id: '_id', name: 'ID'},
        { id: "mainTopic", name: "Tittle" },
        { id: "topicCoverImage", name: "Cover Image" },
        { id: "description", name: "Description" },
        { id: "action", name: "Actions" },
      ];
    
      const [_id, idChange] = useState(0);
      const [mainTopic, mainTopicChange] = useState("");
      const [topicCoverImage, topicCoverImageChange] = useState("");
      const [description, descriptionChange] = useState("");
      const [open, openChange] = useState(false);
      const [loading, setLoading] = useState(false);
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
    
      const [img, setImg] = useState("");
      const [imgUrl, setImgUrl] = useState([]);
      const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
      const [a_zIdToDelete, setA_ZIdToDelete] = useState(null);
    
      const [isEdit, setIsEdit] = useState(false);
      const [title, setTitle] = useState("Add a Topic");
    
      const handleDelete = (a_zId) => {
        setA_ZIdToDelete(a_zId);
        setDeleteConfirmationOpen(true);
      };
    
      const cancelDelete = () => {
        setA_ZIdToDelete(null);
        setDeleteConfirmationOpen(false);
      };
    
      const confirmDelete = async () => {
        try {
          await A_ZService.deleteA_Z(a_zIdToDelete);
          setA_Zs((prevA_Zs) =>
            prevA_Zs.filter((a_z) => a_z._id !== a_zIdToDelete)
          );
        } catch (error) {
          console.error("Error deleting a topic:", error);
          toast.error("Failed to delete a topic: ", error.message);
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
    
      const handleClick = async () => {
        if (img) {
          const imgRef = ref(imageDb, `topicCoverImage/${v4()}`);
          try {
            const snapshot = await uploadBytes(imgRef, img);
            const url = await getDownloadURL(snapshot.ref);
            console.log("Uploaded image URL:", url);
            topicCoverImageChange(url);
            setImgUrl((data) => [...data, url]);
            return url;
          } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
          }
        }
      };
    
      const functionAdd = () => {
        setIsEdit(false);
        setTitle("Add a Topic");
        openPopUp();
      };
    
      const handleEdit = async (id) => {
        setIsEdit(true);
        setTitle("Update a Topic");
        openPopUp();
    
        try {
          const a_z = await A_ZService.getA_ZById(id);
          if (a_z) {
            mainTopicChange(a_z.body.mainTopic);
            setImg(null);
            idChange(a_z.body._id);
            setImgUrl(a_z.body.topicCoverImage);
            descriptionChange(a_z.body.description);
          }
          {
            console.error("Topic not found");
          }
        } catch (error) {
          console.error("Error fetching Sri Lanka A-Z details:", error);
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
          const newA_Z = {
            mainTopic,
            topicCoverImage: imageUrl,
            description,
          };
          if (isEdit) {
            await A_ZService.updateA_Z(_id, newA_Z);
            fetchA_Zs();
          } else {
            await A_ZService.createA_Z(newA_Z);
            fetchA_Zs();
          }
          setLoading(false);
          openChange(false);
        } catch (error) {
          setLoading(false);
          toast.error("Failed to save topic: ", error.message);
          console.error("Error:", error);
        }
      };
    
      const [a_zs, setA_Zs] = useState([]);
    
      useEffect(() => {
        fetchA_Zs();
      }, []);
    
      async function fetchA_Zs() {
        try {
          const data = await A_ZService.getA_Z();
          console.log("SL A-Z data:", data);
          setA_Zs(data);
        } catch (error) {
          console.log("Error fetching Sri Lanka A-Z:", error);
        }
      }
    
      return (
        <>
          <div>
            <Box sx={{ display: "flex" }}>
              <h1 className="text-cyan-900">Sri Lanka A-Z</h1>
            </Box>
    
            <Paper sx={{ margin: "0.1%", pl: "2%", pr: "2%" }}>
              <div className="flex justify-end">
                <Button onClick={functionAdd} variant="contained" color="primary">
                  Add New Topic
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
                      {a_zs
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((a_z) => (
                          <TableRow key={a_z._id}>
                            {/* <TableCell>{a_z._id}</TableCell> */}
                            <TableCell style={{ fontSize: "16px" }}>
                              {a_z.mainTopic}
                            </TableCell>
                            <TableCell style={{ fontSize: "16px", width: "100px" }}>
                              <img
                                src={a_z.topicCoverImage}
                                alt={a_z.mainTopic}
                                style={{ maxWidth: "100px" }}
                              />
                            </TableCell>
                            <TableCell
                              style={{
                                fontSize: "16px",
                                minWidth: "350px",
                                maxWidth: "600px",
                                wordWrap: "break-word", 
                                whiteSpace: "pre-line",
                              }}
                            >
                              {a_z.description}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                onClick={(e) => {
                                  handleEdit(a_z._id);
                                }}
                                color="primary"
                                sx={{ margin: "5px" }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                onClick={(e) => {
                                  handleDelete(a_z._id);
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
                  count={a_zs.length}
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
                      value={mainTopic}
                      required
                      onChange={(e) => {
                        mainTopicChange(e.target.value);
                      }}
                      variant="outlined"
                      label="Title"
                    ></TextField>
                    <input type="file" onChange={handleFileChange}/> 
            {img !== '' ? (imgUrl && <img src={imgUrl} alt="Selected" />) : null} 
                <br/>

                    <TextField
                      value={description}
                      onChange={(e) => {
                        descriptionChange(e.target.value);
                      }}
                      variant="outlined"
                      label="Description"
                      multiline
                      rows={20}
                      InputProps={{style:{whiteSpace:'pre-wrap'},}}
                      inputProps={{
                        style: { whiteSpace: 'pre-wrap' },
                      }}
                    ></TextField>
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
                Are you sure you want to delete this title?
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