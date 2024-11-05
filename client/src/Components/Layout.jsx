import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <Box mt="60px">
                {children}
            </Box>
        </>
    );
}

export default Layout;