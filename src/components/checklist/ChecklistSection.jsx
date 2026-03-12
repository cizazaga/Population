import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import ChecklistGroup from "./ChecklistGroup";
import AddItemForm from "./AddItemForm";

export default function ChecklistSection({ members, items, onToggle, onRemove, onAdd }) {
  const [showForm, setShowForm] = useState(false);
  const teamItems = items.filter((i) => i.scope === "team");
  const totalChecked = items.filter((i) => i.checked).length;
  const totalItems = items.length;
  const pct = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  return (
    <Box sx={{ maxWidth: 860, mx: "auto", px: { xs: 2, sm: 3 }, py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 4 }}>
        <Box>
          <Typography variant="overline" sx={{ color: "#4a53ff", fontWeight: 700, letterSpacing: "0.12em", fontSize: "0.7rem" }}>
            Pre-Race
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#0a0a0a", mt: 0.25 }}>
            Checklist
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {totalChecked} of {totalItems} done &nbsp;·&nbsp; {pct}%
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
          sx={{ bgcolor: "#0a0a0a", "&:hover": { bgcolor: "#111" } }}
        >
          Add Item
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {items.length === 0 && members.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
          <Typography variant="h6" fontWeight={700} color="#0a0a0a" gutterBottom>No items yet</Typography>
          <Typography variant="body2">Add team members first to generate personal checklists.</Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <ChecklistGroup title="Team" subtitle="Shared" items={teamItems} onToggle={onToggle} onRemove={onRemove} />
          {members.map((member) => (
            <ChecklistGroup
              key={member.id}
              title={member.name}
              subtitle={member.role === "driver" ? "Driver" : "Runner"}
              items={items.filter((i) => i.scope === "person" && i.assignedTo === member.id)}
              onToggle={onToggle}
              onRemove={onRemove}
            />
          ))}
        </Box>
      )}

      {showForm && <AddItemForm members={members} onAdd={onAdd} onCancel={() => setShowForm(false)} />}
    </Box>
  );
}
