import React, { useState } from "react";
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
import { Box, Button, Typography } from "@mui/material";
import ImageWithFallback from "./ImageWithFallback";
import { getListCharacter } from "../utils/listUtils";
import TextForm from "./elements/TextForm";
import ImageForm from "./elements/ImageForm";
import { Areas } from "../types/Areas";
import AuthorForm from "./elements/AuthorForm";
import BooksForm from "./elements/BooksForm";
import TextListForm from "./elements/TextListForm";

const DEV_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/superiorsphere-dev.appspot.com/o/images%2F";

interface Props {
  content: ContentElement[];
  setContent: (newContent: ContentElement[]) => void;
  removeContentElement: (index: number) => void;
  editingIndex: number | null;
  setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
  area: Areas;
}

const ContentPreview: React.FC<Props> = ({
  content,
  setContent,
  removeContentElement,
  editingIndex,
  setEditingIndex,
  area,
}) => {
  const [tempData, setTempData] = useState<any>({});
  const [currentItem, setCurrentItem] = useState<string>("");
  const [listType, setListType] = useState<TextListElementTypeEnum>(
    TextListElementTypeEnum.DASH
  );

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setTempData(content[index]); // Load current data into temporary state
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      const { currentBook, ...cleanedData } = tempData; // Remove currentBook
      const updatedContent = [...content];
      updatedContent[editingIndex] = {
        id: content[editingIndex].id,
        ...cleanedData,
      };
      setContent(updatedContent);
      setEditingIndex(null); // Exit editing mode
      setTempData({}); // Clear tempData
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null); // Discard changes and exit editing mode
    setTempData({});
  };

  const handleAddListItem = () => {
    if (!currentItem) return;
    setTempData((prev: any) => ({
      ...prev,
      textList: [
        ...(prev.textList || []),
        { id: Date.now().toString(), text: currentItem },
      ],
    }));
    setCurrentItem("");
  };

  const handleRemoveListItem = (id: string) => {
    setTempData((prev: any) => ({
      ...prev,
      textList: prev.textList.filter((item: any) => item.id !== id),
    }));
  };

  const handleListTypeChange = (newType: TextListElementTypeEnum) => {
    setTempData((prev: any) => ({
      ...prev,
      type: newType,
    }));
  };

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
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                  isDragDisabled={editingIndex !== null}
                >
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
                            if (editingIndex === index) {
                              return (
                                <Box>
                                  <TextForm
                                    value={tempData.title}
                                    onChange={(value) =>
                                      setTempData({ title: value || "" })
                                    }
                                    label="Title"
                                  />

                                  {editingIndex !== null && (
                                    <Button
                                      onClick={() => saveEdit()}
                                      style={{ marginRight: "8px" }}
                                      variant="contained"
                                    >
                                      Save
                                    </Button>
                                  )}
                                  {editingIndex !== null && (
                                    <Button
                                      onClick={() => cancelEdit()}
                                      style={{
                                        marginRight: "8px",
                                        backgroundColor: "red",
                                      }}
                                      variant="contained"
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                </Box>
                              );
                            }
                            return (
                              <Typography variant="h2">{item.title}</Typography>
                            );
                          } else if ("subtitle" in item) {
                            if (editingIndex === index) {
                              return (
                                <Box>
                                  <TextForm
                                    value={tempData.subtitle}
                                    onChange={(value) =>
                                      setTempData({ subtitle: value || "" })
                                    }
                                    label="Subtitle"
                                  />

                                  {editingIndex !== null && (
                                    <Button
                                      onClick={() => saveEdit()}
                                      style={{ marginRight: "8px" }}
                                      variant="contained"
                                    >
                                      Save
                                    </Button>
                                  )}
                                  {editingIndex !== null && (
                                    <Button
                                      onClick={() => cancelEdit()}
                                      style={{
                                        marginRight: "8px",
                                        backgroundColor: "red",
                                      }}
                                      variant="contained"
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                </Box>
                              );
                            }
                            return (
                              <Typography variant="h4">
                                {item.subtitle}
                              </Typography>
                            );
                          } else if ("text" in item) {
                            if (editingIndex === index) {
                              return (
                                <Box>
                                  <TextForm
                                    value={tempData.text}
                                    onChange={(value) =>
                                      setTempData({ text: value || "" })
                                    }
                                    label="Text"
                                  />

                                  {editingIndex !== null && (
                                    <Button
                                      onClick={() => saveEdit()}
                                      style={{ marginRight: "8px" }}
                                      variant="contained"
                                    >
                                      Save
                                    </Button>
                                  )}
                                  {editingIndex !== null && (
                                    <Button
                                      onClick={() => cancelEdit()}
                                      style={{
                                        marginRight: "8px",
                                        backgroundColor: "red",
                                      }}
                                      variant="contained"
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                </Box>
                              );
                            }
                            return (
                              <Typography className="pMedium">
                                {item.text}
                              </Typography>
                            );
                          } else if ("image" in item) {
                            if (editingIndex === index) {
                              return (
                                <Box>
                                  <ImageForm
                                    data={tempData}
                                    setData={setTempData}
                                    area={tempData.area || area} // Pass the selected area or default to current area
                                    extension={tempData.extension || "jpg"} // Default to jpg if not set
                                    setExtension={(value) =>
                                      setTempData((prevData: any) => ({
                                        ...prevData,
                                        extension: value,
                                      }))
                                    }
                                  />

                                  <Button
                                    onClick={() => saveEdit()}
                                    style={{ marginRight: "8px" }}
                                    variant="contained"
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    onClick={() => cancelEdit()}
                                    style={{
                                      marginRight: "8px",
                                      backgroundColor: "red",
                                    }}
                                    variant="contained"
                                  >
                                    Cancel
                                  </Button>
                                </Box>
                              );
                            }

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
                            if (editingIndex === index) {
                              return (
                                <Box>
                                  <TextListForm
                                    data={tempData}
                                    currentItem={currentItem}
                                    setCurrentItem={setCurrentItem}
                                    handleAddListItem={handleAddListItem}
                                    handleRemoveListItem={handleRemoveListItem}
                                    listType={listType}
                                    setListType={(value) => {
                                      const newType =
                                        typeof value === "function"
                                          ? value(tempData.type)
                                          : value;
                                      setTempData((prev: any) => ({
                                        ...prev,
                                        type: newType,
                                      }));
                                    }}
                                  />
                                  <Button
                                    onClick={saveEdit}
                                    variant="contained"
                                    style={{ marginRight: "8px" }}
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    onClick={cancelEdit}
                                    variant="contained"
                                    style={{ backgroundColor: "red" }}
                                  >
                                    Cancel
                                  </Button>
                                </Box>
                              );
                            }
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
                            if (editingIndex === index) {
                              return (
                                <Box>
                                  <TextForm
                                    value={tempData.curiosity}
                                    onChange={(value) =>
                                      setTempData({ curiosity: value || "" })
                                    }
                                    label="Curiosity"
                                  />

                                  {editingIndex !== null && (
                                    <Button
                                      onClick={() => saveEdit()}
                                      style={{ marginRight: "8px" }}
                                      variant="contained"
                                    >
                                      Save
                                    </Button>
                                  )}
                                  {editingIndex !== null && (
                                    <Button
                                      onClick={() => cancelEdit()}
                                      style={{
                                        marginRight: "8px",
                                        backgroundColor: "red",
                                      }}
                                      variant="contained"
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                </Box>
                              );
                            }
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
                            if (editingIndex === index) {
                              return (
                                <Box>
                                  <TextForm
                                    value={tempData.important}
                                    onChange={(value) =>
                                      setTempData({ important: value || "" })
                                    }
                                    label="Important"
                                  />

                                  {editingIndex !== null && (
                                    <Button
                                      onClick={() => saveEdit()}
                                      style={{ marginRight: "8px" }}
                                      variant="contained"
                                    >
                                      Save
                                    </Button>
                                  )}
                                  {editingIndex !== null && (
                                    <Button
                                      onClick={() => cancelEdit()}
                                      style={{
                                        marginRight: "8px",
                                        backgroundColor: "red",
                                      }}
                                      variant="contained"
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                </Box>
                              );
                            }
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
                            if (editingIndex === index) {
                              return (
                                <Box>
                                  <BooksForm
                                    data={tempData}
                                    currentBook={
                                      tempData.currentBook || {
                                        title: "",
                                        author: "",
                                      }
                                    }
                                    setCurrentBook={(value) =>
                                      setTempData((prevData: any) => ({
                                        ...prevData,
                                        currentBook: value,
                                      }))
                                    }
                                    handleAddBook={() => {
                                      if (
                                        !tempData.currentBook?.title ||
                                        !tempData.currentBook?.author
                                      )
                                        return;

                                      setTempData((prevData: any) => ({
                                        ...prevData,
                                        books: [
                                          ...(prevData.books || []),
                                          { ...prevData.currentBook },
                                        ],
                                        currentBook: { title: "", author: "" },
                                      }));
                                    }}
                                    handleRemoveBook={(bookIndex) =>
                                      setTempData((prevData: any) => ({
                                        ...prevData,
                                        books: prevData.books.filter(
                                          (_: any, i: number) => i !== bookIndex
                                        ),
                                      }))
                                    }
                                  />

                                  <Button
                                    onClick={() => saveEdit()}
                                    style={{ marginRight: "8px" }}
                                    variant="contained"
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    onClick={() => cancelEdit()}
                                    style={{
                                      marginRight: "8px",
                                      backgroundColor: "red",
                                    }}
                                    variant="contained"
                                  >
                                    Cancel
                                  </Button>
                                </Box>
                              );
                            }
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
                          } else if ("author" in item) {
                            if (editingIndex === index) {
                              return (
                                <Box>
                                  <AuthorForm
                                    data={tempData}
                                    setData={setTempData}
                                  />

                                  <Button
                                    onClick={() => saveEdit()}
                                    style={{ marginRight: "8px" }}
                                    variant="contained"
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    onClick={() => cancelEdit()}
                                    style={{
                                      marginRight: "8px",
                                      backgroundColor: "red",
                                    }}
                                    variant="contained"
                                  >
                                    Cancel
                                  </Button>
                                </Box>
                              );
                            }
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
                      {editingIndex === null && (
                        <Button
                          onClick={() => startEditing(index)}
                          style={{ marginRight: "8px" }}
                        >
                          Edit
                        </Button>
                      )}
                      {editingIndex !== index && editingIndex === null && (
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
                      )}
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
