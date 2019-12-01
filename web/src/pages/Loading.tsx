import { Flex } from "@chakra-ui/core";
import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const LoadingPage = () => (
  <Flex
    bg="gray.100"
    justifyContent="center"
    mx="auto"
    py="12"
    minHeight="100vh"
  >
    <LoadingSpinner />
  </Flex>
);

export default LoadingPage;
