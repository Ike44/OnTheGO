import React, { useRef } from "react";
import { Box, Image, Text, IconButton, Link } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function HomeCountries() {
    const scrollRef = useRef(null);

    const data = [
        {
            id: 1,
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/66/68/f6/caption.jpg?w=300&h=300&s=1&cx=988&cy=664&chk=v1_d1b5b3f4c384c764b7e1",
            title: "Mexico"
        },
        {
            id: 2,
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/60/b0/bd/bora-bora.jpg?w=300&h=300&s=1",
            title: "French Polynesia",
        },
        {
            id: 3,
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/33/f7/dd/caption.jpg?w=300&h=300&s=1",
            title: "Spain"
        },
        {
            id: 4,
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/e4/10/e4/it-was-an-amazing-experience.jpg?w=300&h=300&s=1",
            title: "China"
        },
        {
            id: 5,
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/e4/12/c9/visao-privilegiada.jpg?w=300&h=300&s=1",
            title: "Brazil"
        },
        {
            id: 6,
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/3d/a5/07/caption.jpg?w=300&h=300&s=1",
            title: "Japan"
        },
        {
            id: 7,
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/33/f4/33/caption.jpg?w=300&h=300&s=1",
            title: "Thailand"
        },
        {
            id: 8,
            img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/f0/6b/18/gita-fuori-porta-avevo.jpg?w=300&h=300&s=1",
            title: "Italy"
        }
    ];

    const scroll = (scrollOffset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += scrollOffset;
        }
    };

    return (
        <Box w="85%" m="auto" pt="15px" textAlign="left" mt="40px" position="relative">
            <Text fontWeight="700" fontSize='3xl'>Countries to Explore</Text>
            <Text fontSize='md'>Recommended countries to explore</Text>
            <Box position="relative">
                <IconButton
                    aria-label="Scroll left"
                    icon={<ChevronLeftIcon />}
                    position="absolute"
                    left="-20px"
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex="1"
                    onClick={() => scroll(-300)}
                />
                <Box 
                    ref={scrollRef}
                    display="flex" 
                    overflowX="auto" 
                    gap="15px" 
                    mt="15px" 
                    css={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                        'scrollbarWidth': 'none',
                        '-ms-overflow-style': 'none',
                        'scrollBehavior': 'smooth',
                    }}
                >
                    {data && data.map((el) => (
                        <Link 
                            key={el.id} 
                            href={`?country=${el.title.toLowerCase().replace(' ', '-')}`}
                            _hover={{ textDecoration: 'none' }}
                        >
                            <Box 
                                bg="white" 
                                pb="30px" 
                                position="relative" 
                                textAlign="left"
                                flexShrink="0"
                                w="300px"
                                transition="transform 0.3s ease-in-out"
                                _hover={{ transform: "scale(1.05)" }}
                            >
                                <Image filter='auto' brightness='65%' src={el.img} alt="img" w="100%" h="300px" objectFit="cover" />
                                <Text left="10px" color="white" position="absolute" bottom="30px" fontWeight="900" fontSize='3xl'>{el.title}</Text>
                            </Box>
                        </Link>
                    ))}
                </Box>
                <IconButton
                    aria-label="Scroll right"
                    icon={<ChevronRightIcon />}
                    position="absolute"
                    right="-20px"
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex="1"
                    onClick={() => scroll(300)}
                />
            </Box>
        </Box>
    );
}

export default HomeCountries;