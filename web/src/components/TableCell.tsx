import { Box } from "@chakra-ui/core";
import { BoxProps } from "@chakra-ui/core/dist/Box";
import React from "react";

interface Props {
  colSpan?: number;
}

const TableCell: React.FC<Props & BoxProps> = props => (
  <Box as="td" pt={1} px={3} {...props}>
    {props.children}
  </Box>
);

export default TableCell;
