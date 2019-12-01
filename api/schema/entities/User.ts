import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  @Field()
  name: string;

  @Column()
  password: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;

  jwt(): string {
    return jsonwebtoken.sign({ id: this.id, email: this.email }, "JWTSECRET");
  }

  jwtWithOptions(options: Record<string, string>): string {
    return jsonwebtoken.sign(
      { id: this.id, email: this.email, options },
      "JWTSECRET"
    );
  }

  validPassword(password: string): boolean {
    if (this.password == null) return false;
    return bcrypt.compareSync(password, this.password);
  }
}
