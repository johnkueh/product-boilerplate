import { Box } from "@chakra-ui/core";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import TopNav from "../components/TopNav";
import UserContext from "../contexts/UserContext";
import { useMeQuery } from "../generated/Apollo";

const LoggedIn: React.FC = ({ children }) => {
  useMeQuery();
  const userContext = useContext(UserContext);
  const { user } = userContext;

  if (!user) return <Redirect to="/login" />;
  return (
    <Box bg="gray.100" minHeight="100vh" pb={16}>
      <Box width="80%" mx="auto">
        <TopNav />
        {children}
      </Box>
    </Box>
  );
};

export default LoggedIn;
