import { Box, Flex, Image } from "@chakra-ui/core";
import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const Auth: React.FC = ({ children }) => {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  if (user) {
    return <Redirect to={`/dashboard`} />;
  }

  return (
    <Flex w="100%" minHeight="100vh" bg="gray.100" alignItems="center">
      <Box bg="white" p={8} w={["80%", "80%", "60%", "25%"]} mx="auto">
        <Box>
          <Link href="/" to="/">
            <Image alt="Logo" width="200px" src="/Logo.svg" />
          </Link>
        </Box>
        {children}
      </Box>
    </Flex>
  );
};

export default Auth;
