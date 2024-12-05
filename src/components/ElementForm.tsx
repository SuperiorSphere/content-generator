import React, { useState } from "react";
import {
  ContentElement,
  TextListElementTypeEnum,
  ListEntry,
  ContentType,
  Book,
} from "../types/LessonTypes";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "./Dropdown";
import { Box, Button, Typography } from "@mui/material";
import TextInput from "./TextInput";
import { getListCharacter } from "../utils/listUtils";
import { Areas } from "../types/Areas";
import { isEmpty } from "lodash";

interface Props {
  addContentElement: (element: ContentElement) => void;
  area: Areas;
}

const ElementForm: React.FC<Props> = ({ addContentElement, area }) => {
  const [type, setType] = useState<ContentType>("text");
  const [data, setData] = useState<any>({});
  const [currentItem, setCurrentItem] = useState<string>("");
  const [extension, setExtension] = useState<string>("jpg");
  const [currentBook, setCurrentBook] = useState<Book>({
    title: "",
    author: "",
  });
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
  const [listType, setListType] = useState<TextListElementTypeEnum>(
    TextListElementTypeEnum.DASH
  );

  const handleAddElement = () => {
    const element: ContentElement = { id: uuidv4(), ...data };
    addContentElement(element);
    setData({});
    setCurrentItem("");
    setCurrentBook({
      title: "",
      author: "",
    });
    setExtension("jpg");
  };

  const handleAddListItem = () => {
    if (currentItem.trim() === "") return;
    setData((prevData: any) => ({
      ...prevData,
      type: listType,
      textList: [
        ...(prevData.textList || []),

        { id: uuidv4(), text: currentItem.trim() },
      ],
    }));
    setCurrentItem("");
  };

  const handleRemoveListItem = (id: string) => {
    setData((prevData: any) => ({
      ...prevData,
      textList: prevData.textList.filter((item: ListEntry) => item.id !== id),
    }));
  };

  const handleAddBook = () => {
    if (!currentBook.title || !currentBook.author) return;
    setData((prevData: any) => ({
      ...prevData,
      books: [...(prevData.books || []), { ...currentBook }],
    }));
    setCurrentBook({ title: "", author: "" });
  };

  const handleRemoveBook = (index: number) => {
    setData((prevData: any) => ({
      ...prevData,
      books: prevData.books.filter((_: Book, i: number) => i !== index),
    }));
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
      <Box sx={{ marginTop: "20px" }}>
        {type === "text" && (
          <div>
            <TextInput
              label="Text"
              value={data.text}
              onChange={(value) => setData({ text: value || "" })}
              placeholder="Enter some text"
              fullWidth
            />
          </div>
        )}

        {type === "textList" && (
          <div>
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
                  onChange={(value) =>
                    setListType(value as TextListElementTypeEnum)
                  }
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
          </div>
        )}

        {type === "title" && (
          <div>
            <TextInput
              label="Title"
              value={data.text}
              onChange={(value) => setData({ title: value || "" })}
              placeholder="Enter some text"
              fullWidth
            />
          </div>
        )}

        {type === "subtitle" && (
          <div>
            <TextInput
              label="Subtitle"
              value={data.text}
              onChange={(value) => setData({ subtitle: value || "" })}
              placeholder="Enter some text"
              fullWidth
            />
          </div>
        )}

        {type === "curiosity" && (
          <div>
            <TextInput
              label="Curiosity"
              value={data.text}
              onChange={(value) => setData({ curiosity: value || "" })}
              placeholder="Enter some text"
              fullWidth
            />
          </div>
        )}

        {type === "important" && (
          <div>
            <TextInput
              label="Important"
              value={data.text}
              onChange={(value) => setData({ important: value || "" })}
              placeholder="Enter some text"
              fullWidth
            />
          </div>
        )}

        {type === "image" && (
          <Box sx={{ marginBottom: "16px" }}>
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
                    image: `${area.toLowerCase()}/${
                      prevData.key || ""
                    }.${value}`,
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
        )}
        {type === "books" && (
          <div>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Add Books
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                marginBottom: 2,
                alignItems: "center",
              }}
            >
              <TextInput
                label="Book Title"
                value={currentBook.title}
                onChange={(value) =>
                  setCurrentBook({ ...currentBook, title: value })
                }
                placeholder="Enter book title"
                fullWidth
              />
              <TextInput
                label="Author"
                value={currentBook.author}
                onChange={(value) =>
                  setCurrentBook({ ...currentBook, author: value })
                }
                placeholder="Enter author name"
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddBook}
              >
                Add
              </Button>
            </Box>
            <Box>
              {data.books?.map((book: Book, index: number) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 1,
                  }}
                >
                  <Typography>
                    {book.title} by {book.author}
                  </Typography>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => handleRemoveBook(index)}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
            </Box>
          </div>
        )}

        {type === "author" && (
          <div>
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
            {(!data.author?.fullName ||
              data.author?.fullName.trim() === "") && (
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
            {/* Add other optional fields like Instagram, LinkedIn, Facebook, etc., as before */}
          </div>
        )}
      </Box>

      <Button
        variant="outlined"
        onClick={handleAddElement}
        disabled={isEmpty(data) || Object.values(data).every((value) => !value)}
      >
        Add {type}
      </Button>
    </div>
  );
};

export default ElementForm;
