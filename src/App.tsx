import React, { useState } from "react";
import ElementForm from "./components/ElementForm";
import ContentPreview from "./components/ContentPreview";
import { ContentElement } from "./types/Types";
import { stripIds } from "./utils/stripIds";

const App: React.FC = () => {
  const [content, setContent] = useState<ContentElement[]>([]);

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
      <h1>Lesson/Rule Generator</h1>
      <h2>Add Content</h2>
      <ElementForm addContentElement={addContentElement} />
      <h2>Preview</h2>
      <ContentPreview
        content={content}
        setContent={setContent}
        removeContentElement={removeContentElement}
      />
      <button onClick={exportContentAsJson}>Export as JSON</button>
    </div>
  );
};

export default App;
