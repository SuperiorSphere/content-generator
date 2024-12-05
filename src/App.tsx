import React, { useState } from "react";
import ElementForm from "./components/ElementForm";
import ContentPreview from "./components/ContentPreview";
import { ContentElement } from "./types/LessonTypes";
import { stripIds } from "./utils/stripIds";
import { Button, Typography } from "@mui/material";
import { Areas } from "./types/Areas";
import Dropdown from "./components/Dropdown";

const App: React.FC = () => {
  const [content, setContent] = useState<ContentElement[]>([]);
  const [area, setArea] = useState<Areas>(Areas.ZEN);
  const areaOptions = Object.values(Areas).map((area) => ({
    value: area as string,
    label: area.replace(/_/g, " "), // Convert "TAOISM" to "Taoism" if needed
  }));

  const addContentElement = (element: ContentElement) => {
    setContent([...content, element]);
  };

  const removeContentElement = (index: number) => {
    const updatedContent = content.filter((_, i) => i !== index);
    setContent(updatedContent);
  };

  const exportContentAsJson = () => {
    const contentWithoutIds = stripIds(content); // Remove `id` fields
    const json = JSON.stringify(contentWithoutIds, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lessonContent.json";
    link.click();
  };

  return (
    <div className="parent">
      <Typography variant="h1" gutterBottom>
        Lesson/Rule Generator
      </Typography>
      <Typography variant="h2" gutterBottom>
        Area
      </Typography>
      <Dropdown
        value={area}
        onChange={(area: string) => setArea(area as Areas)}
        options={areaOptions}
        label="Select Area"
        width="400px"
      />
      <Typography variant="h2" gutterBottom sx={{ marginTop: "12px" }}>
        Add Content
      </Typography>
      <ElementForm addContentElement={addContentElement} />
      <Typography variant="h2" gutterBottom sx={{ marginTop: "20px" }}>
        Preview
      </Typography>
      <ContentPreview
        content={content}
        setContent={setContent}
        removeContentElement={removeContentElement}
      />
      <Button onClick={exportContentAsJson}>Export as JSON</Button>
    </div>
  );
};

export default App;
