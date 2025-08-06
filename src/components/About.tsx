import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    AlertTitle,
    Box,
    Divider,
    Typography,
} from "@mui/material";
import type React from "react";
import { PiCaretDown } from "react-icons/pi";

const About: React.FC = () => {
    return (
        <>
            <Typography variant="h3" color="text.secondary">
                About
            </Typography>
            <Box mt={2} sx={{ mb: 10 }}>
                <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<PiCaretDown size={30} />}>
                        <Typography variant="h5">
                            What is Open Flow?
                        </Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails sx={{p:2}}>
                        <Typography variant="body2">
                            Open Flow is a free, open-source communication tool designed to support people with speech or language challenges. Inspired by my own use of communication cards, and more specifically my tendency to lose them, this app serves as a digital set of communication cards. It allows users to not only use the cards provided, but generate their own custom cards and utilize text-to-speech to have the words or phrases spoken aloud.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<PiCaretDown size={30} />}>
                        <Typography variant="h5">
                            What is AAC?
                        </Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails sx={{py:2}}>
                        <Typography variant="body2">
                            AAC stands for Augmentative and Alternative Communication. AAC devices help people with speech or language impairments
                            communicate by providing ways to express themselves using symbols, text, or speech output. Open Flow enables your phone to become an AAC device.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<PiCaretDown size={30} />}>
                        <Typography variant="h5">
                            How do I use the website?
                        </Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails sx={{py:2}}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Box>
                                <Typography variant="h6">
                                    Card Viewer
                                </Typography>
                                <Typography variant="body2">
                                    Click on any card to hear its text spoken aloud. Navigate between categories using the tabs at the top. You can favorite cards for quick access.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">
                                    Card Creation
                                </Typography>
                                <Typography variant="body2">
                                    Create a card by entering text and choosing an icon. Your custom cards are saved automatically and can be found in the Custom category.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">
                                    Settings
                                </Typography>
                                <Typography variant="body2">
                                    Customize the default category, voice used for speech, and other text-to-speech options. Your preferences are saved in your browser.
                                </Typography>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<PiCaretDown size={30} />}>
                        <Typography variant="h5">
                            What does Audio Off mode do?
                        </Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails sx={{py:2}}>
                        <Typography variant="body2">
                            When Audio Off mode is enabled, clicking on cards will not play any speech. The cards will instead show in full screen. This can be useful in quiet environments or when you only want to show the text.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion >
                    <AccordionSummary expandIcon={<PiCaretDown size={30} />}>
                        <Typography variant="h5">
                            How is everything saved?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography variant="body2">
                            Open Flow saves your custom cards, favorites, and settings directly in your browser using local storage. This means everything stayed saved on your device, so your data won't disappear when you close the tab or turn off your computer.
                        </Typography>
                        <Alert severity="warning">
                            <AlertTitle>
                                Important Note About Local Storage
                            </AlertTitle>
                            Data saved in your browser’s local storage may be lost if you clear your cache or site data. For long-term access, avoid clearing your browser storage.
                        </Alert>
                        <Typography variant="body2">
                            The ability to create an account and sync data across devices is planned for a future version.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    );
};

export default About;
