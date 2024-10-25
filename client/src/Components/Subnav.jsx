import { Box, Menu, MenuButton, Button, MenuItem, MenuList, Portal, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function SubNav() {
    const [location, setLocation] = useState("Location");
    const [sortBy, setSortBy] = useState("Sort by");
    const [category, setCategory] = useState([]); 
    const [features, setFeatures] = useState([]); 

    const resetFilters = () => {
        setLocation("Location");
        setSortBy("Sort by");
        setCategory([]);
        setFeatures([]);
    };

    const toggleSelection = (list, setList, value) => {
        if (list.includes(value)) {
            setList(list.filter(item => item !== value));
        } else {
            setList([...list, value]);
        }
    };

    return (
        <Box h="100px" w="100%" m="auto" pt="100px" mb="80px" display="grid" gridTemplateColumns="repeat(5, 1fr)" alignItems="center" gap="11px">
            {/* Location Filter */}
            <Box h="50px" borderRadius="xl" p="10px 10px" fontWeight="500" fontSize="md" border="1.5px solid gray" justifyContent="space-between" display="flex" alignItems="center" bg={location !== "Location" ? "gray.100" : "white"}>
                <Menu>
                    <MenuButton w="100%" display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" justifyContent="space-between" alignItems="center" w="100%">
                            <span>{location}</span>
                            <KeyboardArrowDownIcon />
                        </Box>
                    </MenuButton>
                    <Portal>
                        <MenuList w="125%">
                            <MenuItem onClick={() => setLocation("Country")}>Country</MenuItem>
                            <MenuItem onClick={() => setLocation("City")}>City</MenuItem>
                        </MenuList>
                    </Portal>
                </Menu>
            </Box>

            {/* Sort By Filter */}
            <Box h="50px" borderRadius="xl" p="10px 10px" fontWeight="500" fontSize="md" border="1.5px solid gray" justifyContent="space-between" display="flex" alignItems="center" bg={sortBy !== "Sort by" ? "gray.100" : "white"}>
                <Menu>
                    <MenuButton w="100%" display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" justifyContent="space-between" alignItems="center" w="100%">
                            <span>{sortBy}</span>
                            <KeyboardArrowDownIcon />
                        </Box>
                    </MenuButton>
                    <Portal>
                        <MenuList w="125%">
                            <MenuItem onClick={() => setSortBy("Hot")}>Hot</MenuItem>
                            <MenuItem onClick={() => setSortBy("New")}>New</MenuItem>
                            <MenuItem onClick={() => setSortBy("Top All Time")}>Top All Time</MenuItem>
                            <MenuItem onClick={() => setSortBy("Controversial")}>Controversial</MenuItem>
                        </MenuList>
                    </Portal>
                </Menu>
            </Box>

            {/* Category Filter (Multiple selection) */}
            <Box h="50px" borderRadius="xl" p="10px 10px" fontWeight="500" fontSize="md" border="1.5px solid gray" justifyContent="space-between" display="flex" alignItems="center" bg={category.length > 0 ? "gray.100" : "white"}>
                <Menu>
                    <MenuButton w="100%" display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" justifyContent="space-between" alignItems="center" w="100%">
                            <span>{category.length > 0 ? category.join(", ") : "Category"}</span>
                            <KeyboardArrowDownIcon />
                        </Box>
                    </MenuButton>
                    <Portal>
                        <MenuList w="125%">
                            <MenuItem>
                                <Checkbox isChecked={category.includes("Hidden gems")} onChange={() => toggleSelection(category, setCategory, "Hidden gems")}>
                                    Hidden gems
                                </Checkbox>
                            </MenuItem>
                            <MenuItem>
                                <Checkbox isChecked={category.includes("Restaurants")} onChange={() => toggleSelection(category, setCategory, "Restaurants")}>
                                    Restaurants
                                </Checkbox>
                            </MenuItem>
                            <MenuItem>
                                <Checkbox isChecked={category.includes("Landmarks")} onChange={() => toggleSelection(category, setCategory, "Landmarks")}>
                                    Landmarks
                                </Checkbox>
                            </MenuItem>
                        </MenuList>
                    </Portal>
                </Menu>
            </Box>

            {/* Features Filter (Multiple selection) */}
            <Box h="50px" borderRadius="xl" p="10px 10px" fontWeight="500" fontSize="md" border="1.5px solid gray" justifyContent="space-between" display="flex" alignItems="center" bg={features.length > 0 ? "gray.100" : "white"}>
                <Menu>
                    <MenuButton w="100%" display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" justifyContent="space-between" alignItems="center" w="100%">
                            <span>{features.length > 0 ? features.join(", ") : "Features"}</span>
                            <KeyboardArrowDownIcon />
                        </Box>
                    </MenuButton>
                    <Portal>
                        <MenuList w="125%">
                            <MenuItem>
                                <Checkbox isChecked={features.includes("Mountains")} onChange={() => toggleSelection(features, setFeatures, "Mountains")}>
                                    Mountains
                                </Checkbox>
                            </MenuItem>
                            <MenuItem>
                                <Checkbox isChecked={features.includes("Beaches")} onChange={() => toggleSelection(features, setFeatures, "Beaches")}>
                                    Beaches
                                </Checkbox>
                            </MenuItem>
                        </MenuList>
                    </Portal>
                </Menu>
            </Box>

            {/* Reset and Apply Buttons */}
            <Box display="flex" gap="10px">
                <Button onClick={resetFilters} colorScheme="gray" border="1.5px solid gray" h="50px" w="100%" borderRadius="xl">
                    Reset
                </Button>
                <Button colorScheme="gray" border="1.5px solid gray" h="50px" w="100%" borderRadius="xl">
                    Apply
                </Button>
            </Box>
        </Box>
    );
}

export default SubNav;
