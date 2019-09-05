import Post from "../../entities/Post";

export default {
  Post: {
    author: async ({ id }) => {
      const post = await Post.findOne(id, { relations: ["author"] });
      if (post && post.author) {
        return post.author;
      } else {
        return null;
      }
    }
  }
};
