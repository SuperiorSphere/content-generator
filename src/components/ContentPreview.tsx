import React from "react";
import "./ContentPreview.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  Book,
  ContentElement,
  TextListElementTypeEnum,
} from "../types/LessonTypes";
import { Box, Typography } from "@mui/material";
import ImageWithFallback from "./ImageWithFallback";
import { getListCharacter } from "../utils/listUtils";

const DEV_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/superiorsphere-dev.appspot.com/o/images%2F";

interface Props {
  content: ContentElement[];
  setContent: (newContent: ContentElement[]) => void;
  removeContentElement: (index: number) => void;
}

const ContentPreview: React.FC<Props> = ({
  content,
  setContent,
  removeContentElement,
}) => {
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const reorderedContent = Array.from(content);
    const [movedElement] = reorderedContent.splice(source.index, 1);
    reorderedContent.splice(destination.index, 0, movedElement);

    setContent(reorderedContent);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="content-list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: content.length > 0 ? "#f9f9f9" : "#eee",
              padding: "20px",
              //minHeight: "150px",
              border: "1px dashed #ccc",
            }}
          >
            {content.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666" }}>
                No content. Add some elements!
              </p>
            ) : (
              content.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        //position: "relative", // For positioning the remove button
                        padding: "10px",
                        marginBottom: "10px",
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        display: "flex",
                        gap: "12px",
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        {(() => {
                          if ("title" in item) {
                            return (
                              <Typography variant="h2">{item.title}</Typography>
                            );
                          } else if ("subtitle" in item) {
                            return (
                              <Typography variant="h4">
                                {item.subtitle}
                              </Typography>
                            );
                          } else if ("text" in item) {
                            return (
                              <Typography className="pMedium">
                                {item.text}
                              </Typography>
                            );
                          } else if ("image" in item) {
                            const finalUrl =
                              DEV_IMAGE_URL +
                              encodeURIComponent(item.image) +
                              "?alt=media";
                            return (
                              <Box sx={{ padding: "8px", paddingTop: "20px" }}>
                                <ImageWithFallback
                                  imageUrl={finalUrl}
                                  caption={item.caption}
                                />
                              </Box>
                            );
                          } else if ("textList" in item) {
                            return (
                              <Box sx={{ padding: "8px", paddingTop: "20px" }}>
                                {item.textList.map((elem, pos) => {
                                  return (
                                    <Typography>{`${getListCharacter(
                                      item.type as TextListElementTypeEnum,
                                      pos + 1
                                    )} ${elem.text}`}</Typography>
                                  );
                                })}
                              </Box>
                            );
                          } else if ("curiosity" in item) {
                            return (
                              <Box
                                sx={{
                                  padding: "8px",
                                  backgroundColor: "#C2950C",
                                }}
                              >
                                <Typography variant="h4">Curiosity</Typography>
                                <Typography className="pMedium">
                                  {item.curiosity}
                                </Typography>
                              </Box>
                            );
                          } else if ("important" in item) {
                            return (
                              <Box
                                sx={{
                                  padding: "8px",
                                  backgroundColor: "#146173",
                                }}
                              >
                                <Typography variant="h4">Important</Typography>
                                <Typography className="pMedium">
                                  {item.important}
                                </Typography>
                              </Box>
                            );
                          } else if ("books" in item) {
                            return (
                              <Box>
                                <Typography variant="h4">Books</Typography>
                                {item.books.map((book: Book, bookIndex) => (
                                  <Typography key={bookIndex}>
                                    <strong>{book.title}</strong> by{" "}
                                    {book.author}
                                  </Typography>
                                ))}
                              </Box>
                            );
                          } else if (
                            "books" in item &&
                            Array.isArray(item.books)
                          ) {
                            return (
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h4">Books</Typography>
                                {item.books.map(
                                  (book: Book, bookIndex: number) => (
                                    <Typography key={bookIndex}>
                                      <strong>{book.title}</strong> by{" "}
                                      {book.author}
                                    </Typography>
                                  )
                                )}
                              </Box>
                            );
                          } else if ("author" in item) {
                            const {
                              fullName,
                              url,
                              description,
                              secondaryUrl,
                              photoUrl,
                              instagram,
                              linkedin,
                              facebook,
                              twitter,
                              blog,
                            } = item.author;
                            return (
                              <Box>
                                <Typography variant="h4">Author</Typography>
                                <Typography>
                                  <strong>Name:</strong> {fullName}
                                </Typography>
                                <Typography>
                                  <strong>Description:</strong> {description}
                                </Typography>
                                {url && (
                                  <Typography>
                                    <strong>URL:</strong>{" "}
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {url}
                                    </a>
                                  </Typography>
                                )}
                                {secondaryUrl && (
                                  <Typography>
                                    <strong>Secondary URL:</strong>{" "}
                                    <a
                                      href={secondaryUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {secondaryUrl}
                                    </a>
                                  </Typography>
                                )}
                                {photoUrl && (
                                  <Typography>
                                    <strong>Photo URL:</strong>{" "}
                                    <a
                                      href={photoUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {photoUrl}
                                    </a>
                                  </Typography>
                                )}
                                {instagram && (
                                  <Typography>
                                    <strong>Instagram:</strong>{" "}
                                    <a
                                      href={instagram}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {instagram}
                                    </a>
                                  </Typography>
                                )}
                                {linkedin && (
                                  <Typography>
                                    <strong>LinkedIn:</strong>{" "}
                                    <a
                                      href={linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {linkedin}
                                    </a>
                                  </Typography>
                                )}
                                {facebook && (
                                  <Typography>
                                    <strong>Facebook:</strong>{" "}
                                    <a
                                      href={facebook}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {facebook}
                                    </a>
                                  </Typography>
                                )}
                                {twitter && (
                                  <Typography>
                                    <strong>Twitter:</strong>{" "}
                                    <a
                                      href={twitter}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {twitter}
                                    </a>
                                  </Typography>
                                )}
                                {blog && (
                                  <Typography>
                                    <strong>Blog:</strong>{" "}
                                    <a
                                      href={blog}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {blog}
                                    </a>
                                  </Typography>
                                )}
                              </Box>
                            );
                          }
                          return <p>Other Content</p>;
                        })()}
                      </Box>
                      <button
                        onClick={() => removeContentElement(index)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "black",
                          fontSize: "24px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ContentPreview;
