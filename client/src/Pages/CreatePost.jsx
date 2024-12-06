import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, useToast, List, ListItem, HStack, Image } from '@chakra-ui/react';
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
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState({
    description: '',
    place_id: ''
  });
  const toast = useToast();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const routerLocation = useRouterLocation();
  const post = routerLocation.state?.post;
  const { postId } = useParams();


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
      description: value,
      place_id: prevState.description === value ? prevState.place_id : '' // Only reset place_id if the description changes
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
      place_id: suggestion.place_id
    });
    setSuggestions([]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // Generate preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await axios.post('http://localhost:3001/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });


      return response.data.imageId; 
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error Uploading Image.',
        description: 'Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw new Error('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let imageId = '';
      if (image) {
        try {
          imageId = await uploadImage();
        } catch (error) {
          console.error('Error uploading image:', error);
          toast({
            title: 'Image Upload Failed',
            description: 'An error occurred while uploading the image. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          return; // Stop submission if image upload fails
        }
      }
  
      // Validate date range
      if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
        toast({
          title: 'Invalid Date Range',
          description: 'The end date must be after the start date.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
  
      // Prepare post data
      const postData = {
        postType,
        title,
        location,
        category,
        body,
        image: imageId,
        rating: postType === 'Personal' ? rating : undefined,
        fromDate: postType === 'Personal' ? fromDate : undefined,
        toDate: postType === 'Personal' ? toDate : undefined,
        businessWebsite: postType === 'Business' ? businessWebsite : undefined,
      };
  
      // Determine URL and HTTP method
      const url = postId
        ? `http://localhost:3001/api/posts/${postId}`
        : 'http://localhost:3001/api/posts';
      const method = postId ? 'put' : 'post';
  
      // Submit the post data
      try {
        const response = await axios[method](url, postData);
        toast({
          title: postId ? 'Post Updated' : 'Post Created',
          description: postId
            ? "We've updated your post successfully."
            : "We've created your post successfully.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate(`/view-post/${response.data._id}`);
      } catch (error) {
        console.error('Error saving post:', error);
        toast({
          title: 'Error Saving Post',
          description: 'An error occurred while saving the post. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      // Outer error handling for unexpected errors
      console.error('Unexpected error during form submission:', error);
      toast({
        title: 'Form Submission Failed',
        description: 'An unexpected error occurred. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
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
              <option value="Landmarks">Landmarks</option>
            </Select>
          </FormControl>

          {postType === 'Personal' && (
            <>
              <FormControl>
                <FormLabel>Duration of your Trip</FormLabel>
                <HStack spacing={4}>
                  <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                  <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel>Rate your visit</FormLabel>
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

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Upload Image</FormLabel>
            <Input type="file" onChange={handleImageChange} />
            {uploadProgress > 0 && uploadProgress < 100 && (
              <Box w="100%" h="2" bg="gray.200" rounded="full" mb={4}>
                <Box w={`${uploadProgress}%`} h="100%" bg="blue.500" rounded="full"/>
              </Box>
            )}
            {imagePreview && (
              <Box maxW="300px" mt={4}>
                <Image
                  src={imagePreview}
                  alt="Preview"
                  objectFit="cover"
                  w="100%"
                  h="100px"
                  rounded="md"
                />
              </Box>
            )}
          </FormControl>

          <Button type="submit" colorScheme="blue" mb="40">Post</Button>
        </VStack>
      </form>
    </Box>
  );
}

export default CreatePost;