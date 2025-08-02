import { useState } from "react";

import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Link,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Switch,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    PiCards,
    PiGear,
    PiList,
    PiPlus,
    PiMoonStars,
    PiSun,
    PiSpeakerHigh,
    PiSpeakerSlash,
} from "react-icons/pi";

import { useDarkMode } from "../hooks/useDarkMode";
import { useAudioToggle } from "../hooks/useAudioToggle";

import type { ComponentType, SVGProps } from "react";

interface HeaderProps {
    currentPage: "cards" | "custom" | "settings";
    setPage: React.Dispatch<
        React.SetStateAction<"cards" | "custom" | "settings">
    >;
}

interface LinkItem {
    icon: ComponentType<SVGProps<SVGSVGElement>> | null;
    title: string;
    page: string;
}

const LINKS: LinkItem[] = [
    {
        icon: PiCards,
        title: "Cards",
        page: "cards",
    },
    {
        icon: PiPlus,
        title: "Custom Cards",
        page: "custom",
    },
    {
        icon: PiGear,
        title: "Settings",
        page: "settings",
    },
    {
        icon: null,
        title: "Audio Toggle",
        page: "#",
    },
    {
        icon: null,
        title: "Dark Mode Toggle",
        page: "#",
    },
];

// Hoizontal Buttons for Desktop
function NavListDesktop({
    setPage,
    currentPage,
}: {
    setPage: HeaderProps["setPage"];
    currentPage: HeaderProps["currentPage"];
}): JSX.Element {
    const { isDark, toggleMode } = useDarkMode();
    const { isAudioEnabled, toggleAudio } = useAudioToggle();
    return (
        <Box
            sx={{
                display: { xs: "none", lg: "grid" },
                gridTemplateColumns: "repeat(5, max-content)",
                justifyContent: "end",
                width: "100%",
                gap: 4,
            }}
        >
            {LINKS.map(({ icon: Icon, title, page }) => {
                if (title === "Audio Toggle") {
                    return (
                        <Tooltip
                            key={title}
                            title={isAudioEnabled ? "Audio On" : "Audio Off"}
                        >
                            <IconButton
                                onClick={toggleAudio}
                                color="inherit"
                                size="small"
                                sx={{ p: 2 }}
                            >
                                {isAudioEnabled ? <PiSpeakerHigh /> : <PiSpeakerSlash />}
                            </IconButton>
                        </Tooltip>
                    );
                }
                if (title === "Dark Mode Toggle") {
                    return (
                        <Tooltip key={title} title={isDark ? "Dark Mode" : "Light Mode"}>
                            <IconButton
                                onClick={toggleMode}
                                color="inherit"
                                size="small"
                                sx={{ p: 2 }}
                            >
                                {isDark ? <PiMoonStars /> : <PiSun />}
                            </IconButton>
                        </Tooltip>
                    );
                } else {
                    return (
                        <Button
                            variant="text"
                            color="text.primary"
                            key={title}
                            startIcon={Icon && <Icon />}
                            onClick={() =>
                                page && setPage(page as HeaderProps["currentPage"])
                            }
                            sx={{
                                borderBottom: currentPage === page ? "2px solid" : "",
                                borderColor: "text.primary",
                                borderRadius: 0,
                                px: 1,
                            }}
                        >
                            {title}
                        </Button>
                    );
                }
            })}
        </Box>
    );
}

// Drop Down Nav List On Mobile
function NavDropDownList({
    setPage,
    currentPage,
    onClose,
}: {
    setPage: HeaderProps["setPage"];
    currentPage: HeaderProps["currentPage"];
    onClose: () => void;
}): JSX.Element {
    const { isDark, toggleMode } = useDarkMode();
    const { isAudioEnabled, toggleAudio } = useAudioToggle();
    return (
        <>
            {LINKS.map(({ icon: Icon, title, page }) => {
                if (title === "Audio Toggle") {
                    return (
                        <MenuItem key={title}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                {isAudioEnabled ? <PiSpeakerHigh /> : <PiSpeakerSlash />}
                            </ListItemIcon>
                            <ListItemText>
                                {isAudioEnabled ? "Audio On" : "Audio Off"}
                            </ListItemText>
                            <Switch
                                edge="end"
                                checked={!!isAudioEnabled}
                                onChange={toggleAudio}
                                slotProps={{
                                    input: {
                                        "aria-label": "Audio Toggle Switch",
                                    },
                                }}
                                color="secondary"
                            />
                        </MenuItem>
                    );
                }
                if (title === "Dark Mode Toggle") {
                    return (
                        <MenuItem key={title}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                {isDark ? <PiMoonStars /> : <PiSun />}
                            </ListItemIcon>
                            <ListItemText>
                                {isDark ? "Dark Mode Active" : "Light Mode Active"}
                            </ListItemText>
                            <Switch
                                edge="end"
                                checked={isDark}
                                onChange={toggleMode}
                                slotProps={{
                                    input: {
                                        "aria-label": "Dark Mode Switch",
                                    },
                                }}
                                color="secondary"
                            />
                        </MenuItem>
                    );
                } else {
                    return (
                        <MenuItem
                            key={title}
                            selected={page === currentPage}
                            onClick={(e) => {
                                e.preventDefault();
                                if (page && page !== "#") {
                                    setPage(page as HeaderProps["currentPage"]);
                                }
                                onClose();
                            }}
                        >
                            <ListItemIcon key={`${title}-icon`}>
                                {Icon && <Icon />}
                            </ListItemIcon>
                            <ListItemText>{title}</ListItemText>
                        </MenuItem>
                    );
                }
            })}
        </>
    );
}

function Header({ currentPage, setPage }: HeaderProps) {
    const [openNav, setOpenNav] = useState<null | HTMLElement>(null);

    const handleNavOpen = (e: React.MouseEvent<HTMLElement>) => {
        setOpenNav(e.currentTarget);
    };

    const handleNavClose = () => {
        setOpenNav(null);
    };

    return (
        <AppBar color="primary" enableColorOnDark sx={{ p: 1, zIndex: 1 }}>
            <Container maxWidth={false}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h1"
                        noWrap
                        sx={{
                            mr: 2,
                            p: 1,
                            minWidth: "9ch",
                            color: "text.primary",
                            display: { xs: "none", lg: "flex" },
                            fontSize: "3.5em",
                            flexGrow: 1
                        }}
                    >
                        <Link component="button"
                            onClick={() => setPage("cards")}
                            sx={{
                                color: "text.primary",
                                textDecoration: "none",
                                "&a": {

                                    textDecoration: "none",
                                },
                                textUnderlineOffset: "0.75rem",
                                "&:hover": {
                                    textDecoration: "underline",
                                    textDecorationColor: "text.primary",
                                },
                            }}
                        >
                            Open Flow
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" } }}>
                        <IconButton
                            size="large"
                            aria-controls="nav-menu"
                            aria-haspopup="true"
                            onClick={handleNavOpen}
                        >
                            <PiList />
                        </IconButton>
                        <Menu
                            id="nav-menu"
                            anchorEl={openNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(openNav)}
                            onClose={handleNavClose}
                            sx={{
                                display: { xs: "block", lg: "none" },
                            }}
                        >
                            <NavDropDownList
                                setPage={setPage}
                                currentPage={currentPage}
                                onClose={handleNavClose}
                            />
                        </Menu>
                    </Box>
                    <Typography
                        variant="h1"
                        noWrap
                        sx={{
                            mr: 2,
                            p: 1,
                            color: "text.primary",
                            minWidth: "9ch",
                            display: { xs: "flex", lg: "none" },
                            fontSize: "3.5em",
                            flexGrow: 1
                        }}
                    >
                        <Link component="button"
                            onClick={() => setPage("cards")}
                            sx={{
                                color: "text.primary",
                                textDecoration: "none",
                                "&a": {

                                    textDecoration: "none",
                                },
                                textUnderlineOffset: "0.75rem",
                                "&:hover": {
                                    textDecoration: "underline",
                                    textDecorationColor: "text.primary",
                                },
                            }}
                        >
                            Open Flow
                        </Link>
                    </Typography>
                    <NavListDesktop setPage={setPage} currentPage={currentPage} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
