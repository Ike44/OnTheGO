import { Box, Button, Input, Textarea, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import emailjs from 'emailjs-com'; 
import ChatBot from '../ChatBot/ChatBot';

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    emailjs
      .send(
        'service_hk5xa04',
        'template_zq6s7vg', 
        templateParams,
        '3BypnuEF-w9_OaAci' 
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        toast({
          title: "Message Sent",
          description: "We've sent a confirmation email to your address!",
          status: "success",
          duration: 3500,
          isClosable: true,
        });

        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error('FAILED...', error);
        toast({
          title: "Message Failed",
          description: "Something went wrong. Please try again later.",
          status: "error",
          duration: 3500,
          isClosable: true,
        });
      });
  };

  return (
    <Box w="85%" m="auto" p="200px">
      <Text fontSize="2xl" mb="10px">Contact Us</Text>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          mb="10px"
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="10px"
        />
        <Textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          mb="10px"
        />
        <Button type="submit" colorScheme="gray" width="100%">
          Submit
        </Button>
      </form>
      <ChatBot />
    </Box>
  );
}

export default ContactUs;
