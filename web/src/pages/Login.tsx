import { Box, Button, Flex, Stack, Text } from "@chakra-ui/core";
import React from "react";
import GraphQLError from "../components/GraphQLError";
import Head from "../components/Head";
import InputGroup from "../components/InputGroup";
import Link from "../components/Link";
import { useLoginMutation } from "../generated/Apollo";
import { useAuthed } from "../hooks/useAuthed";
import { useForm } from "../hooks/useForm";

const Login = () => {
  const [onAuthed] = useAuthed();
  const [login, { loading, error }] = useLoginMutation({
    onCompleted: data => {
      onAuthed(data.login);
    }
  });
  const { fieldProps, currentValues } = useForm({
    initialValues: {
      email: "",
      password: ""
    }
  });

  return (
    <>
      <Head title="Login" />
      <Text color="gray.600" mt="2" mb="5">
        Welcome back. Please login with your account.
      </Text>
      <Box
        as="form"
        onSubmit={e => {
          e.preventDefault();
          login({
            variables: {
              input: currentValues
            }
          });
        }}
      >
        <GraphQLError error={error} />
        <Stack shouldWrapChildren spacing={5}>
          <InputGroup
            label="Email"
            inputProps={{
              placeholder: "john@doe.com",
              type: "email",
              ...fieldProps("email")
            }}
          />
          <InputGroup
            label="Password"
            inputProps={{
              placeholder: "Password",
              type: "password",
              ...fieldProps("password")
            }}
          />
          <Flex mt={3} justifyContent="space-between" alignItems="center">
            <Button type="submit" variantColor="blue" isLoading={loading}>
              Log in
            </Button>
            <Link to="/signup">Need an account?</Link>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
