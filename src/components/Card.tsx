interface Card {
    isFav: boolean;
    text: string;
    icon: Emoji | undefined;
}

interface Emoji {
    name: string;
    unicode: string;
}

export const Card = ({ isFav, text, icon }: Card) => {
    return (
        <>
            <div className="card" tabIndex={0}>
                <span className="" role="button" tabIndex={0} aria-label={isFav ? "Remove card from favorites" : "Save card to favorites"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                        fill="currentColor" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path
                            d="M12 10.375c0-2.416-1.959-4.375-4.375-4.375S3.25 7.959 3.25 10.375c0 1.127.159 2.784 1.75 4.375l7 5.25s5.409-3.659 7-5.25 1.75-3.248 1.75-4.375c0-2.416-1.959-4.375-4.375-4.375S12 7.959 12 10.375z" />
                    </svg>
                </span>
                <section className="card-content">
                    <img className="emoji" src={`https://openmoji.org/data/color/svg/${icon.unicode
                        }.svg`} alt={icon.name.replace(/-/g, " ")} role="img" data-unicode={icon.unicode} />
                    <h3 className="card-text">{text}</h3>
                </section>
            </div>
        </>
    )
}
