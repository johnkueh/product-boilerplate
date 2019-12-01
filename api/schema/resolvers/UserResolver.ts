import bcrypt from "bcryptjs";
import { IsEmail, Length } from "class-validator";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from "type-graphql";
import ValidationErrors from "../../lib/validation-errors";
import { Context } from "../../types";
import { IsUnique } from "../decorators/isUnique";
import { User } from "../entities/User";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(6, 255)
  password: string;
}

@InputType()
export class SignupInput {
  @Field()
  @IsEmail()
  @IsUnique(
    {
      entity: User
    },
    { message: "Email is taken" }
  )
  email: string;

  @Field()
  @Length(6, 255)
  password: string;

  @Field()
  @Length(1, 255)
  name: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsUnique(
    {
      entity: User
    },
    { message: "Email is taken" }
  )
  email?: string;

  @Field({ nullable: true })
  @Length(1, 255)
  name?: string;

  @Field({ nullable: true })
  @Length(6, 255)
  password?: string;
}

@ObjectType()
export class AuthPayload {
  @Field()
  jwt: string;

  @Field()
  user: User;
}

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  @Authorized()
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    return User.findOne(ctx.user!.id);
  }

  @Mutation(() => AuthPayload)
  async signup(@Arg("input") input: SignupInput): Promise<AuthPayload> {
    const user = User.create({
      ...input,
      password: bcrypt.hashSync(input.password.toString(), 10)
    });

    await user.save();

    return {
      jwt: user.jwt(),
      user
    };
  }

  @Mutation(() => AuthPayload)
  async login(@Arg("input") input: LoginInput): Promise<AuthPayload> {
    const { email, password } = input;
    const user = await User.findOne({
      email
    });
    if (user && user.validPassword(password)) {
      return {
        jwt: user!.jwt(),
        user: user!
      };
    }

    throw ValidationErrors({
      auth: "Please check your credentials and try again."
    });
  }

  @Mutation(() => User)
  @Authorized()
  async updateUser(
    @Arg("input") input: UpdateUserInput,
    @Ctx() ctx: Context
  ): Promise<User | undefined> {
    const userId = ctx.user!.id;
    const { ...userInput } = input;

    if (userInput.password) {
      userInput.password = bcrypt.hashSync(userInput.password.toString(), 10);
    }

    await User.update({ id: userId }, userInput);
    return User.findOne(userId);
  }
}
