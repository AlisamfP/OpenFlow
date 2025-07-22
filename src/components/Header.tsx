import { useEffect, useState } from "react";

import {
    IconButton,
    Typography,
    Collapse,
    Navbar,
} from "@material-tailwind/react";
import { PiCards, PiGear, PiList, PiPlus, PiX } from "react-icons/pi";

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

function NavList(): JSX.Element {
    return (
        <ul className="mt-4 flex flex-col gap-x-6 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
            {LINKS.map(({ icon: Icon, title, href }) => {
                if (title === "Audio Toggle") {
                    return (
                        <li key={title} className="hover:bg-primary-alt p-2 rounded-md">
                            <AudioToggle />
                        </li>
                    );
                }
                if (title === "Dark Mode Toggle") {
                    return (
                        <li key={title} className="hover:bg-primary-alt p-2 rounded-md">
                            <DarkModeToggle />
                        </li>
                    );
                } else {
                    return (
                        <li key={title} className="hover:bg-primary-alt p-2 rounded-md">
                            <Typography as="a" href={href} className="flex items-center gap-x-2 p-1 text-2xl">
                                {Icon && <Icon />}
                                {title}
                            </Typography>
                        </li>
                    );
                }
            })}
        </ul>
    );
}

function Header() {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    return (
        <header className="bg-secondary">
            {/* <h1 className="text-4xl lg:px-2 lg:py-0">
                <a href="index.html">Open Flow</a>
            </h1> */}
            <Navbar className="mx-auto w-full max-w-screen bg-secondary">
                <div className="flex items-center gap-4">
                    <Typography
                        as="a"
                        type="h1"
                        href="#"
                        className={`-ml-2 block py-1 px-6 font-semibold min-w-max ${openNav ? "border-b-2" : ""}`}
                    >
                        Open Flow
                    </Typography>
                    {/* <hr className="ml-1 mr-1.5 hidden h-6 w-px border-l border-t-0 border-card-back lg:block" /> */}
                    <div className="hidden lg:block w-full">
                        <NavList />
                    </div>
                    <IconButton
                        size="lg"
                        onClick={() => setOpenNav(!openNav)}
                        className="ml-auto grid lg:hidden"
                    >
                        {openNav ? (
                            <PiX className="text-2xl" />
                        ) : (
                            <PiList className="text-2xl" />
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <NavList />
                </Collapse>
            </Navbar>
           
        </header>
    );
}

export default Header;
