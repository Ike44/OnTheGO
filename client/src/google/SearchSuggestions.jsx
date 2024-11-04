import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, IconButton, List, ListItem, VStack } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaceSuggestions } from "./Google";

function SearchSuggestions({ initialQuery = "", onSearch }) {
    const [query, setQuery] = useState(initialQuery);
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value.length > 0) {
            try {
                const results = await getPlaceSuggestions(value);
                console.log('Results:', results);
                setSuggestions(results);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (description, placeId) => {
        const formattedQuery = description.replace(/\s+/g, '+');
        navigate(`/searchResults?q=${formattedQuery}&place_id=${placeId}`);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        // Set cursor position to the end of the text
        const input = inputRef.current;
        if (input) {
            input.setSelectionRange(input.value.length, input.value.length);
        }
    };

    return (
        <VStack w="85%" m="auto" spacing={0} position="relative">
            <Box display="flex" rounded="40px" bg="white" p="8px 20px" w="100%" alignItems="center" boxShadow='3xl'>
                <Input
                    ref={inputRef}
                    border="none"
                    placeholder="Where to?"
                    size="lg"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={() => setIsFocused(false)}
                />
                <IconButton
                    type="submit"
                    aria-label="Search database"
                    icon={<SearchIcon />}
                    ml={2}
                    bg="gray.500"
                    color="white"
                    _hover={{ bg: "blue.500" }}
                    onClick={handleSearch}
                />
            </Box>
            {isFocused && suggestions.length > 0 && (
                <List 
                    spacing={3} 
                    mt={2} 
                    bg="white" 
                    p={4} 
                    rounded="md" 
                    boxShadow="md" 
                    position="absolute" 
                    top="100%" 
                    left="0" 
                    right="0" 
                    zIndex="1"
                >
                    {suggestions.map((place, index) => (
                        <ListItem 
                            key={index} 
                            textAlign="left" 
                            px={2}
                            py={2}
                            _hover={{
                                bg: "gray.500",
                                color: "white",
                                cursor: "pointer"
                            }}
                            transition="all 0.2s"
                            onMouseDown={() => handleSuggestionClick(place.description, place.place_id)}
                        >
                            {place.description}
                        </ListItem>
                    ))}
                </List>
            )}
        </VStack>
    );
}

export default SearchSuggestions;