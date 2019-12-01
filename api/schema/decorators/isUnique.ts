import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

@ValidatorConstraint({ async: true })
export class IsFieldAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const { constraints, property } = args;
    const [{ entity: Model }] = constraints;
    const result = await Model.findOne({ where: { [property]: value } });
    if (result) {
      // @ts-ignore
      // eslint-disable-next-line
      const object: Record<string, any> = args.object;
      // Dont validate if its the same entry
      if (String(object.id) !== String(result.id)) {
        return false;
      }
    }

    return true;
  }
}

interface Constraint {
  // @ts-ignore
  // eslint-disable-next-line
  entity: any;
}

// eslint-disable-next-line
export function IsUnique(
  constraint: Constraint,
  validationOptions?: ValidationOptions
) {
  // @ts-ignore
  // eslint-disable-next-line
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      target: object.constructor,
      options: validationOptions,
      constraints: [constraint],
      validator: IsFieldAlreadyExistConstraint
    });
  };
}
