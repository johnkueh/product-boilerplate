import { Box, Button, Flex, Link, Stack, Text } from "@chakra-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import GraphQLError from "../components/GraphQLError";
import Head from "../components/Head";
import InputGroup from "../components/InputGroup";
import { useSignupMutation } from "../generated/Apollo";
import { useAuthed } from "../hooks/useAuthed";
import { useForm } from "../hooks/useForm";

const Signup = () => {
  const [onAuthed] = useAuthed();
  const [signup, { loading, error }] = useSignupMutation({
    onCompleted: data => {
      onAuthed(data.signup);
    }
  });
  const { fieldProps, currentValues } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  return (
    <>
      <Head title="Sign up" />
      <Text color="gray.600" mt="2" mb="5">
        Give us a try. Sign up for an account
      </Text>
      <Box
        as="form"
        onSubmit={e => {
          e.preventDefault();
          signup({
            variables: {
              input: currentValues
            }
          });
        }}
      >
        <GraphQLError error={error} />
        <Stack shouldWrapChildren spacing={5}>
          <InputGroup
            label="Full name"
            inputProps={{
              placeholder: "John Doe",
              type: "text",
              ...fieldProps("name")
            }}
          />
          <InputGroup
            label="Email address"
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
              Sign up
            </Button>
            <NavLink to="/login">
              <Link href="/login">Have an account?</Link>
            </NavLink>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export default Signup;
