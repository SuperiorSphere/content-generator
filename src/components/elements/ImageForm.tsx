import React from "react";
import { Box, Typography } from "@mui/material";
import TextInput from "../TextInput";
import Dropdown from "../Dropdown";
import { isEmpty } from "lodash";
import { Areas } from "../../types/Areas";

interface Props {
  data: any;
  setData: (value: any) => void;
  area: Areas;
  extension: string;
  setExtension: (value: React.SetStateAction<string>) => void;
}

const ImageForm: React.FC<Props> = ({
  data,
  setData,
  area,
  extension,
  setExtension,
}) => {
  return (
    <Box>
      <TextInput
        label="Image (Set the lesson name)"
        value={data.text}
        onChange={(value) =>
          setData((prevData: any) => ({
            ...prevData,
            key: value,
            image: `${area.toLowerCase()}/${value}.${extension}`,
          }))
        }
        placeholder="Lesson name in upper case  ej: FOUNDATIONS_OF_STOICISM"
        fullWidth
        required
      />
      <TextInput
        label="Caption"
        value={data.text}
        onChange={(value) =>
          setData((prevData: any) => ({
            ...prevData,
            caption: value,
          }))
        }
        placeholder="Caption for the image"
        fullWidth
      />
      <Dropdown
        label="File Extension"
        value={extension}
        onChange={(value) => {
          setExtension(value);
          setData((prevData: any) => {
            return {
              ...prevData,
              image: `${area.toLowerCase()}/${prevData.key || ""}.${value}`,
            };
          });
        }}
        options={[
          { label: "JPG", value: "jpg" },
          { label: "PNG", value: "png" },
          { label: "WEBP", value: "webp" },
        ]}
        width="300px"
      />
      <Box sx={{ marginTop: "20px" }}>
        <Typography>Path: {data?.image}</Typography>
        {!isEmpty(data?.caption) && (
          <Typography>Caption: {data?.caption}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ImageForm;
