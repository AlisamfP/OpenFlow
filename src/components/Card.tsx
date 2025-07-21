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
            <div className="bg-card-back min-w-72 max-w-full w-2/6 h-52 border-1 border-s-text grid grid-cols-[1fr_min-content] rounded-b-sm justify-items-start items-baseline p-2 cursor-pointer" tabIndex={0}>
                <span className="col-start-2 col-end-3 w-10 justify-end bg-background" role="button" tabIndex={0} aria-label={isFav ? "Remove card from favorites" : "Save card to favorites"}>
                    <svg
                        className="w-8 h-8 fill-[#d3d3d3] hover:fill-pink-600" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        width="24" 
                        height="24"
                        stroke="#000000" 
                        strokeWidth="1.5" 
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path
                            d="M12 10.375c0-2.416-1.959-4.375-4.375-4.375S3.25 7.959 3.25 10.375c0 1.127.159 2.784 1.75 4.375l7 5.25s5.409-3.659 7-5.25 1.75-3.248 1.75-4.375c0-2.416-1.959-4.375-4.375-4.375S12 7.959 12 10.375z" />
                    </svg>
                </span>
                <section className="grid grid-cols-[minmax(max-content,_100px)_1fr] items-center w-full grid-row-[100px] pb-8">
                {icon &&
                    <img className="emoji w-28 h-auto" src={`https://openmoji.org/data/color/svg/${icon.unicode
                        }.svg`} alt={icon.name.replace(/-/g, " ")} role="img" data-unicode={icon.unicode} />
                    }
                    <h3 className="text-text text-lg font-medium col-start-2 col-end-3">{text}</h3>
                </section>
            </div>
        </>
    )
}
