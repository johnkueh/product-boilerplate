import { BreadcrumbLink as ChakraLink } from "@chakra-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
  to?: string;
  isCurrentPage?: boolean;
}

const BreadcrumbLink: React.FC<Props> = ({ to, isCurrentPage, children }) =>
  isCurrentPage ? (
    <span aria-current="page">{children}</span>
  ) : (
    <>
      {/* 
    // @ts-ignore */}
      <ChakraLink color="blue.500" as={RouterLink} href={to} to={to}>
        {children}
      </ChakraLink>
    </>
  );

export default BreadcrumbLink;
