import { SearchIcon } from "@chakra-ui/icons";
import { Box, Heading, Text, Link, VStack, HStack, Icon } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { initGoogleMapsAPI, getPlaceDetails } from '../google/Google';
import SearchSuggestions from "../google/SearchSuggestions";

function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedTerm, setDisplayedTerm] = useState("");
  const [placeDetails, setPlaceDetails] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        await initGoogleMapsAPI();
      } catch (error) {
        console.error('Error initializing Google Maps API:', error);
      }
    };

    initializeGoogleMaps();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    const placeId = params.get('place_id');
    if (query) {
      setSearchTerm(query.replace(/\+/g, ' ')); 
      setDisplayedTerm(query.replace(/\+/g, ' ')); 
    }
    if (placeId) {
      getPlaceDetails(placeId).then(details => {
        setPlaceDetails(details);
        if (details && details.geometry && window.google) {
          const { location } = details.geometry;
          const mapOptions = {
            center: { lat: location.lat(), lng: location.lng() },
            zoom: 15
          };

          if (!mapInstanceRef.current && mapRef.current) {
            mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
            
            new window.google.maps.Marker({
              position: { lat: location.lat(), lng: location.lng() },
              map: mapInstanceRef.current,
              title: details.name
            });
          }
        }
      }).catch(error => {
        console.error('Error fetching place details:', error);
      });
    }
  }, [location.search]); 

  const handleSearch = (query) => {
    const formattedQuery = query.replace(/\s+/g, '+');
    navigate(`/searchResults?q=${formattedQuery}`);
  };

  return (
    <Box w="85%" m="auto" p="80px 10px" backgroundColor="gray.100">
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm); }}>
        <SearchSuggestions initialQuery={searchTerm} onSearch={handleSearch} />
      </form>

      <Box display="flex" justifyContent="space-around" mt={6}>
        {placeDetails && (
          <a href={`https://www.google.com/search?q=${encodeURIComponent(placeDetails.name)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
            <Box p="4" bg="white" boxShadow="md" borderRadius="md" flex="1" mr="4">
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="lg">{placeDetails.name}</Heading>
                <Text fontSize="md">{placeDetails.formatted_address}</Text>
                {placeDetails.formatted_phone_number && (
                  <HStack>
                    <Icon as={SearchIcon} />
                    <Text>{placeDetails.formatted_phone_number}</Text>
                  </HStack>
                )}
                {placeDetails.website && (
                  <HStack onClick={(e) => e.stopPropagation()}>
                    <Icon as={SearchIcon} />
                    <Link href={placeDetails.website} isExternal color="blue.500">
                      {placeDetails.website.length > 30 ? `${placeDetails.website.substring(0, 30)}...` : placeDetails.website}
                    </Link>
                  </HStack>
                )}
                {placeDetails.opening_hours && placeDetails.opening_hours.weekday_text && (
                  <Box textAlign="center" alignSelf='center'>
                    <Heading as="h4" size="md">Opening Hours</Heading>
                    {placeDetails.opening_hours.weekday_text.map((day, index) => (
                      <Text key={index}>{day}</Text>
                    ))}
                  </Box>
                )}
                {placeDetails.reviews && placeDetails.reviews.length > 0 && (
                  <Box>
                    <Heading as="h4" size="md">Reviews</Heading>
                    {placeDetails.reviews.slice(0, 3).map((review, index) => (
                      <Box key={index} p={2} border="1px" borderColor="gray.200" borderRadius="md">
                        <Text textAlign="left" fontWeight="bold">{review.author_name}</Text>
                        <Text textAlign="left">
                          {review.text.length > 100 ? `${review.text.substring(0, 100)}...` : review.text}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                )}
              </VStack>
            </Box>
          </a>
        )}
        <Box p="4" bg="white" boxShadow="md" borderRadius="md" flex="1" ml="4" minHeight="500px">
          <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
        </Box>
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
