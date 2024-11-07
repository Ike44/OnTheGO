import {
    Box, Button, Center, Flex, HStack, Image, Text, VStack, Divider, Textarea, Avatar
  } from '@chakra-ui/react';
  import { FaHeart, FaCommentDots, FaShare, FaThumbsUp, FaStar } from 'react-icons/fa';
  import { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import axios from 'axios';
  
  function ViewPost() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/posts/${postId}`);
          setPost(response.data);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };
      fetchPost();
    }, [postId]);
  
    if (!post) {
      return <Center>Loading...</Center>;
    }
  
    const renderStars = (rating) => {
      return Array.from({ length: 5 }, (_, i) => (
        <FaStar key={i} color={i < rating ? "gold" : "gray"} size="15px" />
      ));
    };
  
    return (
      <Center py={6}>
        <Box maxW="42rem" w="full" p={5} boxShadow="lg" rounded="lg" bg="white">
          <VStack spacing={4} align="stretch">
            <Image borderRadius="md" src={post.imageUrl || "https://via.placeholder.com/500x300"} alt="Post Image" />
  
            <VStack align="start">
              <Text fontSize="2xl" fontWeight="bold">{post.title}</Text>
              <Text fontSize="sm">{`${post.location.description} | ${new Date(post.fromDate).toLocaleDateString()} - ${new Date(post.toDate).toLocaleDateString()} | ${post.rating}`}</Text>
              <HStack>
                {renderStars(post.rating)}
                <Text>{post.rating}</Text>
              </HStack>
              <Text>{post.body}</Text>
            </VStack>
  
            <Divider my={4} />
  
            <Flex justify="space-between" align="center">
              <HStack spacing={4}>
                <Button leftIcon={<FaThumbsUp />} variant="ghost">Like</Button>
                <Button leftIcon={<FaCommentDots />} variant="ghost">Comment</Button>
                <Button leftIcon={<FaShare />} variant="ghost">Share</Button>
              </HStack>
            </Flex>
  
            <Divider my={4} />
  
            <Textarea placeholder="Write a comment..." />
  
            {/* Comments example, make sure to fetch and map over actual data */}
            <VStack spacing={4}>
              <Text fontWeight="bold">Comments</Text>
              <HStack align="start">
                <Avatar size="sm" src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" />
                <VStack align="start">
                  <Text fontWeight="bold">Malcolm Dosh</Text>
                  <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, aspernatur!</Text>
                  <Button variant="link">Reply</Button>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </Center>
    );
  }
  
  export default ViewPost;
  
  