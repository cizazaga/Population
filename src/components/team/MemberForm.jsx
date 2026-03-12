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

const EMPTY = { name: "", role: "runner" };

export default function MemberForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    onSubmit({ name: form.name.trim(), role: form.role });
  };

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{initial ? "Edit Member" : "Add Member"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. Ana Torres"
          fullWidth
          autoFocus
          error={!!error}
          helperText={error}
          sx={{ mt: 1 }}
        />
        <FormControl sx={{ mt: 2 }}>
          <FormLabel>Role</FormLabel>
          <RadioGroup
            row
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <FormControlLabel value="runner" control={<Radio />} label="Runner" />
            <FormControlLabel value="driver" control={<Radio />} label="Driver" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initial ? "Save Changes" : "Add Member"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
