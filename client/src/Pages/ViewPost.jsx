import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box, Button, Center, Flex, HStack, Image, Text, VStack, Divider, Textarea, Avatar,
  Menu, MenuButton, MenuItem, MenuList, IconButton
} from '@chakra-ui/react';
import { FaCommentDots, FaStar, FaEllipsisV } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const cancelRef = useRef(); // Reference for the "No" button, ensures focus management
  const onOpenDeleteAlert = () => setIsDeleteAlertOpen(true);
  const onCloseDeleteAlert = () => setIsDeleteAlertOpen(false);
  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/posts/${postId}`);
        const postData = response.data;
        setPost(postData);

        if (postData.image) {
          const imageResponse = await axios.get(`http://localhost:3001/images/${postData.image}`);
          setImageUrl(imageResponse.data.url);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/comments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);  // Fetch comments when postId changes


  const deletePostConfirmed = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/posts/${post._id}`);
      if (response.status === 200) {
        alert('Post deleted successfully');
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to delete the post:', error);
      alert('Failed to delete the post');
    }
    onCloseDeleteAlert();  // Close the alert dialog after handling delete
  };

  if (!post) {
    return <Center>Loading...</Center>;
  }


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

  const submitComment = async (commentContent) => {
    if (!commentContent.trim()) return;  // Prevent empty comments
    try {
      const commentData = { author: "user", content: commentContent };
      const response = await axios.post(`http://localhost:3001/api/comments/${postId}`, commentData);
      setComments([...comments, response.data]);
      setNewComment('');
      alert('Comment added successfully');
    } catch (error) {
      console.error("Error adding comment:", error);
      alert('Failed to add comment');
    }
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
            <MenuItem onClick={onOpenDeleteAlert}>Delete</MenuItem>
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
            src={imageUrl || "https://via.placeholder.com/500x300"}
            alt="Post Image"
            objectFit="cover"
            w="full"
          />
          <Text textAlign="left" mt={10}>{post.body}</Text>
        </Box>
        <Divider my={2} />
        <Flex justify="space-between" align="center" p={2}>
          <Text pl={4} fontSize="lg" fontWeight="bold">Comments</Text>
        </Flex>
        <Divider my={2} mt={2} />
        <Flex justify="left" align="center" p={2}>
          <HStack width="full">
            <Textarea placeholder="Write a comment..." value={newComment} onChange={e => setNewComment(e.target.value)} />
            <Button onClick={() => submitComment(newComment)} mt={10} colorScheme="blue">Add</Button>
          </HStack>
        </Flex>
        <VStack spacing={4} align="stretch" p={5}>
          {comments.map((comment, index) => (
            <HStack key={index} spacing={3} align="start">
              <Avatar size="sm" src="https://via.placeholder.com/150" />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold">{comment.author}</Text>
                <Text color="gray.500" fontSize="sm">{new Date(comment.createdAt).toLocaleDateString()}</Text>
                <Text>{comment.content}</Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </Box>
      <AlertDialog
      isOpen={isDeleteAlertOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCloseDeleteAlert}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Post
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseDeleteAlert}>
              No
            </Button>
            <Button colorScheme="red" onClick={deletePostConfirmed} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
    </Flex>
  );
}


export default ViewPost;