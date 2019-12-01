import { Link as ChakraLink } from "@chakra-ui/core";
import { LinkProps } from "@chakra-ui/core/dist/Link";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  to: string;
}

const Link: React.FC<Props & LinkProps> = ({ to, children }) => (
  <>
    {/* 
    // @ts-ignore */}
    <ChakraLink as={RouterLink} href={to} to={to}>
      {children}
    </ChakraLink>
  </>
);

export default Link;
