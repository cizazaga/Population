import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import TabNav from "./components/layout/TabNav";
import TeamSection from "./components/team/TeamSection";
import ChecklistSection from "./components/checklist/ChecklistSection";
import ExpenseSection from "./components/expenses/ExpenseSection";
import AuthGate from "./components/auth/AuthGate";
import { useTeam } from "./hooks/useTeam";
import { useChecklist } from "./hooks/useChecklist";
import { useExpenses } from "./hooks/useExpenses";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { isAuthenticated, isFirstVisit, setPassword, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("team");
  const { members, addMember, updateMember, removeMember } = useTeam();
  const {
    items,
    initTeamItems,
    seedMember,
    addItem,
    toggleItem,
    removeItem,
    removeMemberItems,
  } = useChecklist();
  const {
    expenses,
    addExpense,
    removeExpense,
    toggleSettled,
    balances,
    settlements,
    totalSpent,
  } = useExpenses(members);

  // Seed team items once on mount
  useEffect(() => {
    initTeamItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddMember = (data) => {
    const newMember = addMember(data);
    seedMember(newMember);
  };

  const handleRemoveMember = (id) => {
    removeMember(id);
    removeMemberItems(id);
  };

  return (
    <AuthGate
      isAuthenticated={isAuthenticated}
      isFirstVisit={isFirstVisit}
      setPassword={setPassword}
      login={login}
    >
      <div className="app">
        <Header onLogout={logout} />
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="main-content">
          {activeTab === "team" && (
            <TeamSection
              members={members}
              onAdd={handleAddMember}
              onUpdate={updateMember}
              onDelete={(m) => handleRemoveMember(m.id)}
            />
          )}
          {activeTab === "checklist" && (
            <ChecklistSection
              members={members}
              items={items}
              onToggle={toggleItem}
              onRemove={removeItem}
              onAdd={addItem}
            />
          )}
          {activeTab === "expenses" && (
            <ExpenseSection
              members={members}
              expenses={expenses}
              balances={balances}
              settlements={settlements}
              totalSpent={totalSpent}
              onAdd={addExpense}
              onRemove={removeExpense}
              onToggleSettled={toggleSettled}
            />
          )}
        </main>
      </div>
    </AuthGate>
  );
}
