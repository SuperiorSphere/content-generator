import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  SelectChangeEvent,
} from "@mui/material";

interface DropdownOption {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  label: string;
  width?: string | number;
}

const Dropdown: React.FC<Props> = ({ value, onChange, options, label, width = "300px" }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          width,
        }}
      >
        <InputLabel id="dropdown-label">{label}</InputLabel>
        <Select
          labelId="dropdown-label"
          value={value}
          onChange={handleChange}
          label={label} // Ensures the label appears properly
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;