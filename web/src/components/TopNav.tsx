import { useApolloClient } from "@apollo/react-hooks";
import { Button, Flex, Image } from "@chakra-ui/core";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

const TopNav: React.FC = () => {
  const userContext = useContext(UserContext);
  const client = useApolloClient();
  const logout = async () => {
    Cookies.remove("jwt");
    userContext.setUser!(null);
    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    await client.cache.reset();
  };

  return (
    <Flex py="8" justifyContent="space-between" alignItems="center">
      <Image alt="MetricsJar" w="150px" src="/LogoText.svg" />
      <Button
        color="gray.500"
        size="sm"
        onClick={async e => {
          e.preventDefault();
          await logout();
        }}
      >
        Logout
      </Button>
    </Flex>
  );
};

export default TopNav;
