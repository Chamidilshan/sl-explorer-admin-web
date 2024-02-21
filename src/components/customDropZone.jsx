import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CustomDropzone = ({ onFileDrop, fileId }) => {
  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    onFileDrop(selectedFile, fileId);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Paper
      variant="outlined"
      gap={1}
      sx={{
        pt: "12px",
        textAlign: "center",
        cursor: "pointer",
        border: "2px dashed",
        borderColor: "primary.main",
        height: "100%",
        width: "100%",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon color="primary" sx={{ fontSize: 30 }} />
      <Typography variant="body2" color="primary.main">
        Drag & Drop or Click
      </Typography>
    </Paper>
  );
};

export default CustomDropzone;
