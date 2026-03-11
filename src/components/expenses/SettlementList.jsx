const fmt = (n) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function SettlementList({ settlements, members }) {
  const memberName = (id) => members.find((m) => m.id === id)?.name ?? "Unknown";

  return (
    <div className="settlement-section">
      <h3>
        Settlement
        {settlements.length > 0 && (
          <span className="settlement-count">
            {settlements.length} transaction{settlements.length !== 1 ? "s" : ""} to settle
          </span>
        )}
      </h3>

      {settlements.length === 0 ? (
        <div className="settlement-all-clear">
          All settled up! No transfers needed.
        </div>
      ) : (
        <ul className="settlement-list">
          {settlements.map((s, i) => (
            <li key={i} className="settlement-item">
              <span className="settlement-from">{memberName(s.from)}</span>
              <span className="settlement-arrow">→</span>
              <span className="settlement-to">{memberName(s.to)}</span>
              <span className="settlement-amount">${fmt(s.amount)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
