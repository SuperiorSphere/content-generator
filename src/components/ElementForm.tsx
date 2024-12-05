import React, { useState } from "react";
import { ContentElement, TextListElementType, ListEntry } from "../types/Types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  addContentElement: (element: ContentElement) => void;
}

// Define valid content types
type ContentType =
  | "text"
  | "textList"
  | "title"
  | "subtitle"
  | "image"
  | "curiosity"
  | "important"
  | "books"
  | "author";

const ElementForm: React.FC<Props> = ({ addContentElement }) => {
  const [type, setType] = useState<ContentType>("text");
  const [data, setData] = useState<any>({});

  const handleAddElement = () => {
    const element: ContentElement = { id: uuidv4(), ...data };
    addContentElement(element);
    setData({});
  };

  return (
    <div>
      <select
        value={type}
        onChange={(e) => {
          setType(e.target.value as ContentType);
          setData({});
        }}
      >
        <option value="text">Text</option>
        <option value="textList">Text List</option>
        <option value="title">Title</option>
        <option value="subtitle">Subtitle</option>
        <option value="image">Image</option>
        <option value="curiosity">Curiosity</option>
        <option value="important">Important</option>
        <option value="books">Books</option>
        <option value="author">Author</option>
      </select>

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

      <button onClick={handleAddElement}>Add Element</button>
    </div>
  );
};

export default ElementForm;
