import { Box, Typography } from "@mui/material";
import type React from "react";

const About: React.FC = () => {
    return (
        <>
            <Typography variant="h2">About</Typography>
            <Box component="section">
                <Typography variant="h3">What is it?</Typography>
                Open Flow is an open source AAC communication tool.
            </Box>
            <Box>
                <Typography>How does it work?</Typography>
                Click on a card to have the text spoken out loud.
            </Box>
        </>
    )
}

export default About;