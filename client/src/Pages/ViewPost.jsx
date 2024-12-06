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
  const cancelRef = useRef();
  const onOpenDeleteAlert = () => setIsDeleteAlertOpen(true);
  const onCloseDeleteAlert = () => setIsDeleteAlertOpen(false);

  const [randomCountries, setRandomCountries] = useState([]);
  const [suggestedPosts, setSuggestedPosts] = useState([]);



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

  useEffect(() => {
    const countriesData = [
      { id: 1, img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/66/68/f6/caption.jpg?w=300&h=300&s=1&cx=988&cy=664&chk=v1_d1b5b3f4c384c764b7e1", title: "Mexico" },
      { id: 2, img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/60/b0/bd/bora-bora.jpg?w=300&h=300&s=1", title: "French Polynesia" },
      { id: 3, img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/33/f7/dd/caption.jpg?w=300&h=300&s=1", title: "Spain" },
      { id: 4, img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/e4/10/e4/it-was-an-amazing-experience.jpg?w=300&h=300&s=1", title: "China" },
      { id: 5, img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/e4/12/c9/visao-privilegiada.jpg?w=300&h=300&s=1", title: "Brazil" },
    ];

    // Shuffle and select 3-4 random countries
    const shuffled = countriesData.sort(() => 0.5 - Math.random());
    setRandomCountries(shuffled.slice(0, 3));
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts'); // Adjust API endpoint as necessary
        const allPosts = response.data;

        // Shuffle and select 3-5 random posts
        const shuffledPosts = allPosts.sort(() => 0.5 - Math.random());
        setSuggestedPosts(shuffledPosts.slice(0, 10));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);


  const deletePost = async () => {
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

  const handleCountryClick = (country) => {
    navigate('/feed', { state: { presetLocation: country } }); // Navigates to the feed page
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
    if (!commentContent.trim()) return;  // Guard clause for empty content
    try {
      const commentData = { author: "User", content: commentContent };
      const response = await axios.post(`http://localhost:3001/api/comments/${postId}`, commentData);
      setComments([...comments, { ...commentData, createdAt: new Date().toISOString() }]); // Assuming you want to mimic the structure including `createdAt`
      setNewComment('');
      alert('Comment added successfully');
    } catch (error) {
      console.error("Error adding comment:", error);
      alert('Failed to add comment');
    }
  };


  return (
    <Flex direction="row" pt="95px" align="flex-start" justify="center" gap={10}>
      <Box w="20%" position="sticky" top="100px">
        <Text fontWeight="bold" fontSize="lg" mb={4} textAlign="center">Suggested Posts</Text>
        {suggestedPosts.map((post) => (
          <Box
            key={post._id}
            mb={10}
            cursor="pointer"
            onClick={() => navigate(`/view-post/${post._id}`)}
            _hover={{ textDecoration: "underline", color: "blue.500" }}
          >
            <Text textAlign="center">{post.title}</Text>
          </Box>
        ))}
      </Box>
      <Box maxW="50rem" w="70%" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" bg="white" mb={20} position="relative">
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
                <Text fontWeight="bold">{comment.author || "User"}</Text>
                <Text color="gray.500" fontSize="sm">{new Date(comment.createdAt).toLocaleDateString()}</Text>
                <Text>{comment.content}</Text>
              </VStack>
            </HStack>
          ))}

        </VStack>
      </Box>
      <Box w="15%" position="sticky" top="100px">
        <Text fontWeight="bold" fontSize="lg" mb={4} textAlign="center">Suggested Countries</Text>
        {randomCountries.map((country) => (
          <Box
            key={country.id}
            mb={4}
            cursor="pointer"
            onClick={() => handleCountryClick(country.title)}
            _hover={{ transform: "scale(1.05)" }}
          >
            <Image src={country.img} alt={country.title} borderRadius="md" objectFit="cover" />
            <Text mt={2} fontWeight="bold" textAlign="center">{country.title}</Text>
          </Box>

        ))}
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
              <Button colorScheme="red" onClick={deletePost} ml={3}>
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