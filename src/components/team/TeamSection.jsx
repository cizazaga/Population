import { useState } from "react";
import MemberCard from "./MemberCard";
import MemberForm from "./MemberForm";

export default function TeamSection({ members, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleAdd = (data) => {
    onAdd(data);
    setShowForm(false);
  };

  const handleEdit = (data) => {
    onUpdate(editing.id, data);
    setEditing(null);
  };

  const confirmDelete = () => {
    onDelete(pendingDelete.id);
    setPendingDelete(null);
  };

  const runners = members.filter((m) => m.role === "runner");
  const drivers = members.filter((m) => m.role === "driver");

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Team Members</h2>
          <p className="section-sub">
            {members.length} of 7 members added ({runners.length} runner
            {runners.length !== 1 ? "s" : ""}, {drivers.length} driver
            {drivers.length !== 1 ? "s" : ""})
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <div className="empty-state">
          <p>No team members yet.</p>
          <p>Add your 6 runners and 1 driver to get started.</p>
        </div>
      ) : (
        <div className="member-list">
          {members.map((m) => (
            <MemberCard
              key={m.id}
              member={m}
              onEdit={setEditing}
              onDelete={setPendingDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <MemberForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
      )}
      {editing && (
        <MemberForm
          initial={editing}
          onSubmit={handleEdit}
          onCancel={() => setEditing(null)}
        />
      )}

      {pendingDelete && (
        <div className="modal-overlay" onClick={() => setPendingDelete(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Remove Member?</h2>
            <p>
              Remove <strong>{pendingDelete.name}</strong>? Their personal
              checklist items will be deleted. Expense history will remain.
            </p>
            <div className="form-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setPendingDelete(null)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
