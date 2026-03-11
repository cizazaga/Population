import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";

export default function AddItemForm({ members, onAdd, onCancel }) {
  const [label, setLabel] = useState("");
  const [scope, setScope] = useState("team");
  const [assignedTo, setAssignedTo] = useState(members[0]?.id || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim()) {
      setError("Item description is required.");
      return;
    }
    onAdd({
      label: label.trim(),
      scope,
      assignedTo: scope === "team" ? null : assignedTo,
    });
    onCancel();
  };

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Add Checklist Item</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Item Description"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Extra protein bars"
            fullWidth
            autoFocus
            error={!!error}
            helperText={error}
          />
          <FormControl>
            <FormLabel>Assign to</FormLabel>
            <RadioGroup
              row
              value={scope}
              onChange={(e) => setScope(e.target.value)}
            >
              <FormControlLabel value="team" control={<Radio />} label="Whole Team" />
              {members.length > 0 && (
                <FormControlLabel value="person" control={<Radio />} label="Specific Person" />
              )}
            </RadioGroup>
          </FormControl>
          {scope === "person" && members.length > 0 && (
            <FormControl fullWidth>
              <InputLabel>Person</InputLabel>
              <Select
                value={assignedTo}
                label="Person"
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                {members.map((m) => (
                  <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Add Item</Button>
      </DialogActions>
    </Dialog>
  );
}
