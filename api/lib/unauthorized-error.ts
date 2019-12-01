import ValidationErrors from "./validation-errors";

export const UnauthorizedError = ValidationErrors({
  auth: "You are not authorized to perform this action"
});
