import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, HStack, useToast, List, ListItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { getPlaceSuggestions } from '../google/Google';  // Make sure this path is correct

function CreatePost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [location, setLocation] = useState({
    description: '', // The full text description of the location
    placeId: ''      // The place ID from Google Places API, if available
  });
  const toast = useToast();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  

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
        setIsFocused(true);
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
    setIsFocused(false);
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
      title,
      location: {
        description: location.description,
        placeId: location.placeId, 
      },
      category,
      body,
      rating: rating > 0 ? rating : undefined,
      images: images.map(file => file.name),
      fromDate, 
      toDate, 
    };
  
    console.log("Submitting post with data:", postData); // Ensure this logs correct values
  
    try {
      const response = await axios.post('http://localhost:3001/api/posts', postData);
      console.log("Server response:", response); // Check what the server actually returns
      toast({
        title: 'Post Created.',
        description: "We've created your post successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate(`/view-post/${response.data._id}`);
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error Creating Post.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  

  return (
    <Box p={4}>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Personal</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Post Title</FormLabel>
                  <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Place</FormLabel>
                  <Input
                    ref={inputRef}
                    type="text"
                    value={location.description}
                    onChange={handleInputChange}
                    onBlur={() => setIsFocused(false)}
                  />
                  {isFocused && suggestions.length > 0 && (
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
                          transition="all 0.2s"
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
                    <option value="restaurant">Restaurant</option>
                    <option value="hidden gems">Hidden Gems</option>
                    <option value="city">City</option>
                    <option value="transportation">Transportation</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Duration</FormLabel>
                  <HStack spacing={4} align="center">
                    <Box textAlign="center">
                      <Input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                      <FormLabel fontSize="sm" mt={1}>From</FormLabel>
                    </Box>
                    <Box textAlign="center">
                      <Input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                      <FormLabel fontSize="sm" mt={1}>To</FormLabel>
                    </Box>
                  </HStack>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Rating</FormLabel>
                  <HStack spacing={1}>
                    {renderStars()}
                  </HStack>
                </FormControl>
                <FormControl>
                  <FormLabel>Upload Images</FormLabel>
                  <Input type="file" multiple onChange={handleImageChange} />
                </FormControl>
                <Button type="submit" colorScheme="blue">Post</Button>
              </VStack>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default CreatePost;
