import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, IconButton, List, ListItem, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaceSuggestions, initGoogleMapsAPI } from "../../google/Google";

function Homeone() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        initGoogleMapsAPI();
    }, []);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value.length > 0) {
            try {
                const results = await getPlaceSuggestions(value);
                setSuggestions(results);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (description) => {
        const formattedQuery = description.replace(/\s+/g, '+');
        navigate(`/searchResults?q=${formattedQuery}`); 
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/searchResults?q=${query.trim().replace(/\s+/g, '+')}`); 
        }
    };

    return (
        <Box w="85%" m="auto" p="150px 100px" background='url(https://static.tacdn.com/img2/brand/home/homemar2022_dt_trans.webp) center/cover no-repeat' backgroundColor="red.100">
            <form onSubmit={handleSearch}>
                <VStack w="85%" m="auto" spacing={0} position="relative">
                    <Box display="flex" rounded="40px" bg="white" p="8px 20px" w="100%" alignItems="center" boxShadow='3xl'>
                        <Input
                            border="none"
                            placeholder="Where to?"
                            size="lg"
                            value={query}
                            onChange={handleInputChange}
                        />
                        <IconButton
                            type="submit"
                            aria-label="Search database"
                            icon={<SearchIcon />}
                            ml={2}
                            bg="gray.500"
                            color="white"
                            _hover={{ bg: "blue.500" }}
                        />
                    </Box>
                    {suggestions.length > 0 && (
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
                                    onClick={() => handleSuggestionClick(place.description)}
                                >
                                    {place.description}
                                </ListItem>
                            ))}
                        </List>
                    )}
                </VStack>
            </form>
        </Box>
    );
}

export default Homeone;
