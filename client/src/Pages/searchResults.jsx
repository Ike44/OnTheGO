import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, IconButton, Heading } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedTerm, setDisplayedTerm] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    if (query) {
      setSearchTerm(query.replace(/\+/g, ' ')); 
      setDisplayedTerm(query.replace(/\+/g, ' ')); 
    }
  }, [location.search]); 

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setDisplayedTerm(searchTerm.trim());
      navigate(`/searchResults?q=${searchTerm.trim().replace(/\s+/g, '+')}`);
    }
  };

  return (
    <Box w="85%" m="auto" p="80px 10px" backgroundColor="gray.100">
      <form onSubmit={handleSearch}>
        <Box display="flex" rounded="40px" bg="white" p="8px 20px" w="85%" m="auto" alignItems="center" boxShadow="3xl">
          <SearchIcon w={5} h={5} />
          <Input
            border="none"
            placeholder="Where to?"
            size="lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IconButton
            type="submit"
            aria-label="Search database"
            icon={<SearchIcon />}
            ml={2}
            bg="gray.500"
            color="white"
            _hover={{ bg: "blue.600" }}
          />
        </Box>
      </form>

      <Box display="flex" justifyContent="space-around" mt={6}>
        <Box w="45%" p="4" bg="gray.100">Coming soon!</Box>
        <Box w="45%" p="4" bg="gray.100">Coming soon!</Box>
      </Box>
      <Box textAlign="left" mt={6} ml={4}>
        <Heading as="h2" size="lg">
          Showing results for: {displayedTerm}
        </Heading>
      </Box>
    </Box>
  );
}

export default SearchResults;
