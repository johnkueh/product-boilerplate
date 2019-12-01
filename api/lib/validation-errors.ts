import { UserInputError } from "apollo-server-lambda";

const ValidationErrors = (errors: Record<string, string>): UserInputError =>
  new UserInputError("ValidationError", { errors });

export default ValidationErrors;
