import { Box, Typography } from "@mui/material";
import LayoutWrapper from "~/components/Layout/LayoutWrapper";

function Customers() {
  return (
    <LayoutWrapper>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Thông tin khách hàng
        </Typography>
        <Typography variant="body1">
          Trang thông tin khách hàng đang được phát triển...
        </Typography>
      </Box>
    </LayoutWrapper>
  );
}

export default Customers;
