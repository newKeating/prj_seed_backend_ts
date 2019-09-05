import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  Unique
} from "typeorm";

import { Role } from "../types/graph";
import Post from "./Post";

const BCRYPT_ROUNDS = 10;

@Entity()
@Unique(["email", "facebookId"])
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ type: "text", nullable: true })
  facebookId: string;

  @Column({ type: "text" })
  role: Role;

  @Column({ type: "text" })
  @IsEmail()
  email: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({ type: "boolean", default: false })
  deleted: boolean;

  @OneToMany(type => Post, post => post.author)
  createdPosts: Post[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn() updatedAt: string;

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;
