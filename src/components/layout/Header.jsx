import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LockIcon from "@mui/icons-material/Lock";

export default function Header({ onLogout }) {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: "#0a0a0a", borderBottom: "1px solid #1f1f1f" }}>
      <Toolbar sx={{ gap: 2, minHeight: { xs: 56, sm: 64 } }}>
        <Box
          component="img"
          src="/src/assets/logo.png"
          alt="Underdog Runners"
          onError={(e) => { e.target.style.display = "none"; }}
          sx={{ height: 36, filter: "brightness(0) invert(1)", flexShrink: 0 }}
        />

        {/* Blue accent bar */}
        <Box sx={{ width: 3, height: 28, bgcolor: "#4a53ff", borderRadius: 2, flexShrink: 0 }} />

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 800, color: "#fff", letterSpacing: "-0.2px", lineHeight: 1.2 }}
          >
            BAJA XING 2026
          </Typography>
          <Typography variant="caption" sx={{ color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", fontSize: "0.65rem" }}>
            Underdog Runners
          </Typography>
        </Box>

        {onLogout && (
          <Tooltip title="Lock app">
            <IconButton
              onClick={onLogout}
              size="small"
              sx={{ color: "#555", "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.08)" } }}
            >
              <LockIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
}
