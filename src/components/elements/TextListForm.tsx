import React from "react";
import { Box, Button, Typography } from "@mui/material";
import TextInput from "../TextInput";
import { ListEntry, TextListElementTypeEnum } from "../../types/LessonTypes";
import { getListCharacter } from "../../utils/listUtils";
import Dropdown from "../Dropdown";

interface Props {
  data: any;
  currentItem: string;
  setCurrentItem: (value: React.SetStateAction<string>) => void;
  handleAddListItem: () => void;
  handleRemoveListItem: (id: string) => void;
  listType: TextListElementTypeEnum;
  setListType: (value: React.SetStateAction<TextListElementTypeEnum>) => void;
}

const TextListForm: React.FC<Props> = ({
  data,
  currentItem,
  setCurrentItem,
  handleAddListItem,
  handleRemoveListItem,
  listType,
  setListType,
}) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        List Items
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          marginBottom: 2,
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1, alignItems: "center", marginTop: 2 }}>
          <TextInput
            label="Add Item"
            value={currentItem}
            onChange={(value) => setCurrentItem(value)}
            placeholder="Enter list item"
            fullWidth
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddListItem}
          >
            Add
          </Button>
        </Box>
        <Box>
          <Dropdown
            value={listType}
            onChange={(value) => setListType(value as TextListElementTypeEnum)}
            options={[
              { label: "Dash", value: TextListElementTypeEnum.DASH },
              { label: "Point", value: TextListElementTypeEnum.POINT },
              { label: "Number", value: TextListElementTypeEnum.NUMBER },
            ]}
            label="List type"
            width="300px"
          />
        </Box>
      </Box>

      <Box>
        {data.textList?.map((item: ListEntry, pos: number) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 1,
            }}
          >
            <Typography>{`${getListCharacter(listType, pos + 1)} ${
              item.text
            }`}</Typography>
            <Button
              variant="text"
              color="error"
              onClick={() => handleRemoveListItem(item.id)}
            >
              Remove
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TextListForm;
