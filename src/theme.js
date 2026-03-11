import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary:    { main: "#111111", contrastText: "#ffffff" },
    secondary:  { main: "#4a53ff", contrastText: "#ffffff" },
    error:      { main: "#ef4444" },
    success:    { main: "#16a34a" },
    warning:    { main: "#f59e0b" },
    background: {
      default: "#ffffff",
      paper:   "#ffffff",
    },
    text: {
      primary:   "#0a0a0a",
      secondary: "#6b7280",
    },
    divider: "#e5e7eb",
  },
  typography: {
    fontFamily: '"Roboto", "-apple-system", "BlinkMacSystemFont", sans-serif',
    h4: { fontWeight: 800, letterSpacing: "-0.5px" },
    h5: { fontWeight: 800, letterSpacing: "-0.3px" },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button: { fontWeight: 700, letterSpacing: "0.02em" },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          borderRadius: 6,
          padding: "8px 20px",
        },
        containedPrimary: {
          background: "#111111",
          "&:hover": { background: "#000000" },
        },
        containedSecondary: {
          background: "#4a53ff",
          "&:hover": { background: "#3a43ef" },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.9rem",
          color: "#6b7280",
          "&.Mui-selected": { color: "#111111", fontWeight: 700 },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: { backgroundColor: "#4a53ff", height: 3, borderRadius: 2 },
      },
    },
    MuiChip: {
      styleOverrides: { root: { fontWeight: 600, borderRadius: 6 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #e5e7eb",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { boxShadow: "none" },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundColor: "#0a0a0a" },
      },
    },
  },
});

export default theme;
