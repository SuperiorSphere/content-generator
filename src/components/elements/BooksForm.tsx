import React from "react";
import { Box, Button, Typography } from "@mui/material";
import TextInput from "../TextInput";
import { Book } from "../../types/LessonTypes";

interface Props {
  data: any;
  currentBook: Book;
  setCurrentBook: (value: React.SetStateAction<Book>) => void;
  handleAddBook: () => void;
  handleRemoveBook: (index: number) => void;
}

const BooksForm: React.FC<Props> = ({
  data,
  currentBook,
  setCurrentBook,
  handleAddBook,
  handleRemoveBook,
}) => {
  return (
    <Box>
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
          onChange={(value) => setCurrentBook({ ...currentBook, title: value })}
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
        <Button variant="contained" color="primary" onClick={handleAddBook}>
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
    </Box>
  );
};

export default BooksForm;
