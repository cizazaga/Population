import { useLocalStorage } from "./useLocalStorage";
import { DEFAULT_PERSONAL_ITEMS, DEFAULT_TEAM_ITEMS } from "../constants/defaultChecklist";

function seedTeamItems() {
  return DEFAULT_TEAM_ITEMS.map((label) => ({
    id: crypto.randomUUID(),
    label,
    scope: "team",
    assignedTo: null,
    checked: false,
    isDefault: true,
  }));
}

function seedPersonalItems(member) {
  return DEFAULT_PERSONAL_ITEMS
    .filter((item) => item.roles.includes(member.role))
    .map((item) => ({
      id: crypto.randomUUID(),
      label: item.label,
      scope: "person",
      assignedTo: member.id,
      checked: false,
      isDefault: true,
    }));
}

export function useChecklist() {
  const [items, setItems] = useLocalStorage("baja_checklist", []);

  const initTeamItems = () => {
    const hasTeamItems = items.some((i) => i.scope === "team");
    if (!hasTeamItems) {
      setItems((prev) => [...prev, ...seedTeamItems()]);
    }
  };

  const seedMember = (member) => {
    const alreadySeeded = items.some(
      (i) => i.scope === "person" && i.assignedTo === member.id
    );
    if (!alreadySeeded) {
      setItems((prev) => [...prev, ...seedPersonalItems(member)]);
    }
  };

  const addItem = (data) => {
    setItems((prev) => [
      ...prev,
      { ...data, id: crypto.randomUUID(), checked: false, isDefault: false },
    ]);
  };

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeMemberItems = (memberId) => {
    setItems((prev) =>
      prev.filter((item) => !(item.scope === "person" && item.assignedTo === memberId))
    );
  };

  return {
    items,
    initTeamItems,
    seedMember,
    addItem,
    toggleItem,
    removeItem,
    removeMemberItems,
  };
}
