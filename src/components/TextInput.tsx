import React from "react";
import { TextField, Box } from "@mui/material";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

const TextInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  placeholder,
  fullWidth = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        label={label}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        variant="outlined"
        fullWidth={fullWidth}
        multiline
      />
    </Box>
  );
};

export default TextInput;
