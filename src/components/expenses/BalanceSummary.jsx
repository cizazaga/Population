const fmt = (n) =>
  Math.abs(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function BalanceSummary({ members, balances, totalSpent }) {
  if (members.length === 0) return null;

  return (
    <div className="balance-section">
      <div className="balance-header">
        <h3>Balances</h3>
        <span className="total-spent">
          Total spent: $
          {totalSpent.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
      <div className="balance-grid">
        {members.map((m) => {
          const b = balances[m.id] ?? 0;
          const status = b > 0.005 ? "creditor" : b < -0.005 ? "debtor" : "even";
          const initials = m.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div key={m.id} className={`balance-card balance-${status}`}>
              <div className="balance-avatar">{initials}</div>
              <div className="balance-name">{m.name}</div>
              <div className="balance-amount">
                {status === "creditor" && (
                  <>
                    <span className="balance-label">is owed</span>
                    <span className="balance-value">+${fmt(b)}</span>
                  </>
                )}
                {status === "debtor" && (
                  <>
                    <span className="balance-label">owes</span>
                    <span className="balance-value">-${fmt(b)}</span>
                  </>
                )}
                {status === "even" && (
                  <span className="balance-label">settled</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
