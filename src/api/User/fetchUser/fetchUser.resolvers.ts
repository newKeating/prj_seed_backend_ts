import { Resolvers } from "../../../types/resolvers";
import { FetchUserQueryArgs } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    fetchUser: async (_, args: FetchUserQueryArgs, context) => {
      try {
        // const user = await User.findOne(args.id, { relations: ["interests"] });
        const user = await User.findOne({ where: { id: args.id } });
        console.log("user", user);

        return user;
      } catch (error) {
        console.log("fetchUser", error);
        throw Error(error);
      }
    }
  }
};

export default resolvers;
