"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
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

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme} defaultMode="light">
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}