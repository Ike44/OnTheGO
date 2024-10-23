import React, { useState, useEffect } from 'react';
import { Box, Image, Text, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function Bookmarks() {
    const [bookmarkedCountries, setBookmarkedCountries] = useState([]);

    // Load bookmarks from localStorage on component mount
    useEffect(() => {
        const storedBookmarks = localStorage.getItem("bookmarks");
        if (storedBookmarks) {
            setBookmarkedCountries(JSON.parse(storedBookmarks));
        }
    }, []);

    // Handle deleting a bookmark
    const handleDeleteBookmark = (indexToRemove) => {
        const updatedBookmarks = bookmarkedCountries.filter((_, index) => index !== indexToRemove);
        setBookmarkedCountries(updatedBookmarks);
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    };

    return (
        <Box w="85%" m="auto" pt="15px" textAlign="left" mt="40px">
            <Text fontWeight="700" fontSize='3xl'>Bookmarked Countries</Text>
            <Box display="flex" flexWrap="wrap" gap="15px" mt="15px">
                {bookmarkedCountries.length > 0 ? (
                    bookmarkedCountries.map((country, index) => (
                        <Box 
                            key={index}
                            bg="white" 
                            pb="30px" 
                            position="relative" 
                            textAlign="left"
                            flexShrink="0"
                            w="300px"
                            transition="transform 0.3s ease-in-out"
                            _hover={{ transform: "scale(1.05)" }}
                        >
                            <Image filter='auto' brightness='65%' src={country.img} alt="img" w="100%" h="300px" objectFit="cover" />
                            <Text left="10px" color="white" position="absolute" bottom="30px" fontWeight="900" fontSize='3xl'>{country.title}</Text>

                            {/* Delete button */}
                            <IconButton
                                aria-label="Delete bookmark"
                                icon={<DeleteIcon />}
                                position="absolute"
                                right="10px"
                                top="10px"
                                color="red"
                                onClick={() => handleDeleteBookmark(index)}
                            />
                        </Box>
                    ))
                ) : (
                    <Text fontSize="lg">No bookmarks yet. Start adding some!</Text>
                )}
            </Box>
        </Box>
    );
}

export default Bookmarks;
