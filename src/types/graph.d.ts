export const typeDefs = ["type Query {\n  fetchPosts: [Post!]!\n  fetchUser(id: String!): User!\n  me: User!\n}\n\ntype Post {\n  id: ID!\n  title: String!\n  content: String!\n  author: User!\n  createdAt: String!\n  updatedAt: String!\n}\n\ntype Mutation {\n  createRegularUser(email: String!, password: String!, name: String!): CreateRegularUserResponse!\n}\n\ntype CreateRegularUserResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  id: ID!\n  facebookId: String\n  role: Role!\n  email: String!\n  name: String!\n  password: String\n  deleted: Boolean!\n  createdPosts: [Post!]\n  createdAt: String!\n  updatedAt: String!\n}\n\nenum Role {\n  REGULAR\n  ADMIN\n}\n"];
/* tslint:disable */

export interface Query {
  fetchPosts: Array<Post>;
  fetchUser: User;
  me: User;
}

export interface FetchUserQueryArgs {
  id: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  facebookId: string | null;
  role: Role;
  email: string;
  name: string;
  password: string | null;
  deleted: boolean;
  createdPosts: Array<Post>;
  createdAt: string;
  updatedAt: string;
}

export type Role = "REGULAR" | "ADMIN";

export interface Mutation {
  createRegularUser: CreateRegularUserResponse;
}

export interface CreateRegularUserMutationArgs {
  email: string;
  password: string;
  name: string;
}

export interface CreateRegularUserResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}
