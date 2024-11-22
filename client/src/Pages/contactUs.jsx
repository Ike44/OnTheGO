import { Box, Button, Input, Textarea, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import ChatBot from '../ChatBot/ChatBot'

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => { e.preventDefault(); setName(""); setEmail(""); setMessage("");

    toast({
      title: "Message Sent", description: "We've received your message, and you'll hear back from us shortly!", 
      status: "success", duration: 3500, isClosable: true,});
  };

  return (
    <Box w="50%" m="auto" p="200px">
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
