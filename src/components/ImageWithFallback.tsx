import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

interface Props {
  imageUrl: string;
  caption?: string;
}

const ImageWithFallback: React.FC<Props> = ({ imageUrl, caption }) => {
  const [isImageError, setIsImageError] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0); // Counter to force a fresh request

  const handleRefresh = () => {
    setIsImageError(false); // Reset the error state
    setRefreshCounter((prev) => prev + 1); // Increment counter to force a fresh fetch
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100px",
          backgroundColor: isImageError ? "#e0e0e0" : "transparent",
        }}
      >
        {!isImageError ? (
          <img
            src={`${imageUrl}&refresh=${refreshCounter}`} // Append refreshCounter to URL
            alt=""
            onError={() => setIsImageError(true)}
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              display: "block",
              objectFit: "contain",
            }}
          />
        ) : (
          <Typography variant="caption" color="textSecondary">
            Image not available
          </Typography>
        )}
      </Box>
      <Typography variant="body1">
        <b>Path:</b> {imageUrl}
      </Typography>
      {caption && (
        <Typography sx={{ textAlign: "right" }}>
          <b>Caption:</b> {caption}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleRefresh}
        sx={{ marginTop: 2 }}
      >
        Refresh Image
      </Button>
    </Box>
  );
};

export default ImageWithFallback;