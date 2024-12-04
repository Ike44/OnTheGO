import { ViewIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalOverlay, Text, Tabs, TabList, TabPanels, Tab, TabPanel, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import GoogleSignin from './GoogleSignin';

function Signin() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onClose: onRegisterClose } = useDisclosure();
  
    const [isModalShown, setIsModalShown] = useState(false); 
    const [emailError, setEmailError] = useState('');

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [scrollBehavior] = React.useState('inside');

    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({});

    useEffect(() => {
        if (!isModalShown) {
            onOpen();  
            setIsModalShown(true); 
        }
    }, [isModalShown, onOpen]);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    function handleSignInSubmit() {
        if (!validateEmail(signInData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        
        if (signInData.email && signInData.password) {
            // Store email in session storage
            sessionStorage.setItem('userEmail', signInData.email);
            alert("Successfully Logged in");
            onClose(); 
            setIsModalShown(true);  
        } else {
            alert("Please fill out all fields");
        }
    }

    function handleGoogleSignInSuccess(userData) {
        alert("Successfully Logged in with Google");
        onClose();
        setIsModalShown(true);
    }

    function handleRegisterSubmit() {
        if (Object.values(registerData).every(value => value !== '')) {
            alert("Successfully Registered");
            onRegisterClose();  
            onClose();  
            setIsModalShown(true);  
        } else {
            alert("Please fill out all fields");
        }
    }

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setSignInData({ ...signInData, email });
        if (email && !validateEmail(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    return (
        <>
            {/* Sign in Modal */}
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
                size="lg"
                scrollBehavior={scrollBehavior}
                closeOnOverlayClick={false} 
                isClosable={false}  
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalBody pb={6} p="10px 60px">
                        <Text fontSize="3xl" color="black" mb="20px" fontWeight="500">Welcome.</Text>

                        <FormControl isInvalid={!!emailError}>
                            <FormLabel fontWeight="600" fontSize="md">Email</FormLabel>
                            <Input
                                outline="none"
                                ref={initialRef}
                                placeholder='Email'
                                type="email"
                                value={signInData.email}
                                onChange={handleEmailChange}
                            />
                            {emailError && (
                                <Text color="red.500" fontSize="sm" mt={1}>
                                    {emailError}
                                </Text>
                            )}
                        </FormControl>

                        <FormControl mt={3}>
                            <FormLabel fontWeight="600" fontSize="md">Password</FormLabel>
                            <Box display="flex" alignItems="center">
                                <Input
                                    outline="none"
                                    type="password"
                                    placeholder='Password'
                                    value={signInData.password}
                                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                                />
                                <ViewIcon ml="-25px" />
                            </Box>
                        </FormControl>

                        <Box 
                            as="button" 
                            mt="10px" 
                            ml="5px" 
                            textDecoration="underline" 
                            color="black" 
                            fontWeight="400" 
                            fontSize="md"
                        >
                            Forgot Password?
                        </Box>

                        <FormControl textAlign="center">
                            <Button 
                                onClick={handleSignInSubmit} 
                                fontWeight="700" 
                                bg="black" 
                                p="27px 25px" 
                                w="80%" 
                                m="auto" 
                                mt="20px" 
                                borderRadius="3xl" 
                                color="white" 
                                fontSize='md'
                                isDisabled={!!emailError}
                            >
                                SIGN IN
                            </Button>
                        </FormControl>

                        <GoogleSignin onSignInSuccess={handleGoogleSignInSuccess} />

                        <Box w="97%" m="auto" mt="25px" display="flex" gap="8px" alignItems="center">
                            <Divider></Divider>
                            <Text w="100%" fontSize="md">Not a member?</Text>
                            <Divider></Divider>
                        </Box>

                        <Box 
                            as="button" 
                            mt="20px" 
                            textAlign="center" 
                            w="100%" 
                            fontSize="md" 
                            onClick={onRegisterOpen}
                        >
                            <Text as="span" fontWeight="bold" textDecoration="underline">Join</Text>
                            <Text as="span"> to unlock the best of OnTheGo!</Text>
                        </Box>

                        <Text mt="25px" textAlign="center" fontSize="xs">
                            By proceeding, you agree to our <Text as="span" textDecoration="underline">Terms of Use</Text> and confirm you have read our <Text as="span" textDecoration="underline">Privacy and Cookie Statement</Text>.
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Registration Modal */}
            <Modal
                isOpen={isRegisterOpen}
                onClose={onRegisterClose}
                size="lg"
                closeOnOverlayClick={false}  
                isClosable={false} 
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalBody p="20px">
                        <Tabs variant="enclosed">
                            <TabList mb="1em">
                                <Tab fontWeight="bold">Business</Tab>
                                <Tab fontWeight="bold">Personal</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <FormControl>
                                        <FormLabel>Business Name</FormLabel>
                                        <Input
                                            placeholder="Enter business name"
                                            onChange={(e) => setRegisterData({ ...registerData, businessName: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>EIN Number</FormLabel>
                                        <Input 
                                            placeholder="Enter EIN" 
                                            onChange={(e) => setRegisterData({ ...registerData, EIN: e.target.value })} 
                                        />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Website</FormLabel>
                                        <Input 
                                            placeholder="Website URL" 
                                            onChange={(e) => setRegisterData({ ...registerData, website: e.target.value })} 
                                        />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Username</FormLabel>
                                        <Input 
                                            placeholder="Username" 
                                            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} 
                                        />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Password</FormLabel>
                                        <Input 
                                            placeholder="Password" 
                                            type="password" 
                                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} 
                                        />
                                    </FormControl>
                                    <Button 
                                        onClick={handleRegisterSubmit} 
                                        mt={4} 
                                        bg="black" 
                                        color="white" 
                                        width="full"
                                    >
                                        Join
                                    </Button>
                                </TabPanel>
                                <TabPanel>
                                    <FormControl>
                                        <FormLabel>First Name</FormLabel>
                                        <Input 
                                            placeholder="First Name" 
                                            onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })} 
                                        />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input 
                                            placeholder="Last Name" 
                                            onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })} 
                                        />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Username</FormLabel>
                                        <Input 
                                            placeholder="Username" 
                                            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} 
                                        />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Email</FormLabel>
                                        <Input 
                                            placeholder="Email" 
                                            type="email" 
                                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} 
                                        />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Password</FormLabel>
                                        <Input 
                                            placeholder="Password" 
                                            type="password" 
                                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} 
                                        />
                                    </FormControl>
                                    <Button 
                                        onClick={handleRegisterSubmit} 
                                        mt={4} 
                                        bg="black" 
                                        color="white" 
                                        width="full"
                                    >
                                        Join
                                    </Button>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Signin;
