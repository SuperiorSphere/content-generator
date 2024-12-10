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
import { Areas } from "../types/Areas";
import { isEmpty } from "lodash";
import TextForm from "./elements/TextForm";
import TextListForm from "./elements/TextListForm";
import ImageForm from "./elements/ImageForm";
import BooksForm from "./elements/BooksForm";
import AuthorForm from "./elements/AuthorForm";

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
          <TextForm
            value={data.text}
            onChange={(value) => setData({ text: value || "" })}
          />
        )}

        {type === "textList" && (
          <div>
            <TextListForm
              data={data}
              currentItem={currentItem}
              setCurrentItem={setCurrentItem}
              handleAddListItem={handleAddListItem}
              handleRemoveListItem={handleRemoveListItem}
              listType={listType}
              setListType={setListType}
            />
          </div>
        )}

        {type === "title" && (
          <TextForm
            value={data.text}
            onChange={(value) => setData({ title: value || "" })}
          />
        )}

        {type === "subtitle" && (
          <TextForm
            value={data.text}
            onChange={(value) => setData({ subtitle: value || "" })}
          />
        )}

        {type === "curiosity" && (
          <TextForm
            value={data.text}
            onChange={(value) => setData({ curiosity: value || "" })}
          />
        )}

        {type === "important" && (
          <TextForm
            value={data.text}
            onChange={(value) => setData({ important: value || "" })}
          />
        )}

        {type === "image" && (
          <ImageForm
            data={data}
            setData={setData}
            area={area}
            extension={extension}
            setExtension={setExtension}
          />
        )}
        {type === "books" && (
          <BooksForm
            data={data}
            currentBook={currentBook}
            setCurrentBook={setCurrentBook}
            handleAddBook={handleAddBook}
            handleRemoveBook={handleRemoveBook}
          />
        )}

        {type === "author" && <AuthorForm data={data} setData={setData} />}
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
