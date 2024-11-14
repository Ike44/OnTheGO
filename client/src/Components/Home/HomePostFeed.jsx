import { Box, Button, Image, Text, VStack, HStack, IconButton, Heading } from '@chakra-ui/react'
import { ArrowUpIcon, ArrowDownIcon, StarIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SubNav from '../Subnav';


const HomePostFeed = () => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

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

  return (
    <Box w="85%" m="auto" textAlign="left" mt="40px" pb="20px">
      <Heading as="h2" size="xl" mb={-20}>Feed</Heading>
      <SubNav />
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
    </Box>
  )
}

const Post = ({ post }) => {
  const [votes, setVotes] = useState(post.upvotes - post.downvotes)
  const [userVote, setUserVote] = useState(0) // 0: no vote, 1: upvoted, -1: downvoted
  const [isBookmarked, setIsBookmarked] = useState(false)

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
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

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

export default HomePostFeed