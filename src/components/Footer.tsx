import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: "primary.main",
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 1,
          px: 2,
          zIndex: 2,
          borderTop: "1px solid",
          borderColor: "text.primary"
        }}
      >
        <Typography variant="body2">Site created by Alisa Palson</Typography>
        <Typography variant="body2">
          Icons by: <a href="https://openmoji.org/">OpenMoji</a>
        </Typography>
      </Box>
    </footer>
  );
}

export default Footer;
