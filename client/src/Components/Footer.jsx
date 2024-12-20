import { Box, Text, Link, Icon } from "@chakra-ui/react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const bgColor = "#E4EBE9";
  const textColor = "#000000";
  const iconColor = "#000000";

  return (
    <Box textAlign="center" bg={bgColor} p="30px 0px">
      <Box w="85%" m="auto">
        <Text fontSize="md" mb="10px" color={textColor}>
          Connect with us!
        </Text>
        <Box display="flex" justifyContent="center" gap="20px">
          <Link href="https://instagram.com" isExternal>
            <Icon as={FaInstagram} boxSize={6} color={iconColor} />
          </Link>
          <Link href="https://facebook.com" isExternal>
            <Icon as={FaFacebook} boxSize={6} color={iconColor} />
          </Link>
          <Link href="https://twitter.com" isExternal>
            <Icon as={FaTwitter} boxSize={6} color={iconColor} />
          </Link>
        </Box>
        <Box mt="20px">
          <Link href="/contactUs" fontSize="lg" color={textColor}>
            Contact Us
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
