import React from "react";
import { Box, Typography } from "@mui/material";
import TextInput from "../TextInput";

interface Props {
  data: any;
  setData: (value: any) => void;
}

const AuthorForm: React.FC<Props> = ({ data, setData }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Author Information
      </Typography>
      <TextInput
        label="Full Name"
        value={data.author?.fullName || ""}
        onChange={(value) =>
          setData((prevData: any) => ({
            ...prevData,
            author: { ...prevData.author, fullName: value },
          }))
        }
        placeholder="Enter full name"
        fullWidth
        required
      />
      {(!data.author?.fullName || data.author?.fullName.trim() === "") && (
        <Typography color="error" variant="caption">
          Full Name is required.
        </Typography>
      )}
      <TextInput
        label="Description"
        value={data.author?.description || ""}
        onChange={(value) =>
          setData((prevData: any) => ({
            ...prevData,
            author: { ...prevData.author, description: value },
          }))
        }
        placeholder="Enter description"
        fullWidth
        required
      />
      {(!data.author?.description ||
        data.author?.description.trim() === "") && (
        <Typography color="error" variant="caption">
          Description is required.
        </Typography>
      )}
      <TextInput
        label="URL"
        value={data.author?.url || ""}
        onChange={(value) =>
          setData((prevData: any) => ({
            ...prevData,
            author: { ...prevData.author, url: value },
          }))
        }
        placeholder="Enter URL"
        fullWidth
      />
      <TextInput
        label="Secondary URL"
        value={data.author?.secondaryUrl || ""}
        onChange={(value) =>
          setData((prevData: any) => ({
            ...prevData,
            author: { ...prevData.author, secondaryUrl: value },
          }))
        }
        placeholder="Enter secondary URL"
        fullWidth
      />
      <TextInput
        label="Photo URL"
        value={data.author?.photoUrl || ""}
        onChange={(value) =>
          setData((prevData: any) => ({
            ...prevData,
            author: { ...prevData.author, photoUrl: value },
          }))
        }
        placeholder="Enter photo URL"
        fullWidth
      />
    </Box>
  );
};

export default AuthorForm;
