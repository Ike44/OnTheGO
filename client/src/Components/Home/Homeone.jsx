import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, List, ListItem, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaceSuggestions, initGoogleMapsAPI } from "../Google";

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
        navigate(`/search?q=${formattedQuery}`);
    };

    return (
        <Box w="85%" m="auto" p="150px 100px" background='url(https://static.tacdn.com/img2/brand/home/homemar2022_dt_trans.webp) center/cover no-repeat' backgroundColor="red.100">
            <VStack w="85%" m="auto" spacing={0} position="relative">
                <Box display="flex" rounded="40px" bg="white" p="8px 20px" w="100%" alignItems="center" boxShadow='3xl'>
                    <SearchIcon w={5} h={5} />
                    <Input
                        border="none"
                        placeholder='Where to?'
                        size='lg'
                        value={query}
                        onChange={handleInputChange}
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
        </Box>
    );
}

export default Homeone;
