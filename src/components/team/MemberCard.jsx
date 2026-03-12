import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

export default function MemberCard({ member, onEdit, onDelete }) {
  const initials = member.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const isDriver = member.role === "driver";

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        borderColor: "#e5e7eb",
        "&:hover": { borderColor: "#d1d5db", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, py: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Avatar
          sx={{
            bgcolor: isDriver ? "#374151" : "#0a0a0a",
            fontWeight: 800,
            width: 42,
            height: 42,
            fontSize: 14,
            letterSpacing: "0.05em",
          }}
        >
          {initials}
        </Avatar>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="body1" fontWeight={700} noWrap sx={{ color: "#0a0a0a" }}>
            {member.name}
          </Typography>
          <Chip
            icon={isDriver ? <DirectionsCarIcon /> : <DirectionsRunIcon />}
            label={isDriver ? "Driver" : "Runner"}
            size="small"
            sx={{
              mt: 0.5,
              height: 20,
              bgcolor: isDriver ? "#f3f4f6" : "#111111",
              color: isDriver ? "#374151" : "#ffffff",
              fontSize: "0.7rem",
              fontWeight: 700,
              "& .MuiChip-icon": { color: "inherit", fontSize: 12 },
              "& .MuiChip-label": { px: 1 },
            }}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={() => onEdit(member)}
            sx={{ color: "#9ca3af", "&:hover": { color: "#0a0a0a", bgcolor: "#f3f4f6" } }}
          >
            <EditIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(member)}
            sx={{ color: "#9ca3af", "&:hover": { color: "#ef4444", bgcolor: "#fef2f2" } }}
          >
            <DeleteOutlineIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
