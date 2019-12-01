import { FormControl, FormLabel, Input } from "@chakra-ui/core";
import React from "react";

interface InputProps {
  inputProps?: any;
  label: string;
}

const InputGroup: React.FC<InputProps> = ({ label, inputProps }) => (
  <>
    <FormControl>
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <Input id={label} focusBorderColor="blue.200" {...inputProps} />
    </FormControl>
  </>
);

export default InputGroup;
