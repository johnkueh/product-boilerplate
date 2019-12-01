import { capitalize, values } from "lodash";
import { GraphQLError, GraphQLFormattedError } from "graphql";

interface ArgumentValidationError {
  property: string;
  constraints: {
    [key: string]: string;
  };
}

type ValidationErrors = Record<string, string>;

export const formatArgumentValidationError = (
  validationErrors: ArgumentValidationError[]
): ValidationErrors => {
  const errors: ValidationErrors = {};
  validationErrors.forEach(
    ({ property, constraints }: ArgumentValidationError) => {
      const [message] = values(constraints);
      errors[property] = capitalize(message);
    }
  );
  return errors;
};

export const formatError = (error: GraphQLError): GraphQLFormattedError => {
  if (error.message.startsWith("Argument Validation Error")) {
    const formattedError = error;
    if (formattedError.extensions) {
      if (formattedError.extensions.exception) {
        const argumentValidationErrors =
          formattedError.extensions.exception.validationErrors;
        const errors = formatArgumentValidationError(argumentValidationErrors);
        formattedError.message = "ValidationError";
        formattedError.extensions.code = "BAD_USER_INPUT";
        formattedError.extensions.exception = { errors };
      }
    }

    return formattedError;
  }
  return error;
};
