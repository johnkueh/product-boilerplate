import { APIGatewayProxyEvent } from "aws-lambda";
import { GraphQLSchema } from "graphql";
import { Connection } from "typeorm";
import { User } from "./schema/entities/User";

export interface VerifiedToken {
  id: string;
  email: string;
}

// Apollo server
export interface LambdaArguments {
  event: APIGatewayProxyEvent;
}
export interface Context {
  user: User | VerifiedToken | null;
  connection?: Connection;
}
export interface MakeServer {
  context: object;
  schema?: GraphQLSchema;
}
