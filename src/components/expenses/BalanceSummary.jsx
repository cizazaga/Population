import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const fmt = (n) =>
  Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function BalanceSummary({ members, balances, totalSpent }) {
  if (members.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0a0a0a" }}>
          Balances
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="caption" color="text.secondary">Total active spend</Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0a0a0a" }}>
            ${totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))",
          gap: 1.5,
        }}
      >
        {members.map((m) => {
          const b = balances[m.id] ?? 0;
          const status = b > 0.005 ? "creditor" : b < -0.005 ? "debtor" : "even";
          const initials = m.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

          const style = {
            creditor: { border: "#bbf7d0", avatar: "#16a34a", value: "#15803d", label: "is owed" },
            debtor:   { border: "#fecaca", avatar: "#ef4444", value: "#dc2626", label: "owes" },
            even:     { border: "#e5e7eb", avatar: "#9ca3af", value: "#6b7280", label: "settled" },
          }[status];

          return (
            <Card key={m.id} variant="outlined" sx={{ borderColor: style.border, borderRadius: 2 }}>
              <CardContent sx={{ textAlign: "center", py: 2, "&:last-child": { pb: 2 } }}>
                <Avatar sx={{ bgcolor: style.avatar, mx: "auto", mb: 1, width: 36, height: 36, fontSize: 13, fontWeight: 700 }}>
                  {initials}
                </Avatar>
                <Typography variant="body2" fontWeight={700} noWrap sx={{ color: "#0a0a0a" }}>{m.name}</Typography>
                <Typography variant="caption" sx={{ color: "#9ca3af", display: "block", mt: 0.25 }}>{style.label}</Typography>
                {status !== "even" && (
                  <Typography variant="body2" fontWeight={800} sx={{ color: style.value, mt: 0.25 }}>
                    {status === "creditor" ? "+" : "-"}${fmt(b)}
                  </Typography>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
