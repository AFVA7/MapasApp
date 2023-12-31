import { CssBaseline, ThemeProvider } from "@mui/material";
import { greenTheme } from './';

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={greenTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
