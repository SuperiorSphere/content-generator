import { PaletteColor } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gold: PaletteColor;
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
    };
  }
  interface PaletteOptions {
    gold?: PaletteColor;
    neutral?: {
      50?: string;
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      500?: string;
    };
  }
  interface TypographyVariants {
    pLarge: React.CSSProperties;
    pMedium: React.CSSProperties;
    pSmall: React.CSSProperties;
    buttonSmallBold: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    pLarge?: React.CSSProperties;
    pMedium?: React.CSSProperties;
    pSmall?: React.CSSProperties;
    buttonSmallBold?: React.CSSProperties;
  }

}