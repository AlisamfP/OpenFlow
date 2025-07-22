import { Card as CardUI, IconButton, Typography } from "@material-tailwind/react";

interface CardProps {
    isFav: boolean;
    text: string;
    icon?: Emoji;
}

interface Emoji {
    name: string;
    unicode: string;
}

export const Card = ({ isFav, text, icon }: CardProps) => {
    return (
        <CardUI className="bg-card-back min-w-72 w-full lg:w-2/6 h-52 border-1 border-s-text grid grid-cols-[1fr_min-content] rounded-b-sm justify-items-start items-baseline p-2 cursor-pointer gap-4" >
            <CardUI.Header className="col-start-2 col-end-3 justify-end bg-background relative cursor-pointer" >
                <IconButton
                    size="lg"
                    variant="ghost"
                    className={`!absolute top-0 right-0 rounded-full ${isFav ? "text-pink-300" : "text-background"} hover:text-pink-400`} {...({} as React.ComponentProps<typeof IconButton>)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10"
                    >
                        <path d="M7 3C4.23858 3 2 5.21619 2 7.95C2 10.157 2.87466 15.3947 11.4875 20.6903C11.7994 20.8821 12.2006 20.8821 12.5125 20.6903C21.1253 15.3947 22 10.157 22 7.95C22 5.21619 19.7614 3 17 3C14.2386 3 12 6 12 6C12 6 9.76142 3 7 3Z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </IconButton>
            </CardUI.Header>
            <CardUI.Body className="grid grid-cols-[minmax(max-content,_100px)_1fr] items-center w-full grid-row-[100px]">
                {icon &&
                    <img className="emoji w-28 h-auto" src={`https://openmoji.org/data/color/svg/${icon.unicode
                        }.svg`} alt={icon.name.replace(/-/g, " ")} role="img" data-unicode={icon.unicode} />
                }
                <Typography variant="h3" {...({} as React.ComponentProps<typeof Typography>)}>{text}</Typography>
            </CardUI.Body>
        </CardUI>
    )
}
