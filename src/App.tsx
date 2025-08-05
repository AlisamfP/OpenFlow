import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import CategoryTabs from "./components/CategoryTabs.tsx";
import About from "./components/About.tsx"

import Settings from "./components/Settings.tsx";
import CustomCardForm from "./components/Custom.tsx";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import useLocalStorage from "./hooks/useLocalStorage.tsx";


const darkTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#A2AEA5',
                    light: '#bfccc3',
                    dark: '#78847b',
                    contrastText: '#212121'
                },
                secondary: {
                    main: '#B3A8B0',
                    light: '#d1cbcf',
                    dark: '#968591',
                    contrastText: '#212121'
                },
                background: {
                    default: '#f2f2f2',
                    paper: '#d3d3d3',
                },
                text: {
                    primary: '#212121',
                    secondary: '#30433E'
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: '#30433E',
                    light: '#3e564f',
                    dark: '#1f2e2a',
                    contrastText: '#f2f2f2'
                },
                secondary: {
                    main: '#574750',
                    dark: '#473b43',
                    light: '#67535e',
                    contrastText: '#f2f2f2'
                },
                background: {
                    default: '#333',
                    paper: '#3e3e3e',
                },
                text: {
                    primary: '#f2f2f2',
                    secondary: '#BEC6C0'
                }
            }
        }
    },
    typography: {
        fontSize: 20,
        fontFamily: 'Nunito',
    },
});

function App() {
    const [page, setPage] = useLocalStorage("currentPage");

    return (
        <ThemeProvider theme={darkTheme} defaultMode="light">
            <Box sx={{ height: '100%', backgroundColor: 'background.default' }}>
                <Header setPage={setPage} currentPage={page} />
                <Container sx={{ backgroundColor: 'background.default', marginTop: 9, p: 0, pb: 9 }} maxWidth={false}>
                    <Box
                        sx={{
                            px: { xs: 2, md: 4 },
                            py: { xs: 2, md: 4 }
                        }}>
                        {page === "settings" && (
                            <Settings />
                        )}
                        {page === "custom" && (
                            <CustomCardForm />
                        )}
                        {page === "cards" && (
                            <CategoryTabs setPage={setPage} />
                        )}
                        {page === "about" && (
                            <About />
                        )}
                    </Box>
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

export default App;
