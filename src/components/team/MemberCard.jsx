export default function MemberCard({ member, onEdit, onDelete }) {
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`member-card role-${member.role}`}>
      <div className="member-avatar">{initials}</div>
      <div className="member-info">
        <span className="member-name">{member.name}</span>
        <span className={`role-badge role-badge-${member.role}`}>
          {member.role === "driver" ? "🚗 Driver" : "🏃 Runner"}
        </span>
      </div>
      <div className="member-actions">
        <button className="btn-icon" onClick={() => onEdit(member)} title="Edit">
          ✏️
        </button>
        <button className="btn-icon btn-danger" onClick={() => onDelete(member)} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
}
