import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const fmt = (n) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function SettlementList({ settlements, members }) {
  const memberName = (id) => members.find((m) => m.id === id)?.name ?? "Unknown";

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0a0a0a" }}>
          Settlement
        </Typography>
        {settlements.length > 0 && (
          <Chip
            label={`${settlements.length} transfer${settlements.length !== 1 ? "s" : ""} needed`}
            size="small"
            sx={{ bgcolor: "#fef3c7", color: "#92400e", fontWeight: 700, border: "1px solid #fde68a" }}
          />
        )}
      </Box>

      {settlements.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{ p: 2, borderRadius: 2, borderColor: "#bbf7d0", bgcolor: "#f0fdf4", display: "flex", alignItems: "center", gap: 1.5 }}
        >
          <CheckCircleOutlineIcon sx={{ color: "#16a34a", fontSize: 20 }} />
          <Typography variant="body2" fontWeight={600} color="#15803d">
            All settled up — no transfers needed.
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {settlements.map((s, i) => (
            <Paper
              key={i}
              variant="outlined"
              sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1.5, borderRadius: 2, borderColor: "#fde68a", bgcolor: "#fffbeb" }}
            >
              <Typography variant="body2" fontWeight={700} sx={{ color: "#0a0a0a", minWidth: 80 }}>
                {memberName(s.from)}
              </Typography>
              <ArrowForwardIcon sx={{ color: "#9ca3af", fontSize: 16, flexShrink: 0 }} />
              <Typography variant="body2" fontWeight={700} sx={{ color: "#0a0a0a", flex: 1 }}>
                {memberName(s.to)}
              </Typography>
              <Chip
                label={`$${fmt(s.amount)}`}
                size="small"
                sx={{ bgcolor: "#111111", color: "#fff", fontWeight: 700, borderRadius: 4 }}
              />
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
