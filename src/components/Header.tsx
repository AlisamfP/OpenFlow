import { useEffect, useState } from "react";

import {
    Box,
    Container,
    IconButton,
    Typography,
    Button,
    Menu,
    MenuItem,
    AppBar,
    Toolbar,
} from "@mui/material";
import {
    PiCards,
    PiGear,
    PiList,
    PiPlus
} from "react-icons/pi";

import AudioToggle from "./AudioToggle";
import DarkModeToggle from "./DarkModeToggle";

import type { ComponentType, SVGProps } from "react";

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

function NavListDesktop(): JSX.Element {
    return (
        <Box sx={{flexGrow: 1, display: { xs: 'none', md: 'flex'}}}>
        {LINKS.map(({ icon: Icon, title, href }) => {
            if (title === "Audio Toggle") {
                return (
                    <div key={title}>

                        <AudioToggle />
                    </div>
                );
            }
            if (title === "Dark Mode Toggle") {
                return (
                    <div key={title}>

                    <DarkModeToggle />
                    </div>
                );
            } else {
                return (
                    <Button key={title}>
                        <Typography component="a" href={href} className="text-text">
                            {Icon && <Icon />}
                            {title}
                        </Typography>
                    </Button>
                );
            }
        })}        
        </Box>
    )
}

function NavDropDownList(): JSX.Element {
    return (
    <>
        {LINKS.map(({ icon: Icon, title, href }) => {
            if (title === "Audio Toggle") {
                return (
                    <MenuItem key={title} className="hover:bg-primary-alt p-2 rounded-md">
                        <AudioToggle />
                    </MenuItem>
                );
            }
            if (title === "Dark Mode Toggle") {
                return (
                    <MenuItem key={title} className="hover:bg-primary-alt p-2 rounded-md">
                        <DarkModeToggle />
                    </MenuItem>
                );
            } else {
                return (
                    <MenuItem key={title}>
                        <Typography component="a" href={href} className="text-text">
                            {Icon && <Icon />}
                            {title}
                        </Typography>
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
    }

    const handleNavClose = () => {
        setOpenNav(null);
    }

    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h1"
                        noWrap
                        component="a"
                        href="index.html"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            textDecoration: 'none',
                            fontSize: '2.75em'
                        }}
                    >
                        Open Flow
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'}}}>
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
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(openNav)}
                            onClose={handleNavClose}
                            sx={{
                                display: {xs: 'block', md: 'none'}
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
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            textDecoration: 'none',
                            fontSize: '2.75em'
                        }}
                    >
                        Open Flow
                    </Typography>
                    <NavListDesktop/>
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
