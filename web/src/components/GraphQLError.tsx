import { Box, Text } from "@chakra-ui/core";
import { ApolloError } from "apollo-client";
import React from "react";

interface props {
  error?: ApolloError;
}

const GraphQLError: React.FC<props> = ({ error }) => {
  if (error == null) return null;

  const errors = error.graphQLErrors[0].extensions!.exception.errors;
  const errorKeys = Object.keys(errors);

  return (
    <Box
      mb="5"
      color="yellow.600"
      bg="yellow.100"
      border="1px"
      borderColor="yellow.300"
      rounded="sm"
      p={3}
    >
      {errorKeys.map((key, idx) => (
        <Text as="p" mb={idx + 1 < errorKeys.length ? "2" : "0"}>
          {errors[key]}
        </Text>
      ))}
    </Box>
  );
};

export default GraphQLError;
