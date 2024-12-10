import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ElementForm from "./components/ElementForm";
import ContentPreview from "./components/ContentPreview";
import { ContentElement, LessonContent } from "./types/LessonTypes";
import { stripIds } from "./utils/stripIds";
import { Box, Button, Typography, Drawer, TextField } from "@mui/material";
import { Areas } from "./types/Areas";
import Dropdown from "./components/Dropdown";
import { v4 as uuidv4 } from "uuid";

const COOKIE_NAME = "content";

const App: React.FC = () => {
  const [content, setContent] = useState<ContentElement[]>([]);
  const [area, setArea] = useState<Areas>(Areas.ZEN);
  const [lessonTitle, setLessonTitle] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  console.log(JSON.stringify(content, null, 2));

  const areaOptions = Object.values(Areas).map((area) => ({
    value: area as string,
    label: area.replace(/_/g, " "),
  }));

  // Save content to cookies
  const saveContentToCookies = (content: ContentElement[]) => {
    Cookies.set(COOKIE_NAME, JSON.stringify(content), {
      expires: 7,
      path: "/",
      sameSite: "Lax",
    });
  };

  // Load content from cookies
  const loadContentFromCookies = () => {
    const savedContent = Cookies.get(COOKIE_NAME);
    return savedContent ? JSON.parse(savedContent) : [];
  };

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
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${lessonTitle}.json`;
    link.click();
  };

  const handleJsonUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
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

  const clearContent = () => {
    setContent([]); // Clears all content by setting it to an empty array
    Cookies.remove(COOKIE_NAME);
  };

  // Load content on first render
  useEffect(() => {
    const savedContent = loadContentFromCookies();
    console.log("Saved content from cookies", savedContent);
    setContent(savedContent);
  }, []);

  // Save content to cookies whenever it changes
  useEffect(() => {
    //console.log("Saving content", content);
    saveContentToCookies(content);
  }, [content]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Main Content Area */}
      <Box sx={{ flex: 3, padding: "16px" }}>
        <Typography variant="h1" gutterBottom>
          Lesson/Rule Generator
        </Typography>
        <Typography variant="h2" gutterBottom>
          Area
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <Dropdown
            value={area}
            onChange={(area: string) => setArea(area as Areas)}
            options={areaOptions}
            label="Select Area"
            width="200px"
          />
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Lesson Title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="INTRODUCTION_TO_STOICISM"
            />
          </Box>
        </Box>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ marginTop: "12px", marginBottom: "16px" }}
        >
          Add Content
        </Typography>
        <ElementForm
          addContentElement={addContentElement}
          area={area}
          editingIndex={editingIndex}
        />
        <Typography variant="h2" gutterBottom sx={{ marginTop: "20px" }}>
          Preview
        </Typography>
        <ContentPreview
          content={content}
          setContent={setContent}
          removeContentElement={removeContentElement}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          area={area}
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
          <Button
            variant="outlined"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Close Sidebar" : "View JSON"}
          </Button>
          <Button variant="contained" color="error" onClick={clearContent}>
            Clear All Content
          </Button>
        </Box>
      </Box>

      {/* Sidebar for JSON Preview */}
      <Drawer
        anchor="right"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <Box sx={{ width: 400, padding: "16px", overflow: "auto" }}>
          <Typography variant="h4" gutterBottom>
            JSON Lesson
          </Typography>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "16px",
              borderRadius: "8px",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(
              { content: content.map(({ id, ...rest }) => rest) }, // Remove `id` field
              null,
              2
            )}
          </pre>
          <Typography variant="h4" gutterBottom>
            JSON Debug
          </Typography>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "16px",
              borderRadius: "8px",
              overflowX: "auto",
            }}
          >
            {JSON.stringify({ content }, null, 2)}
          </pre>
        </Box>
      </Drawer>
    </Box>
  );
};

export default App;
