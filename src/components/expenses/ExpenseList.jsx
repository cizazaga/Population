import { useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { CATEGORIES } from "../../constants/categories";

const fmt = (n) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const catLabel = (val) => CATEGORIES.find((c) => c.value === val)?.label ?? val;

export default function ExpenseList({ expenses, members, onRemove, onToggleSettled }) {
  const [showSettled, setShowSettled] = useState(false);
  const memberName = (id) => members.find((m) => m.id === id)?.name ?? "Unknown";

  const sorted = [...expenses].sort((a, b) => {
    if (b.date !== a.date) return b.date.localeCompare(a.date);
    return b.createdAt - a.createdAt;
  });

  const visible = sorted.filter((e) => showSettled || !(e.settled ?? false));

  if (expenses.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
        <Typography variant="h6" fontWeight={700} color="#0a0a0a" gutterBottom>No expenses yet</Typography>
        <Typography variant="body2">Add your first expense using the button above.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1.5 }}>
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={showSettled}
              onChange={(e) => setShowSettled(e.target.checked)}
              sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#4a53ff" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "#4a53ff" } }}
            />
          }
          label={<Typography variant="body2" color="text.secondary">Show settled</Typography>}
        />
      </Box>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ borderRadius: 2, borderColor: "#e5e7eb", overflow: "hidden" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f9fafb" }}>
              <TableCell sx={{ fontWeight: 700, color: "#374151", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Paid by</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Covers</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: "#374151", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Amount</TableCell>
              <TableCell padding="checkbox" />
              <TableCell padding="checkbox" />
            </TableRow>
          </TableHead>
          <TableBody>
            {visible.map((exp) => {
              const isSettled = exp.settled ?? false;
              const mutedSx = isSettled ? { textDecoration: "line-through", color: "#9ca3af" } : {};
              return (
                <TableRow
                  key={exp.id}
                  sx={{
                    opacity: isSettled ? 0.55 : 1,
                    "&:last-child td": { border: 0 },
                    "&:hover": { bgcolor: "#f9fafb" },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ color: "#6b7280", ...mutedSx }}>{exp.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} sx={{ color: "#0a0a0a", ...mutedSx }}>{exp.description}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={catLabel(exp.category)}
                      size="small"
                      sx={{ bgcolor: "#f3f4f6", color: "#374151", fontWeight: 600, fontSize: "0.72rem", borderRadius: 4 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: "#374151" }}>{memberName(exp.paidBy)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: "#374151" }}>
                      {exp.coveredFor.length === members.length ? "Whole team" : exp.coveredFor.map(memberName).join(", ")}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight={800} sx={{ color: "#0a0a0a", ...mutedSx }}>
                      ${fmt(exp.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Tooltip title={isSettled ? "Mark as unsettled" : "Mark as settled"}>
                      <IconButton size="small" onClick={() => onToggleSettled(exp.id)}>
                        {isSettled
                          ? <CheckCircleIcon fontSize="small" sx={{ color: "#16a34a" }} />
                          : <RadioButtonUncheckedIcon fontSize="small" sx={{ color: "#d1d5db" }} />
                        }
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell padding="checkbox">
                    <IconButton size="small" onClick={() => onRemove(exp.id)} sx={{ color: "#d1d5db", "&:hover": { color: "#ef4444" } }}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
