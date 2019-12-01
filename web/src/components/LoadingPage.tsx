import { Flex } from "@chakra-ui/core";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoadingPage: React.FC = () => (
  <Flex bg="gray.100">
    <LoadingSpinner />
  </Flex>
);

export default LoadingPage;
