import { Box, Typography } from "@mui/material";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";

function Users() {
  return (
    <LayoutWrapper>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Quản lý người dùng
        </Typography>
        <Typography variant="body1">
          Trang quản lý người dùng đang được phát triển...
        </Typography>
      </Box>
    </LayoutWrapper>
  );
}

export default Users;