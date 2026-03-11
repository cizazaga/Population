export default function ChecklistItem({ item, onToggle, onRemove }) {
  return (
    <li className={`checklist-item${item.checked ? " checked" : ""}`}>
      <label className="checklist-label">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => onToggle(item.id)}
        />
        <span className="checklist-text">{item.label}</span>
      </label>
      {!item.isDefault && (
        <button
          className="btn-icon btn-danger"
          onClick={() => onRemove(item.id)}
          title="Remove item"
        >
          ✕
        </button>
      )}
    </li>
  );
}
