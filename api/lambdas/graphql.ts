import { ApolloServer } from "apollo-server-lambda";
import { APIGatewayProxyEvent } from "aws-lambda";
import jsonwebtoken from "jsonwebtoken";
import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { Database } from "../lib/db-connection";
import { formatError } from "../lib/format-validation-error";
import { entities } from "../schema/entities";
import { authChecker } from "../schema/policies/AuthPolicy";
import { resolvers } from "../schema/resolvers";
import { Context, VerifiedToken } from "../types";

interface ServerContext {
  event: APIGatewayProxyEvent;
}

type ServerContextFn = (serverContext: ServerContext) => Promise<Context>;

const context: ServerContextFn = async ({
  event
}: ServerContext): Promise<Context> => {
  const database = new Database();
  const connection = await database.getConnection({
    type: "postgres",
    port: 5432,
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    logging: false,
    logger: "advanced-console",
    entities
  });
  await connection.runMigrations();

  let user = null;
  const { Authorization } = event.headers;

  if (Authorization) {
    const jwt = Authorization.replace("Bearer ", "");
    try {
      user = jsonwebtoken.verify(jwt, "JWTSECRET") as VerifiedToken;
    } catch {
      user = null;
    }
  }

  return {
    user
  };
};

export const serverWithContext = (
  serverContext: ServerContextFn | Context
): ApolloServer => {
  return new ApolloServer({
    introspection: true,
    playground: true,
    context: serverContext,
    schema: buildSchemaSync({
      authChecker,
      resolvers
    }),
    formatError
  });
};

export const handler = serverWithContext(context).createHandler({
  cors: { origin: "*" }
});
