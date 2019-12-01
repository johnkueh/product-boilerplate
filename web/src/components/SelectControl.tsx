import { FormControl, FormLabel, Select } from "@chakra-ui/core";
import React from "react";

interface Option {
  label: string;
  value: string;
}

interface InputProps {
  inputProps?: any;
  label: string;
  options: Option[];
}

const InputGroup: React.FC<InputProps> = ({ label, options, inputProps }) => {
  const { value, ...selectProps } = inputProps;
  return (
    <>
      <FormControl>
        <FormLabel htmlFor={label}>{label}</FormLabel>
        <Select
          id={label}
          focusBorderColor="blue.200"
          defaultValue={value}
          {...selectProps}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default InputGroup;
