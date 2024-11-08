import React, { useState, useEffect } from 'react';
import { Box, Image, VStack, Text, Heading, Button, useDisclosure, Grid } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { MdBookmark } from 'react-icons/md';



function Bookmarks() {
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null); 
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const storedBookmarks = localStorage.getItem("bookmarkedPosts");
        if (storedBookmarks) {
            setBookmarkedPosts(JSON.parse(storedBookmarks));
        }
    }, []);

    const handleDeleteBookmark = (indexToRemove) => {
        const updatedBookmarks = bookmarkedPosts.filter((_, index) => index !== indexToRemove);
        setBookmarkedPosts(updatedBookmarks);
        localStorage.setItem("bookmarkedPosts", JSON.stringify(updatedBookmarks));
    };

    const handlePostClick = (post) => { 
        setSelectedPost(post);
        onOpen();
    };

    return (
        <Box w="85%" m="auto" pt="15px" textAlign="center" mt="40px">
            <Text fontWeight="700" fontSize='3xl' color="black" marginTop='70px' textShadow="4px 1px 2px grey">Bookmarked Posts</Text>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6} mt="15px">
        {bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map((post, index) => (
                        <Box 
                            key={index}
                            bg="White" 
                            pb="10px" 
                            position="relative" 
                            textAlign="left"
                            cursor="pointer" 
                            onClick={() => handlePostClick(post)}
                            transition="transform 0.3s ease-in-out"
                            _hover={{ transform: "scale(1.05)" }}
                        >
                              <Image filter='auto' brightness='70%' src={post.image} alt={post.title} w="100%" h="250px" objectFit="cover" />
                            <Text mt="4" pl="10px" pr="10px" fontSize="lg" fontWeight="bold">{post.title}</Text>
                            <Text mt="2" pl="10px" pr="10px" fontSize="md" noOfLines={3}>{post.body}</Text> 

                            <MdBookmark 
                              size="24px" 
                              color="gold" 
                             cursor="pointer" 
                             onClick={(e) => {
                             e.stopPropagation(); 
                             handleDeleteBookmark(index);
                             }}
                             /> 

                        </Box>
                    ))
                ) : (
                    <Text fontSize="lg">No bookmarks yet. Start adding some!</Text>
                )}
            </Grid>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay bg="blackAlpha.800" /> 
                <ModalContent maxW="600px">
                    <ModalCloseButton />
                    <ModalBody p={5}>
                        {selectedPost && (
                            <Box>
        <Image src={selectedPost.image} alt={selectedPost.title} w="100%" h="300px" objectFit="cover" mb={5} />
        <Text fontSize="2xl" fontWeight="bold" mb={3}>{selectedPost.title}</Text>
        <Text>{selectedPost.body}</Text>

        </Box>
    )}
    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default Bookmarks;
