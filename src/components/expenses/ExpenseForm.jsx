import { useState } from "react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const coveredFor =
      form.coverage === "team"
        ? members.map((m) => m.id)
        : form.coveredFor;

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
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group flex-2">
              <label>Description</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="e.g. Fuel for support van"
                autoFocus
              />
              {errors.description && (
                <span className="form-error">{errors.description}</span>
              )}
            </div>
            <div className="form-group flex-1">
              <label>Amount ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0.00"
              />
              {errors.amount && (
                <span className="form-error">{errors.amount}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>
            <div className="form-group flex-1">
              <label>Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group flex-1">
              <label>Paid by</label>
              <select
                value={form.paidBy}
                onChange={(e) => setForm({ ...form, paidBy: e.target.value })}
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              {errors.paidBy && (
                <span className="form-error">{errors.paidBy}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Covers</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  checked={form.coverage === "team"}
                  onChange={() => setForm({ ...form, coverage: "team", coveredFor: [] })}
                />
                Whole team ({members.length} people)
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  checked={form.coverage === "specific"}
                  onChange={() => setForm({ ...form, coverage: "specific" })}
                />
                Specific people
              </label>
            </div>

            {form.coverage === "specific" && (
              <div className="checkbox-grid">
                {members.map((m) => (
                  <label key={m.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.coveredFor.includes(m.id)}
                      onChange={() => toggleCoveredFor(m.id)}
                    />
                    {m.name}
                  </label>
                ))}
              </div>
            )}
            {errors.coveredFor && (
              <span className="form-error">{errors.coveredFor}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
