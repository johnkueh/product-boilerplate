import { AuthChecker } from "type-graphql";
import { UnauthorizedError } from "../../lib/unauthorized-error";
import { Context } from "../../types";

export const authChecker: AuthChecker<Context> = ({ context }): boolean => {
  // console.log("authChecker", context);
  if (context.user == null) {
    throw UnauthorizedError;
  }

  // TODO: Can check for roles here in the future

  return true;
};
