import React from "react";
import { Box } from "@mui/material";
import TextInput from "../TextInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const TextForm: React.FC<Props> = ({ value, onChange }) => {
  return (
    <Box>
      <div>
        <TextInput
          label="Text"
          value={value}
          onChange={onChange}
          placeholder="Enter some text"
          fullWidth
        />
      </div>
    </Box>
  );
};

export default TextForm;
