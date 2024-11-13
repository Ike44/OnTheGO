// Sign in/up code is commented out
import { Box, Link, Text, Menu, MenuButton, MenuList, MenuItem, IconButton, useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Signin from "./Signin";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";


function Navbar() {
    const [isscroll, setisscroll] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    function isScrolling() {
        if (window.scrollY > 80) {
            setisscroll(true);
        } else {
            setisscroll(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", isScrolling);
        return () => {
            window.removeEventListener("scroll", isScrolling);
        };
    }, []);

    const [isAuth, setAuth] = useState(false);


    return (
        <Box w="full" boxShadow={isscroll ? 'md' : "sm"} position="fixed" bg="#FFFFFF" zIndex={1} p="3px 0px">
            <Box h="60px" w="85%" m="auto" display="flex" alignItems="center" justifyContent="space-between">
                <RouterLink to="/">
                    <img src="/otg.png" alt="pls show D:" style={{ width: '175px', height: '60px' }} />
                </RouterLink>
                <Box display="flex" gap="25px" alignItems="center">
                    <RouterLink to="/create-post">
                        <Link display="flex">
                            <ModeEditOutlineOutlinedIcon />
                            <Text fontWeight="500" fontSize='md'>Create a Post</Text>
                        </Link>
                        </RouterLink>
                        <RouterLink to="/planner">
                            <Link display="flex" alignItems="center" gap="5px">
                                <MenuBookIcon />
                                <Text fontWeight="500" fontSize='md'>My Planner</Text>
                            </Link>
                        </RouterLink>

                    <Menu isOpen={isOpen}>
                        <MenuButton
                            as={IconButton}
                            icon={<PersonOutlineOutlinedIcon />}
                            variant="ghost"
                            onMouseEnter={onOpen}
                            onMouseLeave={onClose}
                        />
                        <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                            <MenuItem>Account Info</MenuItem>
                            <RouterLink to="/bookmarks">
                        <MenuItem>Bookmarks</MenuItem>
                            </RouterLink>
                    </MenuList>
                    </Menu>
                    <Link display="flex">
                        {isAuth ?
                            <Button color="black" onClick={() => {
                                setAuth(!isAuth);
                            }}>Sanghamitra</Button> : <Signin />
                        }
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default Navbar;
