import { useState } from "react";

import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Switch,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import { PiCards, PiGear, PiList, PiPlus, PiMoonStars, PiSun, PiSpeakerHigh, PiSpeakerSlash } from "react-icons/pi";

import AudioToggle from "./AudioToggle";
import { useDarkMode } from "../hooks/useDarkMode";

import type { ComponentType, SVGProps } from "react";
import { useAudioToggle } from "../hooks/useAudioToggle";

interface LinkItem {
    icon: ComponentType<SVGProps<SVGSVGElement>> | null;
    title: string;
    href: string;
}

const LINKS: LinkItem[] = [
    {
        icon: PiCards,
        title: "Cards",
        href: "#",
    },
    {
        icon: PiPlus,
        title: "Custom Cards",
        href: "#",
    },
    {
        icon: PiGear,
        title: "Settings",
        href: "#",
    },
    {
        icon: null,
        title: "Audio Toggle",
        href: "#",
    },
    {
        icon: null,
        title: "Dark Mode Toggle",
        href: "#",
    },
];

// Hoizontal Buttons for Desktop
function NavListDesktop(): JSX.Element {
    const { isDark, toggleMode } = useDarkMode();
    const { isAudioOn, toggleAudio } = useAudioToggle();
    return (
        <Box sx={{ display: { xs: "none", lg: "grid" }, gridTemplateColumns: 'repeat(5, max-content)', justifyContent: 'end', width: '100%', gap: 4 }}>
            {LINKS.map(({ icon: Icon, title, href }) => {
                if (title === "Audio Toggle") {
                    return (
                        <Tooltip key={title} title={isAudioOn ? "Audio On" : "Audio Off"}>
                            <IconButton onClick={toggleAudio} color="inherit" size="small" sx={{ ml: 1 }}>
                                {isAudioOn ? <PiSpeakerHigh /> : <PiSpeakerSlash />}
                            </IconButton>
                        </Tooltip>
                    );
                }
                if (title === "Dark Mode Toggle") {
                    return (
                        <Tooltip key={title} title={isDark ? "Dark Mode" : "Light Mode"}>
                            <IconButton onClick={toggleMode} color="inherit" size="small" sx={{ ml: 1 }}>
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
                            component="a"
                            href={href}
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
function NavDropDownList(): JSX.Element {
    const { isDark, toggleMode } = useDarkMode();
    const { isAudioOn, toggleAudio } = useAudioToggle();
    return (
        <>
            {LINKS.map(({ icon: Icon, title, href }) => {
                if (title === "Audio Toggle") {
                    return (
                        <MenuItem key={title}>
                            <ListItemIcon sx={{ minWidth: "30px" }}>
                                {isAudioOn ? <PiSpeakerHigh /> : <PiSpeakerSlash />}
                            </ListItemIcon>
                            <ListItemText>
                                {isAudioOn ? "Audio On" : "Audio Off"}
                            </ListItemText>
                            <Switch
                                edge="end"
                                checked={isAudioOn}
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
                        <MenuItem key={title} component="a" href={href}>
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

function Header() {

    const [openNav, setOpenNav] = useState<null | HTMLElement>(null);

    const handleNavOpen = (e: React.MouseEvent<HTMLElement>) => {
        setOpenNav(e.currentTarget);
    };

    const handleNavClose = () => {
        setOpenNav(null);
    };

    return (
        <AppBar color="primary" enableColorOnDark sx={{ p: 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h1"
                        noWrap
                        component="a"
                        href="index.html"
                        sx={{
                            mr: 2,
                            minWidth: '9ch',
                            display: { xs: "none", lg: "flex" },
                            textDecoration: "none",
                            fontSize: "2.75em",
                            color: "text.primary",
                        }}
                    >
                        Open Flow
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
                            <NavDropDownList />
                        </Menu>
                    </Box>
                    <Typography
                        variant="h1"
                        noWrap
                        component="a"
                        href="index.html"
                        sx={{
                            mr: 2,
                            p: 2,
                            color: "text.primary",
                            display: { xs: "flex", lg: "none" },
                            flexGrow: 1,
                            textDecoration: "none",
                            textUnderlineOffset: "0.75rem",
                            fontSize: "2.75em",
                            "& a": {
                                color: "inherit",
                            },
                            "&:hover": {
                                textDecoration: "underline",
                                textDecorationColor: "text.primary",
                            },
                        }}
                    >
                        Open Flow
                    </Typography>
                    <NavListDesktop />
                </Toolbar>
            </Container>
        </AppBar>
        // <header className="bg-secondary">

        //     <Navbar className="mx-auto w-full max-w-screen bg-secondary">
        //         <div className="flex items-center gap-4">
        //             <Typography
        //                 as="a"
        //                 type="h1"
        //                 href="index.html"
        //                 className={`-ml-2 block py-1 px-6 font-semibold min-w-max ${openNav ? "border-b-2" : ""}`}
        //             >
        //                 Open Flow
        //             </Typography>
        //             <div className="hidden lg:block w-full">
        //                 <NavList />
        //             </div>
        //             <IconButton
        //                 size="lg"
        //                 onClick={() => setOpenNav(!openNav)}
        //                 className="ml-auto grid lg:hidden"
        //             >
        //                 {openNav ? (
        //                     <PiX className="text-2xl" />
        //                 ) : (
        //                     <PiList className="text-2xl" />
        //                 )}
        //             </IconButton>
        //         </div>
        //         <Collapse open={openNav}>
        //             <NavList />
        //         </Collapse>
        //     </Navbar>

        // </header>
    );
}

export default Header;
