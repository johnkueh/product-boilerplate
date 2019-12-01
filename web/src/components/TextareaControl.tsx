import { FormControl, FormLabel, Textarea } from "@chakra-ui/core";
import React from "react";

interface InputProps {
  inputProps?: any;
  label: string;
}

const TextareaControl: React.FC<InputProps> = ({ label, inputProps }) => (
  <>
    <FormControl>
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <Textarea id={label} focusBorderColor="blue.200" {...inputProps} />
    </FormControl>
  </>
);

export default TextareaControl;
