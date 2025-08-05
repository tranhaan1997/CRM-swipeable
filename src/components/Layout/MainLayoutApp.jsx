import { Box, AppBar, Toolbar, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "~/AppContext";

import ModeSwitcher from "../UI/ModeSwitcher";
import NotificationMenu from "./Header/NotificationMenu";
import MobileBottomNavigation from "./MobileBottomNavigation";
import LogoLight from "~/assets/Logo/logo_act_white_theme.png";
import LogoDark from "~/assets/Logo/logo_act_dark_theme.png";

function MainLayoutApp({ children }) {
  const theme = useTheme();
  const { header } = useAppContext();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Top AppBar */}
      {!header && (
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "background.paper",
            color: "text.primary",
            boxShadow: "none",
            borderBottom: 1,
            borderColor: "divider",
            minHeight: "56px",
          }}
        >
          <Toolbar sx={{ minHeight: "56px !important", height: "56px" }}>
            {/* Logo và tên dự án */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Box
                sx={{
                  mr: 1,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleLogoClick}
              >
                <img
                  src={isDark ? LogoDark : LogoLight}
                  alt="Logo"
                  style={{ height: "100%", objectFit: "contain" }}
                />
              </Box>
              {/* <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                }}
                onClick={handleLogoClick}
              >
                CRM System
              </Typography> */}
            </Box>

            {/* Các icon bên phải */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                height: "56px",
              }}
            >
              <ModeSwitcher />
              <NotificationMenu />
            </Box>
          </Toolbar>
        </AppBar>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: header ? "0px" : "56px",
          marginBottom: "60px", // Space for bottom navigation
          overflow: "auto",
          backgroundColor: "background.default",
        }}
      >
        {children}
      </Box>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNavigation />
    </Box>
  );
}

export default MainLayoutApp;
