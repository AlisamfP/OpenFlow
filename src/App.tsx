import { useState } from "react";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import CardGrid from "./components/CardGrid";

function App() {
    const [selectedCategory, setSelectedCategory] = useState<
        "general" | "feelings" | "custom" | "favorites"
    >("general");

    const handleCategoryChange = (
        category: "general" | "feelings" | "custom" | "favorites"
    ) => {
        console.log("handle that change");
        setSelectedCategory(category);
    };

    return (
        <div className="font-nunito grid grid-rows-[min-content_1fr_min-content] h-screen text-text bg-background text-base my-0 mx-auto">
            <Header />
            <main>
                <section>
                    <h2 className="sr-only">Cards</h2>
                    <div className="flex flex-col p-4">
                        {/* <div className="visible md:hidden">
                        <label htmlFor="mobileTabSelect" className="select">Category: </label>
                        <select id="mobileTabSelect" onChange={(e)=> handleCategoryChange(e.target.value as 'general' | 'feelings' | 'custom' | 'favorites')}>
                            <option value="general">General</option>
                            <option value="feelings">Feelings</option>
                            <option value="custom">Custom</option>
                            <option value="favorites">Favorites</option>
                        </select>
                    </div> */}
                        <div id="tabs" className="js-tabs border-none">
                            <ul className="flex flex-row justify-between p-4">
                                <li className="js-tablist_item">
                                    <button
                                        onClick={() => handleCategoryChange("general")}
                                        className={`p-4 ${selectedCategory === "general" ? "active" : ""
                                            }`}
                                    >
                                        General
                                    </button>
                                </li>
                                <li className="js-tablist_item">
                                    <button
                                        onClick={() => handleCategoryChange("feelings")}
                                        className={`p-4 ${selectedCategory === "feelings" ? "active" : ""
                                            }`}
                                    >
                                        Feelings
                                    </button>
                                </li>
                                <li className="js-tablist_item">
                                    <button
                                        onClick={() => handleCategoryChange("custom")}
                                        className={`p-4 ${selectedCategory === "custom" ? "active" : ""
                                            }`}
                                    >
                                        Custom
                                    </button>
                                </li>
                                <li className="js-tablist_item">
                                    <button
                                        onClick={() => handleCategoryChange("favorites")}
                                        className={`p-4 ${selectedCategory === "favorites" ? "active" : ""
                                            }`}
                                    >
                                        Favorites
                                    </button>
                                    {/* <a href="#favorites_fourth" id="favorites_id_fourth" className="js-tablist_link">Favorites</a> */}
                                </li>
                            </ul>
                        </div>
                        <CardGrid category={selectedCategory} />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default App;
