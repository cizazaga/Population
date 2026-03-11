import { useState } from "react";

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
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{initial ? "Edit Member" : "Add Member"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Ana Torres"
              autoFocus
            />
            {error && <span className="form-error">{error}</span>}
          </div>
          <div className="form-group">
            <label>Role</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="runner"
                  checked={form.role === "runner"}
                  onChange={() => setForm({ ...form, role: "runner" })}
                />
                🏃 Runner
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="driver"
                  checked={form.role === "driver"}
                  onChange={() => setForm({ ...form, role: "driver" })}
                />
                🚗 Driver
              </label>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initial ? "Save Changes" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
