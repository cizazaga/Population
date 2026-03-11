import { useState } from "react";

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
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add Checklist Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Description</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Extra protein bars"
              autoFocus
            />
            {error && <span className="form-error">{error}</span>}
          </div>
          <div className="form-group">
            <label>Assign to</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  checked={scope === "team"}
                  onChange={() => setScope("team")}
                />
                Whole Team
              </label>
              {members.length > 0 && (
                <label className="radio-label">
                  <input
                    type="radio"
                    checked={scope === "person"}
                    onChange={() => setScope("person")}
                  />
                  Specific Person
                </label>
              )}
            </div>
          </div>
          {scope === "person" && members.length > 0 && (
            <div className="form-group">
              <label>Person</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
