import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

function MenuItem({ 
  item, 
  collapsed, 
  onMenuClick 
}) {
  const renderCollapsedMenuItem = () => (
    <Tooltip title={item.label} placement="right">
      <ListItemButton
        onClick={() => onMenuClick(item)}
        sx={{
          minHeight: 48,
          px: 2.5,
          justifyContent: "center",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: "center",
            color: "text.primary",
          }}
        >
          {item.icon}
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );

  const renderExpandedMenuItem = () => (
    <ListItemButton
      onClick={() => onMenuClick(item)}
      sx={{
        minHeight: 48,
        px: 2.5,
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: 2,
          justifyContent: "center",
          color: "text.primary",
        }}
      >
        {item.icon}
      </ListItemIcon>
      <ListItemText
        primary={item.label}
        sx={{
          opacity: 1,
          "& .MuiListItemText-primary": {
            fontSize: "0.875rem",
            fontWeight: 500,
          },
        }}
      />
    </ListItemButton>
  );

  return (
    <>
      <ListItem disablePadding>
        {collapsed ? renderCollapsedMenuItem() : renderExpandedMenuItem()}
      </ListItem>

    </>
  );
}

export default MenuItem;