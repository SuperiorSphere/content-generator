import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";

interface Props {
  imageUrl: string;
}

const ImageWithFallback: React.FC<Props> = ({ imageUrl }) => {
  const [isImageError, setIsImageError] = useState(false);

  return (
    <Box>
      <Paper
        variant="outlined"
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
            src={imageUrl}
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
      </Paper>
      <Typography variant="body1">Image: {imageUrl}</Typography>
    </Box>
  );
};

export default ImageWithFallback;
