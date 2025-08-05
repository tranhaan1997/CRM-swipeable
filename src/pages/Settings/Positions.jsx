import { Box, Typography } from "@mui/material";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";

function Positions() {
  return (
    <LayoutWrapper>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Danh mục vị trí công việc
        </Typography>
        <Typography variant="body1">
          Trang quản lý vị trí công việc đang được phát triển...
        </Typography>
      </Box>
    </LayoutWrapper>
  );
}

export default Positions;