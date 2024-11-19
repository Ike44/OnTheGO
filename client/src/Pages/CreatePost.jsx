import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, useToast, List, ListItem, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { getPlaceSuggestions } from '../google/Google';
import { useLocation as useRouterLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';



function CreatePost() {

  const [postType, setPostType] = useState('Personal');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(0);
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [images, setImages] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState({
    description: '',
    placeId: ''
  });
  const toast = useToast();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const routerLocation = useRouterLocation();
  const post = routerLocation.state?.post; 
  const { postId } = useParams();


//added this  
useEffect(() => {
  console.log('Editing Post:', post);
    if (post) {
      setPostType(post.postType);
      setTitle(post.title);
      setCategory(post.category);
      setBody(post.body);
      setRating(post.postType === 'Personal' ? post.rating : 0);
      setBusinessWebsite(post.postType === 'Business' ? post.businessWebsite : '');
      setFromDate(post.postType === 'Personal' ? post.fromDate : '');
      setToDate(post.postType === 'Personal' ? post.toDate : '');
      setLocation(post.location);
    }
  }, [post]);

  const deletePost = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/posts/${postId}`);
      if (response.status === 200) {
        alert('Post deleted successfully');
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to delete the post:', error);
      alert('Failed to delete the post');
    }
  };
  
  const handleInputChange = async (event) => {
    const value = event.target.value;
    setLocation(prevState => ({
      ...prevState,
      description: value
    }));

    if (value.length > 1) {
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

  const handleSuggestionClick = (suggestion) => {
    setLocation({
      description: suggestion.description,
      placeId: suggestion.placeId
    });
    setSuggestions([]);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const renderStars = () => {
    return Array(5).fill("").map((_, index) => (
      <FaStar
        key={index}
        onClick={() => setRating(index + 1)}
        cursor="pointer"
        color={index < rating ? "yellow" : "gray"}
        size="20px"
      />
    ));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
        postType,
        title,
        location,
        category,
        body,
        images: images.map(file => file.name),
        rating: postType === 'Personal' ? rating : undefined,
        fromDate: postType === 'Personal' ? fromDate : undefined,
        toDate: postType === 'Personal' ? toDate : undefined,
        businessWebsite: postType === 'Business' ? businessWebsite : undefined
    };

    const url = postId ? `http://localhost:3001/api/posts/${postId}` : 'http://localhost:3001/api/posts';
    const method = postId ? 'put' : 'post';
    

    try {
        const response = await axios[method](url, postData);
        toast({
            title: post ? 'Post Updated.' : 'Post Created.',
            description: post ? "We've updated your post successfully." : "We've created your post successfully.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        navigate(`/view-post/${response.data._id}`);
    } catch (error) {
        console.error('Error saving post:', error);
        toast({
            title: 'Error Saving Post.',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    }
  };


  return (
    <Box w="85%" m="auto" pt="15px" textAlign="left" mt="6" position="relative">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired mt="20">
            <FormLabel>Post Type</FormLabel>
            <Select value={postType} onChange={(e) => setPostType(e.target.value)}>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
            </Select>
          </FormControl>
          
          <FormControl isRequired>
            <FormLabel>Post Title</FormLabel>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              ref={inputRef}
              type="text"
              value={location.description}
              onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
              <List spacing={3} mt={2} bg="white" p={4} rounded="md" boxShadow="md" zIndex="2">
                {suggestions.map((suggestion, index) => (
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
                    onMouseDown={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.description}
                  </ListItem>
                ))}
              </List>
            )}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Restaurant">Restaurant</option>
              <option value="Hidden gems">Hidden Gems</option>
              <option value="City">City</option>
              <option value="Transportation">Transportation</option>
            </Select>
          </FormControl>

          {postType === 'Personal' && (
            <>
              <FormControl>
                <FormLabel>Duration</FormLabel>
                <HStack spacing={4}>
                  <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                  <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel>Rating</FormLabel>
                <HStack spacing={1}>
                  {renderStars()}
                </HStack>
              </FormControl>
            </>
          )}

          {postType === 'Business' && (
            <FormControl>
              <FormLabel>Business Website</FormLabel>
              <Input type="text" value={businessWebsite} onChange={(e) => setBusinessWebsite(e.target.value)} />
            </FormControl>
          )}

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Upload Images</FormLabel>
            <Input type="file" multiple onChange={handleImageChange} />
          </FormControl>

          <Button type="submit" colorScheme="blue" mb="40">Post</Button>
        </VStack>
      </form>
    </Box>
  );
}

export default CreatePost;



