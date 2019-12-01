import { Button } from "@chakra-ui/core";
import { ButtonProps } from "@chakra-ui/core/dist/Button";
import React from "react";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";

interface Props {
  to: string;
  activeVariantColor?: string;
}

const Link: React.FC<Props & ButtonProps> = ({
  children,
  activeVariantColor,
  ...props
}) => {
  const match = useRouteMatch(props.to);

  return (
    <>
      {/* 
      // @ts-ignore */}
      <Button
        variantColor={match ? activeVariantColor : undefined}
        as={RouterLink}
        {...props}
      >
        {children}
      </Button>
    </>
  );
};

export default Link;
