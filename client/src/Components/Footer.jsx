import { Box, Text, Link, Icon } from "@chakra-ui/react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <Box textAlign="center" bg="#FFFFFF" p="30px 0px">
      <Box w="85%" m="auto">
        <Text fontSize="md" mb="10px">
          Connect with us!
        </Text>
        <Box display="flex" justifyContent="center" gap="20px">
          <Link href="https://instagram.com" isExternal>
            <Icon as={FaInstagram} boxSize={6} />
          </Link>
          <Link href="https://facebook.com" isExternal>
            <Icon as={FaFacebook} boxSize={6} />
          </Link>
          <Link href="https://twitter.com" isExternal>
            <Icon as={FaTwitter} boxSize={6} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
