import { Box, Typography } from "@mui/material";
import LayoutWrapper from "~/components/Layout/LayoutWrapper";

function CableLines() {
  return (
    <LayoutWrapper>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Thông tin tuyến
        </Typography>
        <Typography variant="body1">
          Trang thông tin tuyến đang được phát triển...
        </Typography>
      </Box>
    </LayoutWrapper>
  );
}

export default CableLines;
