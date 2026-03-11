import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function AuthGate({
  isAuthenticated,
  isFirstVisit,
  setPassword,
  login,
  children,
}) {
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return children;

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setError("");
    if (pw.length < 4) { setError("Password must be at least 4 characters."); return; }
    if (pw !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    await setPassword(pw);
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await login(pw);
    setLoading(false);
    if (!ok) setError("Incorrect password. Try again.");
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      borderRadius: 1.5,
      "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
      "&:hover fieldset": { borderColor: "rgba(255,255,255,0.35)" },
      "&.Mui-focused fieldset": { borderColor: "#4a53ff", borderWidth: 2 },
    },
    "& .MuiInputLabel-root": { color: "#888" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#4a53ff" },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        bgcolor: "#0a0a0a",
      }}
    >
      {/* Left panel — logo + brand */}
      <Box
        sx={{
          flex: { xs: "none", md: "0 0 45%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f0f0f0",
          py: { xs: 5, md: 0 },
          px: 4,
          minHeight: { xs: 200, md: "100vh" },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blueprint grid texture */}
        <Box
          sx={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage:
              "linear-gradient(#111 1px,transparent 1px),linear-gradient(90deg,#111 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <Box sx={{ position: "relative", textAlign: "center" }}>
          <Box
            component="img"
            src="/src/assets/logo.png"
            alt="Underdog Runners"
            onError={(e) => { e.target.style.display = "none"; }}
            sx={{ height: { xs: 80, md: 120 }, display: "block", mx: "auto", mb: 3 }}
          />
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: "#0a0a0a", letterSpacing: "-1px", lineHeight: 1.1, mb: 1 }}
          >
            BAJA XING
            <br />
            2026
          </Typography>
          <Box sx={{ width: 40, height: 3, bgcolor: "#4a53ff", mx: "auto", my: 1.5, borderRadius: 2 }} />
          <Typography
            variant="body2"
            sx={{ color: "#555", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.72rem" }}
          >
            Planeacion Underdog Runners
          </Typography>
        </Box>
      </Box>

      {/* Right panel — form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, sm: 6 },
          py: 6,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 360 }}>
          <Typography variant="h5" sx={{ color: "#fff", mb: 0.5 }}>
            {isFirstVisit ? "Create Password" : "Welcome back."}
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
            {isFirstVisit
              ? "Set a password to secure the app."
              : "Enter your password to unlock."}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, bgcolor: "rgba(239,68,68,0.12)", color: "#f87171", border: "1px solid rgba(239,68,68,0.25)", "& .MuiAlert-icon": { color: "#f87171" } }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={isFirstVisit ? handleSetPassword : handleLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField label="Password" type="password" value={pw}
              onChange={(e) => setPw(e.target.value)}
              fullWidth autoFocus size="small" sx={inputSx} />
            {isFirstVisit && (
              <TextField label="Confirm Password" type="password" value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                fullWidth size="small" sx={inputSx} />
            )}
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                mt: 0.5,
                py: 1.2,
                bgcolor: "#4a53ff",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                borderRadius: 1.5,
                "&:hover": { bgcolor: "#3a43ef" },
                "&:disabled": { bgcolor: "#333", color: "#666" },
              }}
            >
              {loading ? "..." : isFirstVisit ? "Create Password" : "Unlock →"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
