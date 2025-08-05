import { Box, Divider, Link, Typography } from "@mui/material";

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
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "center",
          py: 1,
          px: 2,
          zIndex: 2,
          gap: {xs: 0, lg: 2}
        }}
      >
        <Typography variant="body2">
          Site created by Alisa Palson</Typography>
          <Divider orientation="vertical" flexItem sx={{display: {xs: 'none', lg: 'block'}}} />
        <Typography variant="body2">
          Icons by: 
          <Link variant="body2" color="text.primary" href="https://openmoji.org/" sx={{ml: 1}}>
          OpenMoji
          </Link>
        </Typography>
      </Box>
    </footer>
  );
}

export default Footer;
