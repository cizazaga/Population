import { CATEGORIES } from "../../constants/categories";

const fmt = (n) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const catLabel = (val) => CATEGORIES.find((c) => c.value === val)?.label ?? val;

export default function ExpenseList({ expenses, members, onRemove }) {
  const memberName = (id) => members.find((m) => m.id === id)?.name ?? "Unknown";

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>No expenses yet. Add your first expense above.</p>
      </div>
    );
  }

  const sorted = [...expenses].sort((a, b) => {
    if (b.date !== a.date) return b.date.localeCompare(a.date);
    return b.createdAt - a.createdAt;
  });

  return (
    <div className="expense-table-wrap">
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Paid by</th>
            <th>Covers</th>
            <th className="col-amount">Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((exp) => (
            <tr key={exp.id}>
              <td className="col-date">{exp.date}</td>
              <td>{exp.description}</td>
              <td>
                <span className="category-badge">{catLabel(exp.category)}</span>
              </td>
              <td>{memberName(exp.paidBy)}</td>
              <td className="col-covers">
                {exp.coveredFor.length === members.length
                  ? "Whole team"
                  : exp.coveredFor.map(memberName).join(", ")}
              </td>
              <td className="col-amount">${fmt(exp.amount)}</td>
              <td>
                <button
                  className="btn-icon btn-danger"
                  onClick={() => onRemove(exp.id)}
                  title="Delete expense"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
