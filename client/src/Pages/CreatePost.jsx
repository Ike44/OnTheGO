import {
  Box, Button, FormControl, FormLabel, Input, Select, Textarea, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, HStack, useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa'; // Import the star icon

function CreatePost() {
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [place, setPlace] = useState('');
  const [postTitle, setPostTitle] = useState(''); // State for post title in both tabs
  //const [rating, setRating] = useState(0); // Only used in the Personal tab
  const [body, setBody] = useState('');
  const [images, setImages] = useState([]);
  const [businessWebsite, setBusinessWebsite] = useState(''); // Only used in the Business tab
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('postTitle', postTitle);
    formData.append('country', country);
    formData.append('category', category);
    formData.append('place', place);
    formData.append('body', body);
    //if (rating > 0) formData.append('rating', rating); // Include rating for Personal
    if (businessWebsite) formData.append('businessWebsite', businessWebsite); // Include business website for Business
    images.forEach(image => formData.append('images', image));

    try {
      await axios.post('http://localhost:3001/api/posts', formData);
      toast({
        title: 'Post Created.',
        description: "We've created your post successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Optionally reset form fields here
    } catch (error) {
      toast({
        title: 'Error Creating Post.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // const renderStars = () => {
  //   return Array(5).fill("").map((_, index) => (
  //     <FaStar
  //       key={index}
  //       onClick={() => setRating(index + 1)}
  //       cursor="pointer"
  //       color={index < rating ? "yellow.400" : "gray.300"}
  //       size="20px"  // Adjustable size
  //     />
  //   ));
  // };

  return (
    <Box p={4}>
      <Tabs variant='enclosed'>
        <TabList>
          <Tab>Personal</Tab>
          <Tab>Business</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Post Title</FormLabel>
                  <Input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Country</FormLabel>
                  <Select placeholder="Select country" value={country} onChange={(e) => setCountry(e.target.value)}>
                    {["United States", "Canada", "United Kingdom", "Australia", "India", "Germany", "France", "Italy", "Spain", "Brazil"].map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </Select>
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
                  <FormLabel>Place</FormLabel>
                  <Input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
                </FormControl>
                {/* <FormControl isRequired>
                  <FormLabel>Rating</FormLabel>
                  <HStack spacing={1}>
                    {renderStars()}
                  </HStack>
                </FormControl> */}
                <FormControl>
                  <FormLabel>Upload Images</FormLabel>
                  <Input type="file" multiple onChange={handleImageChange} />
                </FormControl>
                <Button type="submit" colorScheme="blue">Post</Button>
              </VStack>
            </form>
          </TabPanel>
          <TabPanel>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Post Title</FormLabel>
                  <Input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Business Website</FormLabel>
                  <Input type="url" placeholder="https://example.com" value={businessWebsite} onChange={(e) => setBusinessWebsite(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Country</FormLabel>
                  <Select placeholder="Select country" value={country} onChange={(e) => setCountry(e.target.value)}>
                    {["United States", "Canada", "United Kingdom", "Australia", "India", "Germany", "France", "Italy", "Spain", "Brazil"].map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </Select>
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
                  <FormLabel>Place</FormLabel>
                  <Input type="text" value={place} onChange={(e) => setPlace(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
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
