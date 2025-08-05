import { Box, Typography } from "@mui/material";
import LayoutWrapper from "~/components/Layout/LayoutWrapper";

function Contracts() {
  return (
    <LayoutWrapper>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Quản lý hợp đồng
        </Typography>
        <Typography variant="body1">
          Trang quản lý hợp đồng đang được phát triển...
        </Typography>
      </Box>
    </LayoutWrapper>
  );
}

export default Contracts;
