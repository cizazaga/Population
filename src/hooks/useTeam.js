import { useLocalStorage } from "./useLocalStorage";

export function useTeam() {
  const [members, setMembers] = useLocalStorage("baja_team", []);

  const addMember = (data) => {
    const newMember = { ...data, id: crypto.randomUUID() };
    setMembers((prev) => [...prev, newMember]);
    return newMember;
  };

  const updateMember = (id, data) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)));
  };

  const removeMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return { members, addMember, updateMember, removeMember };
}
