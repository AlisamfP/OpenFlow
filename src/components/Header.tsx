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

import { useDarkMode } from "../hooks/useDarkMode";
import { useAudioToggle } from "../hooks/useAudioToggle";

import type { ComponentType, SVGProps } from "react";
import type { navOptions } from "../types/navTypes";

interface HeaderProps {
  currentPage: navOptions;
  setPage: React.Dispatch<React.SetStateAction<navOptions>>;
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
    icon: PiInfo,
    title: "About",
    page: "about",
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
        return (
          <Button
            variant="text"
            key={title}
            startIcon={Icon && <Icon />}
            onClick={() => page && setPage(page as HeaderProps["currentPage"])}
            sx={{
              color: "text.primary",
              borderBottom: currentPage === page ? "2px solid" : "",
              borderColor: "text.primary",
              borderRadius: 0,
              px: 1,
            }}
          >
            {title}
          </Button>
        );
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
  return (
    <>
      {LINKS.map(({ icon: Icon, title, page }) => {
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
            sx={{ p: 2 }}
          >
            <ListItemIcon key={`${title}-icon`}>
              {Icon && <Icon />}
            </ListItemIcon>
            <ListItemText>{title}</ListItemText>
          </MenuItem>
        );
      })}
    </>
  );
}

function Header({ currentPage, setPage }: HeaderProps) {
  const [openNav, setOpenNav] = useState<null | HTMLElement>(null);
  const { isDark, toggleMode } = useDarkMode();
  const { isAudioEnabled, toggleAudio } = useAudioToggle();

  const handleNavOpen = (e: React.MouseEvent<HTMLElement>) => {
    setOpenNav(e.currentTarget);
  };

  const handleNavClose = () => {
    setOpenNav(null);
  };

  return (
    <AppBar
      color="primary"
      enableColorOnDark
      sx={{ p: 1, zIndex: 2, alignItems: "center" }}
    >
      <Toolbar disableGutters sx={{ width: "100%" }}>
        <Link
          component="h1"
          underline="none"
          color="textPrimary"
          variant="h1"
          onClick={() => setPage("cards")}
          sx={{
            cursor: "pointer",
            pl: 2,
            minWidth: "8.5ch",
            color: "text.primary",
            display: { xs: "none", lg: "flex" },
            fontSize: "3.5em",
            textAlign: 'center',
            flexGrow: 1,
            borderBottom: "2px solid transparent",
            "&:hover": {
              borderColor: "text.primary"
            }
          }}
        >
          Open Flow
        </Link>
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
        <Link
          component="h1"
          underline="none"
          color="textPrimary"
          variant="h1"
          onClick={() => setPage("cards")}
          sx={{
            cursor: 'pointer',
            minWidth: "9ch",
            color: "text.primary",
            justifyContent: 'center',
            display: { xs: "flex", lg: "none" },
            fontSize: "2.5em",
            flexGrow: 1,
                        borderBottom: "2px solid transparent",
            "&:hover": {
              borderColor: "text.primary"
            }
          }}
        >
          Open Flow
        </Link>
        <NavListDesktop setPage={setPage} currentPage={currentPage} />
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            pl: { xs: 1, md: 2 },
            justifyContent: "end",
          }}
        >
          <Divider orientation="vertical" sx={{ mr: {xs: 0, sm: 2} }} flexItem />
          <Tooltip arrow title={isAudioEnabled ? "Audio On" : "Audio Off"}>
            <IconButton
              onClick={toggleAudio}
              color="inherit"
              size="small"
              sx={{ 
                mr: { xs: 0, sm: 2 }, 
                ml: 1 ,
                p: { xs: 1, sm: 2 } }}
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
