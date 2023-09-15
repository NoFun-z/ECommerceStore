import { Box, Typography } from "@mui/material";

interface Props{
    darkmode: boolean;
}

export default function Footer({darkmode}: Props) {
    const footerStyle = {
        backgroundColor: darkmode ? "#1D1F1F" : "#233142",
        color: "white",
        padding: "20px 0",
        textAlign: "center",
        bottom: 0,
        width: "100%",
        marginTop: "2rem",
    };

    return (
        <Box sx={footerStyle}>
            <Typography variant="body1">
                &copy; {new Date().getFullYear()} SnowFlake Inc. All rights
                reserved.
            </Typography>
        </Box>
    );
}
