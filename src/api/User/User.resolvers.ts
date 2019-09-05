// import Post from "../../entities/Post";
import User from "../../entities/User";

export default {
  User: {
    createdPosts: async ({ id }) => {
      const user = await User.findOne(id, { relations: ["createdPosts"] });
      let posts;
      if (user && user.createdPosts.length > 0) {
        posts = user.createdPosts;
      }
      return posts;
    }
  }
};
