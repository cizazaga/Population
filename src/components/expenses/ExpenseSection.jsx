import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import BalanceSummary from "./BalanceSummary";
import SettlementList from "./SettlementList";

export default function ExpenseSection({
  members, expenses, balances, settlements, totalSpent, onAdd, onRemove, onToggleSettled,
}) {
  const [showForm, setShowForm] = useState(false);
  const settledCount = expenses.filter((e) => e.settled ?? false).length;

  return (
    <Box sx={{ maxWidth: 860, mx: "auto", px: { xs: 2, sm: 3 }, py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 4 }}>
        <Box>
          <Typography variant="overline" sx={{ color: "#4a53ff", fontWeight: 700, letterSpacing: "0.12em", fontSize: "0.7rem" }}>
            Shared Costs
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#0a0a0a", mt: 0.25 }}>
            Expenses
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {expenses.length} recorded &nbsp;·&nbsp; {settledCount} settled
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowForm(true)}
          disabled={members.length === 0}
          title={members.length === 0 ? "Add team members first" : ""}
          sx={{ bgcolor: "#0a0a0a", "&:hover": { bgcolor: "#111" } }}
        >
          Add Expense
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {members.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
          <Typography variant="h6" fontWeight={700} color="#0a0a0a" gutterBottom>No team members yet</Typography>
          <Typography variant="body2">Add team members first before tracking expenses.</Typography>
        </Box>
      ) : (
        <>
          <ExpenseList expenses={expenses} members={members} onRemove={onRemove} onToggleSettled={onToggleSettled} />
          <BalanceSummary members={members} balances={balances} totalSpent={totalSpent} />
          <SettlementList settlements={settlements} members={members} />
        </>
      )}

      {showForm && <ExpenseForm members={members} onAdd={onAdd} onCancel={() => setShowForm(false)} />}
    </Box>
  );
}
