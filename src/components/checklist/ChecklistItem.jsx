import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ChecklistItem({ item, onToggle, onRemove }) {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        !item.isDefault ? (
          <IconButton edge="end" size="small" onClick={() => onRemove(item.id)} title="Remove item">
            <CloseIcon fontSize="small" />
          </IconButton>
        ) : null
      }
      sx={{ pr: !item.isDefault ? 5 : 0 }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        <Checkbox
          edge="start"
          checked={item.checked}
          onChange={() => onToggle(item.id)}
          size="small"
        />
      </ListItemIcon>
      <ListItemText
        primary={item.label}
        primaryTypographyProps={{
          variant: "body2",
          sx: item.checked
            ? { textDecoration: "line-through", color: "text.disabled" }
            : {},
        }}
      />
    </ListItem>
  );
}
