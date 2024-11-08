import { Box, Button, Image, Text, VStack, HStack, IconButton, Heading } from '@chakra-ui/react'
import { ArrowUpIcon, ArrowDownIcon, StarIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SubNav from '../Subnav';


const HomePostFeed = () => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts')
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [])

  return (
    <Box w="85%" m="auto" textAlign="left" mt="40px">
      <Heading as="h2" size="xl" mb={-20}>Feed</Heading>
      <SubNav />
      <VStack spacing={8} w="100%" p={0}>
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </VStack>
    </Box>
  )
}

const Post = ({ post }) => {
  const [votes, setVotes] = useState(post.upvotes - post.downvotes)
  const [userVote, setUserVote] = useState(0) // 0: no vote, 1: upvoted, -1: downvoted
  const [isBookmarked, setIsBookmarked] = useState(false)
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
      setVotes(votes - 1)
      setUserVote(0)
    } else if (userVote === -1) {
      setVotes(votes + 2)
      setUserVote(1)
    } else {
      setVotes(votes + 1)
      setUserVote(1)
    }
  }

  const handleDownvote = () => {
    if (userVote === -1) {
      setVotes(votes + 1)
      setUserVote(0)
    } else if (userVote === 1) {
      setVotes(votes - 2)
      setUserVote(-1)
    } else {
      setVotes(votes - 1)
      setUserVote(-1)
    }
  }

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


  return (
    <Box w="100%" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" _hover={{ bg: 'gray.100' }}>
      <VStack spacing={4} align="start">
        <HStack spacing={4} align="start">
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
          <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', width: '100%' }}>
            <HStack align="start" spacing={4} flex="1">
              <VStack align="start" spacing={2} flex="1">
                <Text fontSize="2xl" fontWeight="bold">{post.title}</Text>
                <Text noOfLines={5} textAlign="left">{post.body}</Text>
              </VStack>
              <Image boxSize="250px" src={post.image} alt={post.title} />
            </HStack>
          </Link>
        </HStack>
        <HStack mt={4} pt={4} w="100%" justify="flex-end" spacing={4}>
          <Button colorScheme="teal" variant="outline" onClick={(e) => e.stopPropagation()}>View in Google Maps</Button>
          <IconButton
            icon={<StarIcon />}
            aria-label="Bookmark"
            onClick={handleBookmark}
            colorScheme={isBookmarked ? 'yellow' : 'gray'}
          />
        </HStack>
      </VStack>
    </Box>
  )
  }


export default HomePostFeed;