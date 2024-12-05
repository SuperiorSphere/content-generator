import React, { useState } from "react";
import { ContentElement, TextListElementType, ListEntry, ContentType } from "../types/LessonTypes";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "./Dropdown";
import { Button } from "@mui/material";

interface Props {
  addContentElement: (element: ContentElement) => void;
}

const ElementForm: React.FC<Props> = ({ addContentElement }) => {
  const [type, setType] = useState<ContentType>("text");
  const [data, setData] = useState<any>({});
  const typeOptions = [
    { value: "text", label: "Text" },
    { value: "textList", label: "Text List" },
    { value: "title", label: "Title" },
    { value: "subtitle", label: "Subtitle" },
    { value: "image", label: "Image" },
    { value: "curiosity", label: "Curiosity" },
    { value: "important", label: "Important" },
    { value: "books", label: "Books" },
    { value: "author", label: "Author" },
  ];

  const handleAddElement = () => {
    const element: ContentElement = { id: uuidv4(), ...data };
    addContentElement(element);
    setData({});
  };

  return (
    <div>
      <Dropdown
        value={type}
        onChange={(value) => setType(value as ContentType)}
        options={typeOptions}
        label="Select Content Type"
        width="400px"
      />

      {type === "text" && (
        <div>
          <label>Text:</label>
          <input
            type="text"
            value={data.text || ""}
            onChange={(e) => setData({ text: e.target.value })}
          />
        </div>
      )}

      {type === "textList" && (
        <div>
          <label>Type:</label>
          <select
            value={data.type || TextListElementType.DASH}
            onChange={(e) =>
              setData({ ...data, type: e.target.value as TextListElementType })
            }
            className="dropdonw"
          >
            <option value={TextListElementType.DASH}>Dash</option>
            <option value={TextListElementType.POINT}>Point</option>
            <option value={TextListElementType.NUMBER}>Number</option>
          </select>
          <label>List Items:</label>
          <textarea
            value={
              data.textList?.map((item: ListEntry) => item.text).join(", ") ||
              ""
            }
            onChange={(e) =>
              setData({
                ...data,
                textList: e.target.value.split(",").map((item) => ({
                  id: uuidv4(),
                  text: item.trim(),
                })),
              })
            }
          />
        </div>
      )}

      {type === "title" && (
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={data.title || ""}
            onChange={(e) => setData({ title: e.target.value })}
          />
        </div>
      )}

      {type === "subtitle" && (
        <div>
          <label>Subtitle:</label>
          <input
            type="text"
            value={data.subtitle || ""}
            onChange={(e) => setData({ subtitle: e.target.value })}
          />
        </div>
      )}

      {type === "image" && (
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={data.image || ""}
            onChange={(e) => setData({ image: e.target.value })}
          />
          <label>Caption:</label>
          <input
            type="text"
            value={data.caption || ""}
            onChange={(e) => setData({ ...data, caption: e.target.value })}
          />
        </div>
      )}

      {/* Add similar handling for curiosity, important, books, and author */}

      <Button onClick={handleAddElement}>Add Element</Button>
    </div>
  );
};

export default ElementForm;
