import { SearchIcon } from "@chakra-ui/icons";
import { Box, Input, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchResults() {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/searchResults");
  };

  return (
    
    // <Box w="85%" m="auto" p="80px 10px" backgroundColor="gray.100">
    // <form onSubmit={handleSearch}>
    //   <Box display="flex" rounded="40px"  bg="white" p="8px 20px" w="85%" m="auto" alignItems="center" boxShadow="3xl" >
    //     <SearchIcon w={5} h={5} />
    //     <Input
    //       border="none" placeholder="Where to?" size="lg" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
    //     />
    //     <IconButton type="submit" aria-label="Search database" icon={<SearchIcon />} ml={2} bg="gray.500" color="white" _hover={{ bg: "blue.600" }}/>
    //   </Box>
    //   </form>
    // </Box>

      



    
    <Box w="50%" m="auto" p="200px">
        Coming soon!
    </Box>
  );

};

export default SearchResults;
