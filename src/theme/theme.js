import { createTheme } from "@mui/material/styles";

export const PRIMARY = "#175191";

export function createAppTheme() {
  return createTheme({
    palette: {
      primary: { main: PRIMARY, contrastText: "#ffffff" },
      background: { default: "#ffffff" }
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily:
        'Pretendard, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif',
      h2: { fontWeight: 800, letterSpacing: -0.5 },
      h4: { fontWeight: 800, letterSpacing: -0.4 },
      h6: { fontWeight: 800 }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: "none", fontWeight: 800 }
        }
      }
    }
  });
}
