import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class DeleteInput {
  @Field()
  id: string;
}

@ObjectType()
export class DeletePayload {
  @Field()
  id: string;
}
