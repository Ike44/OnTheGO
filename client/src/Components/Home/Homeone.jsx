import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { initGoogleMapsAPI } from "../../google/Google";
import SearchSuggestions from "../../google/SearchSuggestions";
import { useNavigate } from "react-router-dom";

function Homeone() {
    const navigate = useNavigate();

    useEffect(() => {
        initGoogleMapsAPI();
    }, []);

    const handleSearch = (query) => {
        const formattedQuery = query.replace(/\s+/g, '+');
        navigate(`/searchResults?q=${formattedQuery}`);
    };

    return (
        <Box w="85%" m="auto" p="150px 100px" background='url(https://static.tacdn.com/img2/brand/home/homemar2022_dt_trans.webp) center/cover no-repeat' backgroundColor="red.100">
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(e.target.value); }}>
                <SearchSuggestions onSearch={handleSearch} />
            </form>
        </Box>
    );
}

export default Homeone;