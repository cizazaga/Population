import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import BalanceSummary from "./BalanceSummary";
import SettlementList from "./SettlementList";

export default function ExpenseSection({
  members,
  expenses,
  balances,
  settlements,
  totalSpent,
  onAdd,
  onRemove,
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Expenses</h2>
          <p className="section-sub">{expenses.length} expense{expenses.length !== 1 ? "s" : ""} recorded</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
          disabled={members.length === 0}
          title={members.length === 0 ? "Add team members first" : ""}
        >
          + Add Expense
        </button>
      </div>

      {members.length === 0 ? (
        <div className="empty-state">
          <p>Add team members first before tracking expenses.</p>
        </div>
      ) : (
        <>
          <ExpenseList expenses={expenses} members={members} onRemove={onRemove} />
          <BalanceSummary
            members={members}
            balances={balances}
            totalSpent={totalSpent}
          />
          <SettlementList settlements={settlements} members={members} />
        </>
      )}

      {showForm && (
        <ExpenseForm
          members={members}
          onAdd={onAdd}
          onCancel={() => setShowForm(false)}
        />
      )}
    </section>
  );
}
