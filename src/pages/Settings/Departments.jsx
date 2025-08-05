import { Box, Typography } from "@mui/material";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";

function Departments() {
  return (
    <LayoutWrapper>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh mục phòng ban
        </Typography>
        <Typography variant="body1">
          Trang quản lý phòng ban đang được phát triển...
        </Typography>
      </Box>
    </LayoutWrapper>
  );
}

export default Departments;