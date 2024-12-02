import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button, Avatar, Heading, useToast } from '@chakra-ui/react';
import { getGoogleUserData, signOut } from '../google/Google';
import { useNavigate } from 'react-router-dom';

function AccountInfo() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const data = getGoogleUserData();
        setUserData(data);
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
            toast({
                title: 'Signed out successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/');
        } catch (error) {
            console.error('Sign out error:', error);
            toast({
                title: 'Error signing out',
                description: 'Please try again',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (!userData) {
        return (
            <Box 
                p={8} 
                maxW="container.md" 
                mx="auto" 
                textAlign="center"
            >
                <Heading size="lg" mb={4} color="gray.600">
                    No Account Info Available
                </Heading>
                <Text fontSize="md" color="gray.500">
                    Please sign in to view your account information
                </Text>
            </Box>
        );
    }

    return (
        <Box p={8} maxW="container.md" mx="auto">
            <VStack spacing={6} align="stretch">
                <Box textAlign="center" py={4}>
                    <Avatar 
                        size="2xl" 
                        src={userData.imageUrl}
                        name={userData.name}
                        mb={4}
                    />
                    <Heading size="lg" mb={2}>{userData.name}</Heading>
                    <Text color="gray.600" fontSize="lg">{userData.email}</Text>
                </Box>

                <Box 
                    borderWidth="1px" 
                    borderRadius="lg" 
                    p={6}
                    bg="white"
                    shadow="sm"
                >
                    <VStack spacing={4} align="stretch">
                        <Box>
                            <Text fontWeight="bold" mb={1}>User ID</Text>
                            <Text color="gray.600">{userData.id}</Text>
                        </Box>

                        <Box>
                            <Text fontWeight="bold" mb={1}>Email</Text>
                            <Text color="gray.600">{userData.email}</Text>
                        </Box>

                        <Box>
                            <Text fontWeight="bold" mb={1}>Account Status</Text>
                            <Text 
                                color={userData.verified ? "green.500" : "red.500"}
                                fontWeight="medium"
                            >
                                {userData.verified ? "Verified" : "Not Verified"}
                            </Text>
                        </Box>
                    </VStack>
                </Box>

                <Button
                    onClick={handleSignOut}
                    colorScheme="red"
                    size="lg"
                    w="full"
                    mt={4}
                >
                    Sign Out
                </Button>
            </VStack>
        </Box>
    );
}

export default AccountInfo;
