import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import MemberCard from "./MemberCard";
import MemberForm from "./MemberForm";

export default function TeamSection({ members, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleAdd = (data) => { onAdd(data); setShowForm(false); };
  const handleEdit = (data) => { onUpdate(editing.id, data); setEditing(null); };
  const confirmDelete = () => { onDelete(pendingDelete.id); setPendingDelete(null); };

  const runners = members.filter((m) => m.role === "runner");
  const drivers = members.filter((m) => m.role === "driver");

  return (
    <Box sx={{ maxWidth: 860, mx: "auto", px: { xs: 2, sm: 3 }, py: 4 }}>
      {/* Section header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 4 }}>
        <Box>
          <Typography variant="overline" sx={{ color: "#4a53ff", fontWeight: 700, letterSpacing: "0.12em", fontSize: "0.7rem" }}>
            Race Team
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#0a0a0a", mt: 0.25 }}>
            Team Members
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {members.length} of 7 &nbsp;·&nbsp; {runners.length} runner{runners.length !== 1 ? "s" : ""} &nbsp;·&nbsp; {drivers.length} driver{drivers.length !== 1 ? "s" : ""}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
          sx={{ bgcolor: "#0a0a0a", "&:hover": { bgcolor: "#111" } }}
        >
          Add Member
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {members.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
          <Typography variant="h6" fontWeight={700} color="#0a0a0a" gutterBottom>No team members yet</Typography>
          <Typography variant="body2">Add your 6 runners and 1 driver to get started.</Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {members.map((m) => (
            <MemberCard key={m.id} member={m} onEdit={setEditing} onDelete={setPendingDelete} />
          ))}
        </Box>
      )}

      {showForm && <MemberForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />}
      {editing && <MemberForm initial={editing} onSubmit={handleEdit} onCancel={() => setEditing(null)} />}

      <Dialog open={!!pendingDelete} onClose={() => setPendingDelete(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Remove Member?</DialogTitle>
        <DialogContent>
          <Typography>
            Remove <strong>{pendingDelete?.name}</strong>? Their personal checklist items will be deleted. Expense history will remain.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" onClick={() => setPendingDelete(null)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={confirmDelete}>Remove</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
