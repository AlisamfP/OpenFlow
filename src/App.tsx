import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
// import CardGrid from "./components/CardGrid";
import CategoryTabs from "./components/CategoryTabs.tsx";



function App() {
    return (
        <div className="font-nunito grid grid-rows-[min-content_1fr_min-content] h-full text-text bg-background text-base my-0 mx-auto w-full">
            <Header />
            <main>
                <h2 className="sr-only">Cards</h2>
                <div className="flex flex-col p-4">
                    <CategoryTabs/>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
