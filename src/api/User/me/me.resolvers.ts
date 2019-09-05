import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    me: async (_, args, { request, isAuthenticated }) => {
      try {
        isAuthenticated(request);
        const { user } = request;
        return user;
      } catch (error) {
        console.log("me", error);
        throw Error(error);
      }
    }
  }
};

export default resolvers;
