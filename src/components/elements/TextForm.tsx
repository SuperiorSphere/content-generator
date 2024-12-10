import React from "react";
import { Box } from "@mui/material";
import TextInput from "../TextInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const TextForm: React.FC<Props> = ({ value, onChange, label="Text" }) => {
  return (
    <Box>
      <div>
        <TextInput
          label={label}
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
