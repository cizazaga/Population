import { useLocalStorage } from "./useLocalStorage";
import { computeSettlement } from "../utils/settlement";

export function useExpenses(members) {
  const [expenses, setExpenses] = useLocalStorage("baja_expenses", []);

  const addExpense = (data) => {
    setExpenses((prev) => [
      ...prev,
      { ...data, id: crypto.randomUUID(), createdAt: Date.now(), settled: false },
    ]);
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const toggleSettled = (id) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, settled: !e.settled } : e))
    );
  };

  const active = expenses.filter((e) => !(e.settled ?? false));
  const { balances, settlements } = computeSettlement(active, members);
  const totalSpent = active.reduce((sum, e) => sum + e.amount, 0);

  return { expenses, addExpense, removeExpense, toggleSettled, balances, settlements, totalSpent };
}
