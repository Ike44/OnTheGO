import {
  Box, Button, Center, Flex, HStack, Image, Text, VStack, Divider, Textarea, Avatar,
  Menu, MenuButton, MenuItem, MenuList, IconButton
} from '@chakra-ui/react';
import { FaCommentDots, FaStar, FaEllipsisV } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/posts/${postId}`);
        console.log(response.data);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]);


  // Updated deletePost function in ViewPost.jsx
const deletePost = async () => {
  try {
    const response = await axios.delete(`http://localhost:3001/api/posts/${post._id}`);
    if (response.status === 200) {
      alert('Post deleted successfully');
      navigate('/'); // Redirect to the list of posts or a suitable route
    }
  } catch (error) {
    console.error('Failed to delete the post:', error);
    alert('Failed to delete the post');
  }
};


  const editPost = () => {
    navigate(`/edit-post/${postId}`, { state: { post } });
  };
  

  if (!post) {
    return <Center>Loading...</Center>;
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} color={i < rating ? "gold" : "gray"} size="15px" />
    ));
  };

  return (
    <Flex direction="column" pt="95px" align="center">
      <Box maxW="50rem" w="full" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" bg="white" mb={20} position="relative">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FaEllipsisV />}
            variant="ghost"
            position="absolute"
            top={2}
            right={2}
            size="lg"
          />
          <MenuList>
            <MenuItem onClick={editPost}>Edit</MenuItem>
            <MenuItem onClick={deletePost}>Delete</MenuItem>
          </MenuList>
        </Menu>
        <Box p={5}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="left">
            {post.title} <Text as="span" fontSize="sm" color="gray.600">({post.category})</Text>
          </Text>
          {post.postType === 'Business' ? (
            <Text fontSize="sm" textAlign="left" color="gray.600">
              {`${post.location.description} | ${post.postType} Post | ${post.businessWebsite}`}
            </Text>
          ) : (
            <Text fontSize="sm" textAlign="left" color="gray.600">
              {`${post.location.description} | ${post.fromDate ? new Date(post.fromDate).toLocaleDateString() : 'N/A'} - ${post.toDate ? new Date(post.toDate).toLocaleDateString() : 'N/A'} | ${post.postType} Post | `}
              <HStack spacing={1} display="inline-flex">
                {renderStars(post.rating)}
                <Text as="span" ml={1} fontSize="sm">{post.rating}</Text>
              </HStack>
            </Text>
          )}
          <Image
            mt={5}
            borderRadius="md"
            src={post.imageUrl || "https://via.placeholder.com/500x300"}
            alt="Post Image"
            objectFit="cover"
            w="full"
          />
          <Text textAlign="left" mt={10}>{post.body}</Text>
        </Box>
        <Divider my={2} />
        <Flex justify="left" align="center" p={2}>
          <Button leftIcon={<FaCommentDots />} variant="ghost">Comment</Button>
        </Flex>
        <Box px={5} pb={5}>
          <Textarea placeholder="Write a comment..." mb={4} />
          <VStack spacing={4} pt={4} align="stretch">
            {/* Example comments */}
            <HStack align="start" spacing={4}>
              <Avatar size="sm" src="https://via.placeholder.com/150" />
              <VStack align="start">
                <Text fontWeight="bold">John Smith</Text>
                <Text>Really insightful post, thanks for sharing!</Text>
                <Button variant="link" size="sm">Reply</Button>
              </VStack>
            </HStack>
            <HStack align="start" spacing={4}>
              <Avatar size="sm" src="https://via.placeholder.com/150" />
              <VStack align="start">
                <Text fontWeight="bold">Emily R.</Text>
                <Text>Loved the detail on the photos, looking forward to more posts like this.</Text>
                <Button variant="link" size="sm">Reply</Button>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}

export default ViewPost;
