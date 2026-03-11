import { useLocalStorage } from "./useLocalStorage";
import { computeSettlement } from "../utils/settlement";

export function useExpenses(members) {
  const [expenses, setExpenses] = useLocalStorage("baja_expenses", []);

  const addExpense = (data) => {
    setExpenses((prev) => [
      ...prev,
      { ...data, id: crypto.randomUUID(), createdAt: Date.now() },
    ]);
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const { balances, settlements } = computeSettlement(expenses, members);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  return { expenses, addExpense, removeExpense, balances, settlements, totalSpent };
}
