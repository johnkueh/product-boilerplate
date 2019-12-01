import { Box, Spinner } from "@chakra-ui/core";
import React from "react";

const LoadingSpinner: React.FC = () => (
  <Box>
    <Spinner
      thickness="2px"
      speed="1.3s"
      emptyColor="gray.200"
      color="blue.500"
      size="md"
    />
  </Box>
);

export default LoadingSpinner;
