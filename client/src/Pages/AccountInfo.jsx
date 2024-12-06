import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button, Avatar, Heading, useToast, Flex } from '@chakra-ui/react';
import { getGoogleUserData, signOut } from '../google/Google';
import { useNavigate } from 'react-router-dom';
import Signin from '../Components/Signin';

function AccountInfo() {
    const [userData, setUserData] = useState(null);
    const [sessionEmail, setSessionEmail] = useState(null);
    const [showSignIn, setShowSignIn] = useState(false);
    const [signInTrigger, setSignInTrigger] = useState(0);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        // Check for Google user data
        const googleData = getGoogleUserData();
        if (googleData) {
            setUserData(googleData);
            setShowSignIn(false);
            return;
        }

        // Check for session email if no Google data
        const email = sessionStorage.getItem('userEmail');
        if (email) {
            setSessionEmail(email);
            setShowSignIn(false);
        }
    }, [signInTrigger]); // Re-run when signInTrigger changes

    const handleSignInSuccess = () => {
        setSignInTrigger(prev => prev + 1); // Trigger useEffect to re-check user data
    };

    const handleSignOut = async () => {
        try {
            if (userData) {
                // Handle Google sign out
                await signOut();
            } else {
                // Clear session storage for regular sign out
                sessionStorage.removeItem('userEmail');
            }
            
            // Reset states
            setUserData(null);
            setSessionEmail(null);
            
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

    const maskUserId = (id) => {
        if (!id) return '';
        if (id.length <= 6) return id;
        const lastSix = id.slice(-6);
        const maskLength = id.length - 6;
        return '*'.repeat(maskLength) + lastSix;
    };

    // Show message if no user data or session email
    if (!userData && !sessionEmail) {
        return (
            <Flex 
                minH="calc(100vh - 180px)"
                align="center"
                justify="center"
                p={8}
            >
                <Box textAlign="center">
                    <Heading size="lg" mb={4} color="gray.600">
                        No Account Info Available
                    </Heading>
                    <Text fontSize="md" color="gray.500" mb={6}>
                        You have to be signed in to view your account information
                    </Text>
                    <Button
                        bg="black"
                        color="white"
                        size="lg"
                        _hover={{ bg: 'gray.800' }}
                        onClick={() => setShowSignIn(true)}
                    >
                        Sign In
                    </Button>
                    {showSignIn && <Signin onSignInSuccess={handleSignInSuccess} />}
                </Box>
            </Flex>
        );
    }

    // If we have Google user data, show full profile
    if (userData) {
        return (
            <Flex 
                minH="calc(100vh - 180px)"
                justify="center"
                p={8}
            >
                <Box maxW="container.md" w="full">
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
                                    <Text color="gray.600">{maskUserId(userData.id)}</Text>
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
            </Flex>
        );
    }

    // If we have session email, show simplified profile
    return (
        <Flex 
            minH="calc(100vh - 180px)"
            justify="center"
            p={8}
        >
            <Box maxW="container.md" w="full">
                <VStack spacing={6} align="stretch">
                    <Box textAlign="center" py={4}>
                        <Avatar 
                            size="2xl" 
                            name={sessionEmail}
                            mb={4}
                        />
                        <Heading size="lg" mb={2}>Account Information</Heading>
                        <Text color="gray.600" fontSize="lg">{sessionEmail}</Text>
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
                                <Text fontWeight="bold" mb={1}>Email</Text>
                                <Text color="gray.600">{sessionEmail}</Text>
                            </Box>

                            <Box>
                                <Text fontWeight="bold" mb={1}>Account Type</Text>
                                <Text color="gray.600">Email Sign In</Text>
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
        </Flex>
    );
}

export default AccountInfo;
