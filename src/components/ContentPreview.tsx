import React from "react";
import "./ContentPreview.css";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { ContentElement } from "../types/LessonTypes";
import { Box, Typography } from "@mui/material";
import ImageWithFallback from "./ImageWithFallback";
import { isEmpty } from "lodash";

const DEV_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/superiorsphere-prod.appspot.com/o/images%2F";

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
                        padding: "10px",
                        marginBottom: "10px",
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                      }}
                    >
                      {(() => {
                        if ("title" in item) {
                          return <p>Title: {item.title}</p>;
                        } else if ("subtitle" in item) {
                          return <p>Subtitle: {item.subtitle}</p>;
                        } else if ("text" in item) {
                          return <p>Text: {item.text}</p>;
                        } else if ("image" in item) {
                          const finalUrl =
                            DEV_IMAGE_URL +
                            encodeURIComponent(item.image) +
                            "?alt=media";
                          return (
                            <Box>
                              <ImageWithFallback imageUrl={finalUrl} />
                              {!isEmpty(item.caption) && (
                                <Typography sx={{ textAlign: "right" }}>
                                  {item.caption}
                                </Typography>
                              )}
                            </Box>
                          );
                        }
                        return <p>Other Content</p>;
                      })()}
                      <button onClick={() => removeContentElement(index)}>
                        Remove
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
