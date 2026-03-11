const EPSILON = 0.005;

/**
 * Given a list of expenses and members, compute:
 * 1. net balance per member (positive = owed money, negative = owes money)
 * 2. minimum list of transactions to settle all debts
 *
 * @param {Array} expenses - expense objects with { paidBy, amount, coveredFor[] }
 * @param {Array} members  - member objects with { id, name }
 * @returns {{ balances: Object, settlements: Array }}
 */
export function computeSettlement(expenses, members) {
  const balances = {};
  members.forEach((m) => (balances[m.id] = 0));

  for (const exp of expenses) {
    const { paidBy, amount, coveredFor } = exp;
    if (!coveredFor || coveredFor.length === 0) continue;

    const share = amount / coveredFor.length;

    if (balances[paidBy] !== undefined) balances[paidBy] += amount;

    for (const id of coveredFor) {
      if (balances[id] !== undefined) {
        balances[id] -= share;
      }
    }
  }

  // Round to 2 decimal places to avoid float drift
  for (const id in balances) {
    balances[id] = Math.round(balances[id] * 100) / 100;
  }

  // Build creditor/debtor lists
  const creditors = [];
  const debtors = [];

  for (const id in balances) {
    const b = balances[id];
    if (b > EPSILON) creditors.push({ id, balance: b });
    else if (b < -EPSILON) debtors.push({ id, balance: b });
  }

  // Sort: creditors largest first, debtors most-negative first
  creditors.sort((a, b) => b.balance - a.balance);
  debtors.sort((a, b) => a.balance - b.balance);

  const settlements = [];

  while (creditors.length > 0 && debtors.length > 0) {
    const creditor = creditors[0];
    const debtor = debtors[0];
    const amount = Math.min(creditor.balance, Math.abs(debtor.balance));
    const rounded = Math.round(amount * 100) / 100;

    if (rounded > EPSILON) {
      settlements.push({ from: debtor.id, to: creditor.id, amount: rounded });
    }

    creditor.balance -= amount;
    debtor.balance += amount;

    if (Math.abs(creditor.balance) < EPSILON) creditors.shift();
    if (Math.abs(debtor.balance) < EPSILON) debtors.shift();
  }

  return { balances, settlements };
}
