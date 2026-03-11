import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function TabNav({ activeTab, setActiveTab }) {
  return (
    <Box sx={{ bgcolor: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        variant="fullWidth"
        sx={{
          "& .MuiTabs-indicator": { backgroundColor: "#4a53ff", height: 3 },
          "& .MuiTab-root": {
            color: "#9ca3af",
            fontWeight: 600,
            textTransform: "none",
            fontSize: "0.875rem",
            minHeight: 52,
            "&.Mui-selected": { color: "#0a0a0a" },
          },
        }}
      >
        <Tab value="team" label="Team" icon={<GroupIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
        <Tab value="checklist" label="Checklist" icon={<AssignmentTurnedInIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
        <Tab value="expenses" label="Expenses" icon={<AccountBalanceWalletIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
      </Tabs>
    </Box>
  );
}
