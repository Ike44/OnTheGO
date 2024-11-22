import React, { useRef, useState, useEffect } from "react";
import { Box, Image, Text, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function HomeCountries() {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const navigate = useNavigate();


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

    const updateScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        updateScrollButtons();
        const refCurrent = scrollRef.current;
        if (refCurrent) {
            refCurrent.addEventListener("scroll", updateScrollButtons);
            return () => refCurrent.removeEventListener("scroll", updateScrollButtons);
        }
    }, []);


    const handleCountryClick = (country) => {
        navigate('/feed', { state: { presetLocation: country } });
    };
      
      
    return (
        <Box w="85%" m="auto" pt="15px" textAlign="left" mt="40px" position="relative">
            <Text fontWeight="700" fontSize="3xl">Countries to Explore</Text>
            <Text fontSize="md">Recommended countries to explore</Text>
            <Box position="relative">
                {canScrollLeft && (
                    <IconButton
                        aria-label="Scroll left"
                        icon={<ChevronLeftIcon />}
                        position="absolute"
                        left="-42px"
                        top="45.5%"
                        transform="translateY(-50%)"
                        zIndex="1"
                        onClick={() => scroll(-300)}
                        width="30px"
                        height="300px"
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                    />
                )}
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
                    {data.map((el) => (
                        <Box 
                            key={el.id} 
                            onClick={() => handleCountryClick(el.title)}
                            cursor="pointer"
                            bg="white"
                            pb="30px"
                            position="relative"
                            textAlign="left"
                            flexShrink="0"
                            w="300px"
                            transition="transform 0.3s ease-in-out"
                            _hover={{ transform: "scale(1.05)" }}
                        >
                            <Image
                                filter="auto"
                                brightness="65%"
                                src={el.img}
                                alt="img"
                                w="100%"
                                h="300px"
                                objectFit="cover"
                            />
                            <Text
                                left="10px"
                                color="white"
                                position="absolute"
                                bottom="30px"
                                fontWeight="900"
                                fontSize="3xl"
                            >
                                {el.title}
                            </Text>
                        </Box>
                    ))}
                </Box>
                {canScrollRight && (
                    <IconButton
                        aria-label="Scroll right"
                        icon={<ChevronRightIcon />}
                        position="absolute"
                        right="-42px"
                        top="45.5%"
                        transform="translateY(-50%)"
                        zIndex="1"
                        onClick={() => scroll(300)}
                        width="30px"
                        height="300px"
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                    />
                )}
            </Box>
        </Box>
    );
}

export default HomeCountries;