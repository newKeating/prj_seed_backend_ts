import { Resolvers } from "../../../types/resolvers";
import Post from "../../../entities/Post";
const resolvers: Resolvers = {
  Query: {
    fetchPosts: async (_, __, context) => {
      try {
        // const user = await User.findOne(args.id, { relations: ["interests"] });
        const posts = await Post.find();

        return posts;
      } catch (error) {
        console.log("fetchPosts", error);
        throw Error(error);
      }
    }
  }
};

export default resolvers;
