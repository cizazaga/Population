import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CATEGORIES } from "../../constants/categories";

const today = () => new Date().toISOString().split("T")[0];

const EMPTY = {
  description: "",
  amount: "",
  date: today(),
  paidBy: "",
  category: "misc",
  coverage: "team",
  coveredFor: [],
};

export default function ExpenseForm({ members, onAdd, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY, paidBy: members[0]?.id || "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = "Required.";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount > 0.";
    if (!form.paidBy) e.paidBy = "Select who paid.";
    if (form.coverage === "specific" && form.coveredFor.length === 0)
      e.coveredFor = "Select at least one person.";
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const coveredFor =
      form.coverage === "team" ? members.map((m) => m.id) : form.coveredFor;
    onAdd({
      description: form.description.trim(),
      amount: Math.round(Number(form.amount) * 100) / 100,
      date: form.date,
      paidBy: form.paidBy,
      category: form.category,
      coveredFor,
    });
    onCancel();
  };

  const toggleCoveredFor = (id) => {
    setForm((f) => ({
      ...f,
      coveredFor: f.coveredFor.includes(id)
        ? f.coveredFor.filter((x) => x !== id)
        : [...f.coveredFor, id],
    }));
  };

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Add Expense</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <TextField
                label="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="e.g. Fuel for support van"
                fullWidth
                autoFocus
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                label="Amount ($)"
                type="number"
                inputProps={{ step: "0.01", min: "0" }}
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0.00"
                fullWidth
                error={!!errors.amount}
                helperText={errors.amount}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={form.category}
                  label="Category"
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {CATEGORIES.map((c) => (
                    <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth error={!!errors.paidBy}>
                <InputLabel>Paid by</InputLabel>
                <Select
                  value={form.paidBy}
                  label="Paid by"
                  onChange={(e) => setForm({ ...form, paidBy: e.target.value })}
                >
                  {members.map((m) => (
                    <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                  ))}
                </Select>
                {errors.paidBy && (
                  <Alert severity="error" sx={{ mt: 0.5, py: 0 }}>{errors.paidBy}</Alert>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <FormControl>
            <FormLabel>Covers</FormLabel>
            <RadioGroup
              row
              value={form.coverage}
              onChange={(e) => setForm({ ...form, coverage: e.target.value, coveredFor: [] })}
            >
              <FormControlLabel value="team" control={<Radio />} label={`Whole team (${members.length} people)`} />
              <FormControlLabel value="specific" control={<Radio />} label="Specific people" />
            </RadioGroup>
          </FormControl>

          {form.coverage === "specific" && (
            <FormControl error={!!errors.coveredFor}>
              <FormGroup row>
                {members.map((m) => (
                  <FormControlLabel
                    key={m.id}
                    control={
                      <Checkbox
                        checked={form.coveredFor.includes(m.id)}
                        onChange={() => toggleCoveredFor(m.id)}
                        size="small"
                      />
                    }
                    label={m.name}
                  />
                ))}
              </FormGroup>
              {errors.coveredFor && (
                <Alert severity="error" sx={{ mt: 0.5 }}>{errors.coveredFor}</Alert>
              )}
            </FormControl>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Add Expense</Button>
      </DialogActions>
    </Dialog>
  );
}
