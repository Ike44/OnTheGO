import { Box, Menu, MenuButton, Button, MenuItem, MenuList, Input, Portal, IconButton, Checkbox, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function SubNav({ onApplyFilters, hcFilter }) {
    const [countrySearch, setCountrySearch] = useState("");
    const [countries, setCountries] = useState([]);
    const [countryIndex, setCountryIndex] = useState(0);
    const displayLimit = 5;
    const [sortBy, setSortBy] = useState("Sort by");
    const [rating, setRating] = useState([1, 5]); 
    const [category, setCategory] = useState([]); 
    const [selectedCountry, setSelectedCountry] = useState(hcFilter || ""); 



    useEffect(() => {
        fetch('/countries.json')
            .then((response) => response.json())
            .then((data) => {
                setCountries(Object.keys(data)); 
            })
            .catch((error) => console.error("Error loading countries data:", error));
    }, []);

    useEffect(() => {
        if (hcFilter) {
          setSelectedCountry(hcFilter);
          setCountrySearch(""); 
        }
      }, [hcFilter]);



    const toggleSelection = (list, setList, value) => {
        if (list.includes(value)) {
            setList(list.filter(item => item !== value));
        } else {
            setList([...list, value]);
        }
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
 
    };


    const filteredCountries = countries.filter(country => country.toLowerCase().includes(countrySearch.toLowerCase()));

    const handleCountryUp = () => setCountryIndex(Math.max(0, countryIndex - 1));
    const handleCountryDown = () => setCountryIndex(Math.min(filteredCountries.length - displayLimit, countryIndex + 1));

        const resetFilters = () => {
        setSelectedCountry(""); 
        setCountrySearch("");
        setSortBy("Sort by");
        setRating([1, 5]);
        setCategory([]);

    };

    const applyFilters = () => {
        const filters = { selectedCountry, sortBy, rating, category };
        onApplyFilters(filters);
    }

    return (
        <Box h="100px" w="100%" m="auto" pt="100px" mb="80px" display="grid" gridTemplateColumns="repeat(5, 1fr)" alignItems="center" gap="11px">
            {/* Country Filter */}
            <Box h="50px" borderRadius="xl" p="10px 10px" fontWeight="500" fontSize="md" border="1.5px solid gray" justifyContent="space-between" display="flex" alignItems="center" bg={selectedCountry ? "gray.100" : "white"}>
                <Menu>
                <MenuButton w="100%" display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" justifyContent="space-between" alignItems="center" w="100%">
                        <span>{selectedCountry || "Country"}</span>
                        <KeyboardArrowDownIcon />
                    </Box>
                </MenuButton>
                    <Portal>
                        <MenuList w="125%" maxH="300px" overflow="hidden" display="flex" flexDirection="column" alignItems="center">
                            <Input
                                placeholder="Search countries"
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                mb={2}
                                p="10px"
                            />
                            <IconButton
                                icon={<ChevronUpIcon />}
                                isDisabled={countryIndex === 0}
                                onClick={handleCountryUp}
                                size="xs"
                                aria-label="Scroll up countries"
                                width="full"
                                mb={1}
                                bg="white"
                                _hover={{ bg: "gray.200" }}
                                borderRadius="md"
                            />
                            {filteredCountries.slice(countryIndex, countryIndex + displayLimit).map((country) => (
                                <MenuItem key={country} onClick={() => handleCountrySelect(country)} w="full">
                                    {country}
                                </MenuItem>
                            ))}
                            <IconButton
                                icon={<ChevronDownIcon />}
                                isDisabled={countryIndex >= filteredCountries.length - displayLimit}
                                onClick={handleCountryDown}
                                size="xs"
                                aria-label="Scroll down countries"
                                width="full"
                                mt={1}
                                bg="white"
                                _hover={{ bg: "gray.200" }}
                                borderRadius="md"
                            />
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
                            <MenuItem onClick={() => setSortBy("Oldest")}>Oldest</MenuItem>
                            <MenuItem onClick={() => setSortBy("Controversial")}>Controversial</MenuItem>

                            <MenuItem onClick={() => setSortBy("Top All Time")}>Top All Time</MenuItem>
                        </MenuList>
                    </Portal>
                </Menu>
            </Box>


            {/* Rating Filter*/}
            <Box h="50px" borderRadius="xl" p="10px 10px" fontWeight="500" fontSize="md" border="1.5px solid gray" justifyContent="space-between" display="flex" alignItems="center"   bg={rating[0] !== 1 || rating[1] !== 5 ? "gray.100" : "white"}>
                <Menu>
                <MenuButton w="100%" display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" justifyContent="space-between" alignItems="center" w="100%">
                    <span>
                    {`Rating: ${
                        rating[0] === rating[1] ? `${rating[0]} Star` : `${rating[0]} - ${rating[1]} Stars`
                    }`}
                    </span>
                    <KeyboardArrowDownIcon />
                </Box>
                </MenuButton>
                <Portal>
                <MenuList w="125%" p="10px" display="flex" flexDirection="column" alignItems="center">
                    <Box w="full" textAlign="center" fontSize="sm" mb="4px">
                    Select Rating
                    </Box>

                    <Box w="100%" display="flex" flexDirection="column" alignItems="center">
                    <RangeSlider
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={[1, 5]}
                        onChange={(val) => setRating(val)}
                        w="90%"
                        mb="2"
                    >
                        <RangeSliderTrack bg="gray.200" ml="-6px">
                        <RangeSliderFilledTrack bg="gray.400" />
                        </RangeSliderTrack>
                        <RangeSliderThumb boxSize={5} index={0} bg="gray.400" ml={rating[0] === rating[1] ? "-8px" : "-7px"}  zIndex={rating[0] === rating[1] ? 1 : 2} />
                        <RangeSliderThumb boxSize={5} index={1} bg="gray.400" ml={rating[0] === rating[1] ? "-8px" : "-12px"} zIndex={rating[0] === rating[1] ? 2 : 1}/>
                    </RangeSlider>

                    <Box w="90%" display="flex" justifyContent="space-between" mt="2" fontSize="xs" color="gray.600">
                        {[1, 2, 3, 4, 5].map((rating) => (
                        <Box key={rating} textAlign="center">
                            {rating}
                        </Box>
                        ))}
                    </Box>
                    </Box>
                </MenuList>
                </Portal>
            </Menu>
            </Box>

            {/* Category Filter */}
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
                            <MenuItem>
                                <Checkbox isChecked={category.includes("Mountains")} onChange={() => toggleSelection(category, setCategory, "Mountains")}>
                                    Mountains
                                </Checkbox>
                            </MenuItem>
                            <MenuItem>
                                <Checkbox isChecked={category.includes("Beaches")} onChange={() => toggleSelection(category, setCategory, "Beaches")}>
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
                <Button onClick={applyFilters} colorScheme="gray" border="1.5px solid gray" h="50px" w="100%" borderRadius="xl">
                    Apply
                </Button>
            </Box>
        </Box>
    

    );
}

export default SubNav;
