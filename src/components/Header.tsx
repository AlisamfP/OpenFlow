"use client";
import { useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
} from "@mui/material";
import {
  PiCards,
  PiGear,
  PiInfo,
  PiList,
  PiPlus,
  PiMoonStars,
  PiSun,
  PiSpeakerHigh,
  PiSpeakerSlash,
} from "react-icons/pi";

// import { useDarkMode } from "../hooks/useDarkMode";
// import { useAudioToggle } from "../hooks/useAudioToggle";

import type { ComponentType, SVGProps } from "react";
import { usePathname, useRouter } from "next/navigation";
import useWindowSize from "@/hooks/useWindowSize";
// import type { navOptions } from "../types/navTypes";

// interface HeaderProps {
//   currentPage: navOptions;
//   setPage: React.Dispatch<React.SetStateAction<navOptions>>;
// }

interface LinkItem {
  icon: ComponentType<SVGProps<SVGSVGElement>> | null;
  title: string;
  path: string;
}

const LINKS: LinkItem[] = [
  {
    icon: PiCards,
    title: "Cards",
    path: "/",
  },
  {
    icon: PiPlus,
    title: "Custom Cards",
    path: "/custom",
  },
  {
    icon: PiGear,
    title: "Settings",
    path: "/settings",
  },
  {
    icon: PiInfo,
    title: "About",
    path: "/about",
  },
];

// Hoizontal Buttons for Desktop
function NavListDesktop() {
  const router = useRouter();
  const pathname = usePathname();

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
      {LINKS.map(({ icon: Icon, title, path }) => {
        return (
          <Button
            variant="text"
            key={title}
            startIcon={Icon && <Icon />}
            onClick={() => router.push(path)}
            disableFocusRipple
            sx={{
              color: "text.primary",
              borderBottom: "2px solid transparent",
              borderColor:
                pathname === path ? "primary.dark" : "transparent",
              borderRadius: 0,
              px: 1,
              "&:hover": {
                borderBottom: "2px solid",
                borderColor: "primary.dark",
              },
            }}
          >
            {title}
          </Button>
        );
      })}
    </Box>
  );
}

function Header() {
  const [openNav, setOpenNav] = useState<null | HTMLElement>(null);
//   const { isDark, toggleMode } = useDarkMode();
//   const { isAudioEnabled, toggleAudio } = useAudioToggle();

  // using breakpoint checker to hide/show aria stuff on h1
  const { width } = useWindowSize();
  const isDesktop = width >= 1200;

  const handleNavOpen = (e: React.MouseEvent<HTMLElement>) => {
    setOpenNav(e.currentTarget);
  };

  const handleNavClose = () => {
    setOpenNav(null);
  };

  const router = useRouter();
  const pathname = usePathname();

  return (
    <AppBar
      color="primary"
      enableColorOnDark
      sx={{ p: 1, zIndex: 2, alignItems: "center" }}
    >
      <Toolbar disableGutters sx={{ width: "100%" }}>
        {/* desktop title/h1 */}
        {isDesktop && (
          <Link
            component="h1"
            underline="none"
            color="textPrimary"
            variant="h1"
            onClick={() => router.push("/")}
            sx={{
              cursor: "pointer",
              pl: 2,
              minWidth: "8.5ch",
              color: "text.primary",
              display: "flex",
              fontSize: "3.5em",
              textAlign: "center",
              flexGrow: 1,
              borderBottom: "2px solid transparent",
              "&:hover": {
                borderColor: "text.primary",
              },
            }}
          >
            Open Flow
          </Link>
        )}

        {/* mobile navigation menu */}
        {!isDesktop && (
          <Box sx={{ flexGrow: 1, display: "flex" }}>
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
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(openNav)}
              onClose={handleNavClose}
              autoFocus
              sx={{ display: "block" }}
            >
              {LINKS.map(({ icon: Icon, title, path }) => (
                <MenuItem
                  key={title}
                  selected={pathname === path}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(path);
                    handleNavClose();
                  }}
                  sx={{ p: 2 }}
                >
                  <ListItemIcon>{Icon && <Icon />}</ListItemIcon>
                  <ListItemText>{title}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        {/* mobile menu h1/title */}
        {!isDesktop && (
          <Link
            component="h1"
            underline="none"
            color="textPrimary"
            variant="h1"
            onClick={() => router.push("/")}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") router.push("/");
            }}
            sx={{
              cursor: "pointer",
              minWidth: "9ch",
              color: "text.primary",
              justifyContent: "center",
              display: { xs: "flex", lg: "none" },
              fontSize: "2.5em",
              flexGrow: 1,
              borderBottom: "2px solid transparent",
              "&:hover": {
                borderColor: "text.primary",
              },
            }}
          >
            Open Flow
          </Link>
        )}

        {/* desktop navigation */}
        {isDesktop && (
          <NavListDesktop />
        )}
        {/* <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            pl: { xs: 1, md: 2 },
            justifyContent: "end",
          }}
        >
          <Divider
            orientation="vertical"
            sx={{ mr: { xs: 0, sm: 2 } }}
            flexItem
          />
          <Tooltip arrow title={isAudioEnabled ? "Audio On" : "Audio Off"}>
            <IconButton
              onClick={toggleAudio}
              color="inherit"
              size="small"
              sx={{
                mr: { xs: 0, sm: 2 },
                ml: 1,
                p: { xs: 1, sm: 2 },
              }}
            >
              {isAudioEnabled ? <PiSpeakerHigh /> : <PiSpeakerSlash />}
            </IconButton>
          </Tooltip>

          <Tooltip arrow title={isDark ? "Dark Mode" : "Light Mode"}>
            <IconButton
              onClick={toggleMode}
              color="inherit"
              size="small"
              sx={{ mr: { xs: 0, sm: 2 }, p: { xs: 1, sm: 2 } }}
            >
              {isDark ? <PiMoonStars /> : <PiSun />}
            </IconButton>
          </Tooltip>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
