import { Box, Typography } from "@mui/material";
import LayoutWrapper from "~/components/Layout/LayoutWrapper";

function Incidents() {
  return (
    <LayoutWrapper>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Theo dõi sự cố
        </Typography>
        <Typography variant="body1">
          Trang theo dõi sự cố đang được phát triển...
        </Typography>
      </Box>
    </LayoutWrapper>
  );
}

export default Incidents;
