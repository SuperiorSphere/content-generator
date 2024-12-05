import React, { useState } from "react";
import ElementForm from "./components/ElementForm";
import ContentPreview from "./components/ContentPreview";
import { ContentElement, LessonContent } from "./types/LessonTypes";
import { stripIds } from "./utils/stripIds";
import { Box, Button, Typography } from "@mui/material";
import { Areas } from "./types/Areas";
import Dropdown from "./components/Dropdown";
import { v4 as uuidv4 } from "uuid";

const App: React.FC = () => {
  const [content, setContent] = useState<ContentElement[]>([]);
  const [area, setArea] = useState<Areas>(Areas.ZEN);
  const areaOptions = Object.values(Areas).map((area) => ({
    value: area as string,
    label: area.replace(/_/g, " "),
  }));
  console.log(JSON.stringify({ content }, null, 2));

  const addContentElement = (element: ContentElement) => {
    setContent([...content, element]);
  };

  const removeContentElement = (index: number) => {
    const updatedContent = content.filter((_, i) => i !== index);
    setContent(updatedContent);
  };

  const exportContentAsJson = () => {
    const contentWithoutIds = stripIds(content) as ContentElement[]; // Remove `id` fields
    const lessonContent: LessonContent = { content: contentWithoutIds };
    const json = JSON.stringify(lessonContent, null, 2);
    console.log(json);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lessonContent.json";
    link.click();
  };

  const handleJsonUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        console.log("Upload json", json);
        if (json && Array.isArray(json.content)) {
          const contentWithIds = json.content.map((element: any) => ({
            id: uuidv4(), // Ensure every element has a unique id
            ...element,
          }));
          setContent(contentWithIds as ContentElement[]);
        } else {
          alert("Invalid JSON structure. Make sure it matches LessonContent.");
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Error parsing JSON file. Please check the file structure.");
      }
    };
    reader.readAsText(file);
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
      <Typography
        variant="h2"
        gutterBottom
        sx={{ marginTop: "12px", marginBottom: "16px" }}
      >
        Add Content
      </Typography>
      <ElementForm addContentElement={addContentElement} area={area} />
      <Typography variant="h2" gutterBottom sx={{ marginTop: "20px" }}>
        Preview
      </Typography>
      <ContentPreview
        content={content}
        setContent={setContent}
        removeContentElement={removeContentElement}
      />
      <Box sx={{ display: "flex", gap: 2, marginTop: "16px" }}>
        <Button variant="contained" onClick={exportContentAsJson}>
          Export as JSON
        </Button>
        <Button variant="contained" component="label">
          Upload JSON
          <input
            type="file"
            accept="application/json"
            onChange={handleJsonUpload}
            hidden
          />
        </Button>
      </Box>
    </div>
  );
};

export default App;
