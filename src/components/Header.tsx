
function Header() {

    return (
        <header className="bg-secondary grid grid-cols-[1fr_2fr] items-end px-4">
            <h1 className="text-4xl lg:px-2 lg:py-0">
                <a href="index.html">Open Flow</a>
            </h1>
            <nav className="sm:[grid-area:1/1/1/1]">
                <ul id="nav-list" className="grid grid-cols-[1fr_1fr_1fr_max-content_max-content] list-none justify-between items-end gap-2">
                    <li className="flex flex-col px-2 py-1 justify-center text-center">
                        <a className="p-2 text-text flex flex-col items-center" href="#">
                            Cards
                        </a>
                    </li>
                    <li className="flex flex-col px-2 py-1 justify-center text-center">
                        <a className="p-2 text-text flex flex-col items-center" href="./custom-creation.html">
                            Custom Cards
                        </a>
                    </li>
                    <li className="flex flex-col px-2 py-1 justify-center text-center">
                        <a className="p-2 text-text flex flex-col items-center" href="./settings.html"
                        >Settings
                        </a>
                    </li>
                    <li className="flex flex-col px-2 py-1 justify-center text-center">
                        <button id="audioToggle" aria-pressed="false" aria-label="Toggle sound" className="audio-toggle" title="Turn sound off">
                            <svg className="icon-sound-on" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                viewBox="0 0 24 24">
                                <path d="M3 10v4h4l5 5V5l-5 5H3z" />
                                <path d="M16.5 9.5a4 4 0 0 1 0 5" />
                                <path d="M19 7a7 7 0 0 1 0 10" />
                            </svg>

                            <svg className="icon-sound-off hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M3 10v4h4l5 5V5l-5 5H3z" />
                                <path d="M16.5 9.5a4 4 0 0 1 0 5" />
                                <path d="M19 7a7 7 0 0 1 0 10" />
                                <line x1="2" y1="2" x2="22" y2="22" />
                            </svg>
                        </button>
                        <span className="input-desc">Audio On</span>
                    </li>
                    <li className="flex flex-col px-2 py-1 justify-center text-center">
                        <button id="darkModeToggle" className="dark-mode-toggle" aria-pressed="false" aria-label="Toggle dark mode" title="Toggle dark mode">
                            <svg className="icon-light" viewBox="0 0 24 24" width="24px" height="24px"
                                aria-hidden="true">
                                <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" transform="scale(2)">
                                    <circle cx="6" cy="6" r="2" />
                                    <g strokeDasharray="1.5 1.5">
                                        <polyline points="6 10,6 11.5" transform="rotate(0,6,6)" />
                                        <polyline points="6 10,6 11.5" transform="rotate(45,6,6)" />
                                        <polyline points="6 10,6 11.5" transform="rotate(90,6,6)" />
                                        <polyline points="6 10,6 11.5" transform="rotate(135,6,6)" />
                                        <polyline points="6 10,6 11.5" transform="rotate(180,6,6)" />
                                        <polyline points="6 10,6 11.5" transform="rotate(225,6,6)" />
                                        <polyline points="6 10,6 11.5" transform="rotate(270,6,6)" />
                                        <polyline points="6 10,6 11.5" transform="rotate(315,6,6)" />
                                    </g>
                                </g>
                            </svg>
                            <svg className="icon-dark" viewBox="0 0 24 24" width="24px" height="24px"
                                aria-hidden="true">
                                <g fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinejoin="round"
                                    transform="rotate(-45,12,12) scale(2)">
                                    <path
                                        d="m9,10c-2.209,0-4-1.791-4-4s1.791-4,4-4c.304,0,.598.041.883.105-.995-.992-2.367-1.605-3.883-1.605C2.962.5.5,2.962.5,6s2.462,5.5,5.5,5.5c1.516,0,2.888-.613,3.883-1.605-.285.064-.578.105-.883.105Z" />
                                </g>
                            </svg>
                        </button>
                        <span className="input-desc">Toggle dark?</span>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
