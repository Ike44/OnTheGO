import React, { useEffect } from 'react';
import { Button, Box, Image } from "@chakra-ui/react";
import { initGoogleAuth, handleGoogleSignIn } from '../google/Google';

const GoogleSignin = ({ onSignInSuccess, renderButton = true }) => {
    useEffect(() => {
        const init = async () => {
            try {
                await initGoogleAuth();
            } catch (error) {
                console.error('Failed to initialize Google Auth:', error);
            }
        };
        init();
    }, []);

    const handleClick = async () => {
        try {
            const userData = await handleGoogleSignIn();
            if (onSignInSuccess) {
                onSignInSuccess(userData);
            }
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };

    if (!renderButton) {
        return (
            <Box 
                onClick={handleClick}
                cursor="pointer"
                display="inline-flex"
                alignItems="center"
                gap={2}
            >
                <Image
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Logo"
                    boxSize="20px"
                />
                Sign in with Google
            </Box>
        );
    }

    return (
        <Box textAlign="center" mt={4}>
            <Button
                onClick={handleClick}
                w="80%"
                m="auto"
                p="27px 25px"
                borderRadius="3xl"
                bg="white"
                color="black"
                border="1px solid #dadce0"
                _hover={{ bg: '#f8f9fa' }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
            >
                <Image
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Logo"
                    boxSize="20px"
                />
                Sign in with Google
            </Button>
        </Box>
    );
};

export default GoogleSignin;
