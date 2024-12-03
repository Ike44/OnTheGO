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
  
    const isScrolling = () => {
      if (window.scrollY > 80) {
        setisscroll(true);
      } else {
        setisscroll(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", isScrolling);
      return () => {
        window.removeEventListener("scroll", isScrolling);
      };
    }, []);
  
    const [isAuth, setAuth] = useState(false);
  
    const bgColor = "#004f32";
    const textColor = "#FFFFFF";
    const iconColor = "#FFFFFF";

    return (
      <Box
        w="full"
        boxShadow={isscroll ? "md" : "sm"}
        position="fixed"
        bg={bgColor}
        zIndex={1000}
        p="3px 0px"
        height="66px"
      >
        <Box
          h="60px"
          w="85%"
          m="auto"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <RouterLink to="/">
            <img
              src="/otg2.png"
              alt="Logo"
              style={{ width: "175px", height: "60px" }}
            />
          </RouterLink>
          <Box display="flex" gap="25px" alignItems="center">
            <RouterLink to="/create-post">
              <Link display="flex" color={textColor}>
                <ModeEditOutlineOutlinedIcon style={{ color: iconColor }} />
                <Text fontWeight="500" fontSize="md">
                  Create a Post
                </Text>
              </Link>
            </RouterLink>
            <RouterLink to="/planner">
              <Link
                display="flex"
                alignItems="center"
                gap="5px"
                color={textColor}
              >
                <MenuBookIcon style={{ color: iconColor }} />
                <Text fontWeight="500" fontSize="md">
                  My Planner
                </Text>
              </Link>
            </RouterLink>
  
            <Menu isOpen={isOpen}>
              <MenuButton
                as={IconButton}
                icon={<PersonOutlineOutlinedIcon />}
                variant="ghost"
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
                color={iconColor}
                bg="transparent"
                _hover={{ bg: "#006b4a" }}
                _active={{ bg: "#006b4a" }}
              />
              <MenuList
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
                bg={bgColor}
                borderColor={bgColor}
                >
                  <RouterLink to="/account_info">                            
                    <MenuItem bg={"#bgColor"} _hover={{ bg: "#006b4a" }} color={textColor}>Account Info</MenuItem>
                  </RouterLink>
                  <RouterLink to="/bookmarks">
                            <MenuItem bg={"#bgColor"} _hover={{ bg: "#006b4a" }} color={textColor}>Bookmarks</MenuItem>
                  </RouterLink>
                </MenuList>
              </Menu>

            <Link display="flex">
              {isAuth ? (
                <Button
                  color={textColor}
                  onClick={() => {
                    setAuth(!isAuth);
                  }}
                >
                  Sanghamitra
                </Button>
              ) : (
                <Signin />
              )}
            </Link>
          </Box>
        </Box>
      </Box>
    );
  }
  
  export default Navbar;
  