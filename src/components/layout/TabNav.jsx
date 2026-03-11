const TABS = [
  { id: "team", label: "Team", icon: "👥" },
  { id: "checklist", label: "Checklist", icon: "✅" },
  { id: "expenses", label: "Expenses", icon: "💰" },
];

export default function TabNav({ activeTab, setActiveTab }) {
  return (
    <nav className="tab-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn${activeTab === tab.id ? " active" : ""}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
