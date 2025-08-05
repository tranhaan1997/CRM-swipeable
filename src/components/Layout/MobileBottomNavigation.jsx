import { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Home,
  Settings,
  People,
  Business,
  Work,
  Map,
  MapsHomeWork,
  AddRoad,
} from "@mui/icons-material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import CableIcon from "@mui/icons-material/Cable";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { authAPI } from "~/apis/Systems/authAPI";
import { createCookie, SSO } from "~/utils/constants";

function MobileBottomNavigation() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
  const userInfo = useSelector((state) => state.operators?.items);

  // Bottom Navigation items - chỉ các menu chính
  const bottomNavItems = [
    {
      id: "home",
      label: "Trang chủ",
      icon: <Home />,
      path: "/",
    },
    {
      id: "contracts",
      label: "Hợp đồng",
      icon: <ReceiptLongIcon />,
      path: "/contracts",
    },
    {
      id: "customers",
      label: "Khách hàng",
      icon: <AccountBoxIcon />,
      path: "/customers",
    },
    {
      id: "cablelines",
      label: "Tuyến",
      icon: <CableIcon />,
      path: "/cable-lines",
    },
    {
      id: "settings",
      label: "Thiếp lập",
      icon: <Settings />,
      isDrawer: true,
    },
  ];

  // Settings submenu items
  const settingsSubmenu = [
    {
      id: "user-management-group",
      label: "Quản lý người dùng",
      isTitle: true,
    },
    {
      id: "users",
      label: "Quản lý người dùng",
      icon: <People />,
      path: "/settings/users",
    },
    {
      id: "departments",
      label: "Danh mục phòng ban",
      icon: <Business />,
      path: "/settings/departments",
    },
    {
      id: "positions",
      label: "Danh mục vị trí công việc",
      icon: <Work />,
      path: "/settings/positions",
    },
    {
      id: "location-management-group",
      label: "Quản lý vị trí địa lý",
      isTitle: true,
    },
    {
      id: "provinces",
      label: "Danh mục tỉnh",
      icon: <Map />,
      path: "/settings/provinces",
    },
    {
      id: "wards",
      label: "Danh mục phường",
      icon: <MapsHomeWork />,
      path: "/settings/wards",
    },
    {
      id: "streets",
      label: "Danh mục đường",
      icon: <AddRoad />,
      path: "/settings/streets",
    },
    {
      id: "account-management",
      label: "Quản lý tài khoản",
      isTitle: true,
    },
    // {
    //   id: "account-information",
    //   label: "Thông tin tài khoản",
    //   icon: <AccountCircleIcon />,
    //   path: "/settings/account",
    // },
    {
      id: "change-password",
      label: "Đổi mật khẩu",
      icon: <LockIcon />,
      path: "/settings/account",
    },
    {
      id: "log-out",
      label: "Đăng xuất",
      icon: <LogoutIcon />,
      path: "/settings/account",
    },
  ];

  const handleBottomNavChange = (event, newValue) => {
    const selectedItem = bottomNavItems[newValue];

    if (selectedItem.isDrawer) {
      setSettingsDrawerOpen(true);
    } else {
      navigate(selectedItem.path);
    }
  };

  const handleLogout = async () => {
    const res = await authAPI.Logout();
    if (res?.O_RESULT == 1) {
      createCookie("a-signaltoken", "", 1);
      createCookie("a-refreshtoken", "", 1);
      window.location.href = "/";
    }
    setSettingsDrawerOpen(false);
  };

  const handleUserInfo = () => {
    console.log("Navigate to user info");
    window.location.href = "/";
    setSettingsDrawerOpen(false);
  };

  const handleChangePassword = () => {
    console.log("Navigate to change password");
    const userName = userInfo[0]?.USERNAME;
    window.location.href = `${SSO}?uid=SSO-${userName}&changepass=1&redirect_uri=${encodeURIComponent(
      window.location.href
    )}`;
    setSettingsDrawerOpen(false);
  };

  const handleSettingsItemClick = (item) => {
    if (!item.isTitle) {
      if (item.id === "log-out") {
        handleLogout();
      } else if (item.id === "account-information") {
        handleUserInfo();
      } else if (item.id === "change-password") {
        handleChangePassword();
      } else if (item.path) {
        navigate(item.path);
        setSettingsDrawerOpen(false);
      }
    }
  };

  const getCurrentBottomNavValue = () => {
    const currentPath = location.pathname;

    // Special handling for settings submenu
    if (currentPath.startsWith("/settings") || settingsDrawerOpen) {
      return bottomNavItems.findIndex((item) => item.id === "settings");
    }

    const index = bottomNavItems.findIndex(
      (item) => item.path && currentPath === item.path
    );

    return index >= 0 ? index : 0;
  };

  return (
    <>
      {/* Bottom Navigation */}
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.drawer + 1,
          borderTop: 1,
          borderColor: "divider",
        }}
        elevation={3}
      >
        <BottomNavigation
          value={getCurrentBottomNavValue()}
          onChange={handleBottomNavChange}
          showLabels
          sx={{
            height: 60,
            "& .MuiBottomNavigationAction-root": {
              minWidth: 0,
              fontSize: "0.75rem",
              padding: "6px 12px 8px",
              "& .MuiBottomNavigationAction-label": {
                fontSize: "0.7rem",
                marginTop: "4px",
                "&.Mui-selected": {
                  fontSize: "0.7rem",
                },
              },
              "& .MuiSvgIcon-root": {
                fontSize: "1.2rem",
              },
            },
          }}
        >
          {bottomNavItems.map((item) => (
            <BottomNavigationAction
              key={item.id}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </BottomNavigation>
      </Paper>

      {/* Settings Drawer */}
      <Drawer
        anchor="bottom"
        open={settingsDrawerOpen}
        onClose={() => setSettingsDrawerOpen(false)}
        PaperProps={{
          sx: {
            maxHeight: "85vh",
            height: "75vh",
            borderRadius: "16px 16px 0 0",
            backgroundColor: "background.paper",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="h6" gutterBottom color="text.primary">
            Thiết lập
          </Typography>
        </Box>
        <Divider />
        <List
          sx={{ pt: 1, pb: 8, overflow: "auto", overflowX: "hidden", flex: 1 }}
        >
          {settingsSubmenu.map((item) => (
            <div key={item.id}>
              {item.isTitle ? (
                <ListItem sx={{ pt: 2, pb: 1 }}>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: "subtitle2",
                      color: "primary",
                      fontWeight: "bold",
                      fontSize: "0.85rem",
                    }}
                  />
                </ListItem>
              ) : (
                <ListItem
                  component="button"
                  onClick={() => handleSettingsItemClick(item)}
                  sx={{
                    pl: 3,
                    py: 1.5,
                    backgroundColor:
                      location.pathname === item.path
                        ? "action.selected"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                    borderRadius: 1,
                    mx: 1,
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      color: "text.primary",
                    }}
                  />
                </ListItem>
              )}
            </div>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default MobileBottomNavigation;
