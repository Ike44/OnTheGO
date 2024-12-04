import { Box, Button, Image, Text, VStack, HStack, IconButton, Heading } from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon, StarIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubNav from '../Subnav';
import { useLocation } from 'react-router-dom';

const HomePostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [loading, setLoading] = useState(false)
  const [noPostsMessage, setNoPostsMessage] = useState("")
  const location = useLocation();
  const presetLocation = location.state?.presetLocation;
  const selectedCountry = presetLocation || '';

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        if (presetLocation) {
          // Simulate "Apply" button click for presetLocation
          const filters = { selectedCountry: presetLocation };
          const response = await axios.post('http://localhost:3001/api/filters', filters);
  
          if (response.data.message) {
            setNoPostsMessage(response.data.message);
            setPosts([]);
          } else {
            const postsData = response.data.posts;
  
            // Fetch image URLs for each post
            const postsWithImages = await Promise.all(
              postsData.map(async (post) => {
                if (post.image) {
                  const imageResponse = await axios.get(`http://localhost:3001/images/${post.image}`);
                  post.imageUrl = imageResponse.data.url;
                }
                return post;
              })
            );
  
            setPosts(postsWithImages);
            setNoPostsMessage('');
          }
        } else {
          // Fetch all posts if no presetLocation is set
          const response = await axios.get('http://localhost:3001/api/posts');
          const postsData = response.data;
  
          // Fetch image URLs for each post
          const postsWithImages = await Promise.all(
            postsData.map(async (post) => {
              if (post.image) {
                const imageResponse = await axios.get(`http://localhost:3001/images/${post.image}`);
                post.imageUrl = imageResponse.data.url;
              }
              return post;
            })
          );
  
          setPosts(postsWithImages);
        }
      } catch (error) {
        console.error('Error fetching posts:', error.response || error);
        setNoPostsMessage(`Error fetching posts: ${error.response?.data?.error || error.message}`);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [presetLocation]);
  

  // Calculate the posts to display on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(posts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const fetchFilteredPosts = async (filters) => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3001/api/filters', filters)
      if (response.data.message) {
        setNoPostsMessage(response.data.message)
        setPosts([])
      } else {
        setPosts(response.data.posts)
        setNoPostsMessage("")
      }
    } catch (error) {
      console.error('Error fetching filtered posts:', error.response || error);
      setNoPostsMessage(`Error fetching filtered posts: ${error.response?.data?.error || error.message}`)
   } finally {
      setLoading(false)
    }
  }

  const handleApplyFilters = (filters) => {
    fetchFilteredPosts(filters)
  }


  return (
    <Box w="85%" m="auto" textAlign="left" mt="40px" mb="40px">
      <Heading as="h2" size="xl" mb={-20}>Feed</Heading>
      <SubNav onApplyFilters={handleApplyFilters} hcFilter={selectedCountry} />
      {loading ? (
        <Text mt={8}>Loading...</Text>
      ) : (
        <>
          {noPostsMessage && <Text mt={8} color="red.500">{noPostsMessage}</Text>}
          <VStack spacing={8} w="100%" p={0}>
            {currentPosts.map(post => (
              <Post key={post._id} post={post} />
            ))}
          </VStack>
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Text>Page {currentPage} of {Math.ceil(posts.length / postsPerPage)}</Text>
            <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(posts.length / postsPerPage)}>
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

const Post = ({ post }) => {
  const [votes, setVotes] = useState(post.upvotes - post.downvotes);
  const [userVote, setUserVote] = useState(0); // 0: no vote, 1: upvoted, -1: downvoted
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the post is already bookmarked on mount
    const storedBookmarks = localStorage.getItem("bookmarkedPosts");
    const bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
    const isAlreadyBookmarked = bookmarks.some((bookmark) => bookmark._id === post._id);
    setIsBookmarked(isAlreadyBookmarked);
  }, [post._id]);

  const handleUpvote = () => {
    if (userVote === 1) {
      setVotes(votes - 1);
      setUserVote(0);
    } else if (userVote === -1) {
      setVotes(votes + 2);
      setUserVote(1);
    } else {
      setVotes(votes + 1);
      setUserVote(1);
    }
  };

  const handleDownvote = () => {
    if (userVote === -1) {
      setVotes(votes + 1);
      setUserVote(0);
    } else if (userVote === 1) {
      setVotes(votes - 2);
      setUserVote(-1);
    } else {
      setVotes(votes - 1);
      setUserVote(-1);
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    const storedBookmarks = localStorage.getItem("bookmarkedPosts");
    let bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];

    const isAlreadyBookmarked = bookmarks.some((bookmark) => bookmark._id === post._id);

    if (isAlreadyBookmarked) {
      bookmarks = bookmarks.filter((bookmark) => bookmark._id !== post._id);
    } else {
      bookmarks.push(post);
    }

    localStorage.setItem("bookmarkedPosts", JSON.stringify(bookmarks));
    setIsBookmarked(!isAlreadyBookmarked);
  };

  const openPost = () => {
    navigate(`/view-post/${post._id}`);
  };

  const viewInGoogleMaps = (e) => {
    e.stopPropagation(); 
    const query = encodeURIComponent(post.location.description);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(googleMapsUrl, '_blank'); 
  };

  return (
    <Box w="100%" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" _hover={{ bg: 'gray.100' }} onClick={openPost}>
      <VStack spacing={4} align="start">
        <HStack spacing={4} align="start" w="100%">
          <VStack spacing={2} align="center">
            <IconButton
              icon={<ArrowUpIcon />}
              aria-label="Upvote"
              onClick={(e) => { e.stopPropagation(); handleUpvote(); }}
              colorScheme={userVote === 1 ? 'green' : 'gray'}
            />
            <Text>{votes}</Text>
            <IconButton
              icon={<ArrowDownIcon />}
              aria-label="Downvote"
              onClick={(e) => { e.stopPropagation(); handleDownvote(); }}
              colorScheme={userVote === -1 ? 'red' : 'gray'}
            />
          </VStack>
          <Link to={`/view-post/${post._id}`} style={{ textDecoration: 'none', width: '100%' }}>
            <HStack align="start" spacing={4} flex="1">
              <VStack align="start" spacing={2} flex="1">
                <Text fontSize="2xl" fontWeight="bold">{post.title}</Text>
                <Text noOfLines={5} textAlign="left">{post.body}</Text>
              </VStack>
              <Image boxSize="250px" src={post.imageUrl || "https://via.placeholder.com/250"} alt={post.title} />
            </HStack>
          </Link>
        </HStack>
        <HStack mt={4} pt={4} w="100%" justify="flex-end" spacing={4}>
          <Button colorScheme="#004f32" variant="outline" onClick={viewInGoogleMaps}>View in Google Maps</Button>
          <IconButton
            icon={<StarIcon />}
            aria-label="Bookmark"
            onClick={handleBookmark}
            colorScheme={isBookmarked ? 'yellow' : 'gray'}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default HomePostFeed;