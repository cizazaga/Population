import { useState } from "react";
import ChecklistItem from "./ChecklistItem";

export default function ChecklistGroup({ title, subtitle, items, onToggle, onRemove }) {
  const [collapsed, setCollapsed] = useState(false);
  const checked = items.filter((i) => i.checked).length;
  const total = items.length;
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0;

  return (
    <div className={`checklist-group${collapsed ? " collapsed" : ""}`}>
      <button
        className="checklist-group-header"
        onClick={() => setCollapsed((c) => !c)}
      >
        <div className="group-header-left">
          <span className="group-arrow">{collapsed ? "▶" : "▼"}</span>
          <div>
            <span className="group-title">{title}</span>
            {subtitle && <span className="group-subtitle">{subtitle}</span>}
          </div>
        </div>
        <div className="group-header-right">
          <span className="group-count">
            {checked}/{total}
          </span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </button>

      {!collapsed && (
        <ul className="checklist-items">
          {items.length === 0 ? (
            <li className="checklist-empty">No items yet.</li>
          ) : (
            items.map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                onToggle={onToggle}
                onRemove={onRemove}
              />
            ))
          )}
        </ul>
      )}
    </div>
  );
}
