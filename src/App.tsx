import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import CategoryTabs from "./components/CategoryTabs.tsx";

import Settings from "./components/Settings.tsx";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";


const darkTheme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#8aa093',
                },
                secondary: {
                    main: '#a1bac4',
                },
                background: {
                    default: '#f2f2f2',
                    paper: '#d3d3d3',
                },
                text: {
                    primary: '#212121',
                }
            }
        },
        dark: {
            palette: {
                primary: {
                    main: '#6a8a72',
                },
                secondary: {
                    main: '#5f7d8a',
                },
                background: {
                    default: '#333',
                    paper: '#3e3e3e',
                },
                text: {
                    primary: '#d0d0d0',
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

    return (
        <ThemeProvider theme={darkTheme} defaultMode="light">
            <Box sx={{ height: '100%', backgroundColor: 'background.default' }}>
                <Header />
                <Container sx={{ backgroundColor: 'background.default', marginTop: 5 }}>
                    <Box sx={{ p: 4 }}>
                        {/* <CategoryTabs /> */}
                    </Box>
                    <Box>
                        <Settings />
                    </Box>
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

export default App;
