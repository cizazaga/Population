import { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import CardContent from "@mui/material/CardContent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChecklistItem from "./ChecklistItem";

export default function ChecklistGroup({ title, subtitle, items, onToggle, onRemove }) {
  const [collapsed, setCollapsed] = useState(false);
  const checked = items.filter((i) => i.checked).length;
  const total = items.length;
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
  const allDone = total > 0 && checked === total;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        borderColor: allDone ? "#bbf7d0" : "#e5e7eb",
        transition: "border-color 0.2s",
      }}
    >
      <Box
        component="button"
        onClick={() => setCollapsed((c) => !c)}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          px: 2,
          py: 1.5,
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 2,
          borderBottom: collapsed ? "none" : "1px solid #f3f4f6",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
            <Typography variant="body1" fontWeight={700} sx={{ color: "#0a0a0a" }}>{title}</Typography>
            {subtitle && (
              <Typography variant="caption" sx={{ color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.65rem" }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <LinearProgress
              variant="determinate"
              value={pct}
              sx={{
                flexGrow: 1,
                height: 4,
                borderRadius: 2,
                bgcolor: "#f3f4f6",
                "& .MuiLinearProgress-bar": { bgcolor: allDone ? "#16a34a" : "#4a53ff", borderRadius: 2 },
              }}
            />
            <Typography variant="caption" sx={{ color: "#9ca3af", fontWeight: 600, whiteSpace: "nowrap", fontSize: "0.72rem" }}>
              {checked}/{total}
            </Typography>
          </Box>
        </Box>
        {collapsed
          ? <ExpandMoreIcon sx={{ color: "#9ca3af", fontSize: 18, flexShrink: 0 }} />
          : <ExpandLessIcon sx={{ color: "#9ca3af", fontSize: 18, flexShrink: 0 }} />
        }
      </Box>

      {!collapsed && (
        <CardContent sx={{ pt: 0.5, pb: "8px !important", px: 1 }}>
          {items.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 1, px: 1 }}>No items yet.</Typography>
          ) : (
            <List dense disablePadding>
              {items.map((item) => (
                <ChecklistItem key={item.id} item={item} onToggle={onToggle} onRemove={onRemove} />
              ))}
            </List>
          )}
        </CardContent>
      )}
    </Card>
  );
}
