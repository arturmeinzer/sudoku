import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        secondary: {
            main: "#ccc",
        },
    },
    components: {
        MuiAlert: {
            defaultProps: {
                variant: "outlined",
            },
        },
    },
});

export default theme;
