import { useState } from "react";
import ChecklistGroup from "./ChecklistGroup";
import AddItemForm from "./AddItemForm";

export default function ChecklistSection({ members, items, onToggle, onRemove, onAdd }) {
  const [showForm, setShowForm] = useState(false);

  const teamItems = items.filter((i) => i.scope === "team");

  const totalChecked = items.filter((i) => i.checked).length;
  const totalItems = items.length;

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>Checklist</h2>
          <p className="section-sub">
            {totalChecked} of {totalItems} items done
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add Item
        </button>
      </div>

      {items.length === 0 && members.length === 0 ? (
        <div className="empty-state">
          <p>Add team members first to generate personal checklists.</p>
        </div>
      ) : (
        <div className="checklist-groups">
          <ChecklistGroup
            title="Team"
            subtitle="Shared responsibilities"
            items={teamItems}
            onToggle={onToggle}
            onRemove={onRemove}
          />

          {members.map((member) => {
            const memberItems = items.filter(
              (i) => i.scope === "person" && i.assignedTo === member.id
            );
            return (
              <ChecklistGroup
                key={member.id}
                title={member.name}
                subtitle={member.role === "driver" ? "Driver" : "Runner"}
                items={memberItems}
                onToggle={onToggle}
                onRemove={onRemove}
              />
            );
          })}
        </div>
      )}

      {showForm && (
        <AddItemForm
          members={members}
          onAdd={onAdd}
          onCancel={() => setShowForm(false)}
        />
      )}
    </section>
  );
}
