import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#FFFFFF", // --background
    },
    primary: {
      main: "#225A89", // --primary
    },
    secondary: {
      main: "#012A4A", // --secondary
    },
    success: {
      main: "#67B879", // --success
    },
    warning: {
      main: "#D97354", // --warning
    },
    error: {
      main: "#FF1A56", // --error500
      light: "#FF80A1", // --error300
      dark: "#E6003C", // --error600
    },
    text: {
      primary: "#1B1C20", // --neutralBlack
      secondary: "#B5BFC6", // --neutral300
    },
    gold: {
      main: "#FBBC04",
      light: "",
      dark: "",
      contrastText: "",
    },
    neutral: {
      50: "#EFF2F9", // --neutral50
      100: "#E4EBF1", // --neutral100
      200: "#C8D1D3", // --neutral200
      300: "#B5BFC6", // --neutral300
      400: "#6E7F8D", // --neutral400
      500: "#6E8CA0", // --neutral500
    },
  },
  typography: {
    fontFamily:
      "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    h1: {
      fontFamily: "Montserrat",
      fontSize: "32px",
      fontWeight: 700,
      color: "#000000",
      letterSpacing: "-0.333px",
      lineHeight: "normal",
    },
    h2: {
      fontFamily: "Montserrat",
      fontSize: "24px",
      fontWeight: 700,
      color: "#000000",
      letterSpacing: "-0.333px",
      lineHeight: "normal",
    },
    h3: {
      fontFamily: "Montserrat",
      fontSize: "20px",
      fontWeight: 700,
      color: "#000000",
      letterSpacing: "-0.333px",
      lineHeight: "normal",
    },
    h4: {
      fontFamily: "Montserrat",
      fontSize: "18px",
      fontWeight: 700,
      color: "#000000",
      letterSpacing: "-0.333px",
      lineHeight: "normal",
    },
    pLarge: {
      fontFamily: "Montserrat",
      fontSize: "18px",
      fontWeight: 500,
      color: "#000000",
      letterSpacing: "-0.333px",
      lineHeight: "normal",
    },
    pMedium: {
      fontFamily: "'Zilla Slab'",
      fontSize: "16px",
      fontWeight: 500,
      color: "#000000",
      letterSpacing: "-0.333px",
      lineHeight: "normal",
    },
    pSmall: {
      fontFamily: "'Zilla Slab'",
      fontSize: "14px",
      fontWeight: 500,
      color: "#000000",
      letterSpacing: "-0.333px",
      lineHeight: "normal",
    },
    buttonSmallBold: {
      fontFamily: "Montserrat",
      fontSize: "14px",
      fontWeight: 700,
      color: "#000000",
      letterSpacing: "-0.333px",
      lineHeight: "normal",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Prevent uppercase transformation
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;
