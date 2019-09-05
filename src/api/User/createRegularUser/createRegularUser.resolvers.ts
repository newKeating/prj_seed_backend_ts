import { Resolvers } from "../../../types/resolvers";
import {
  CreateRegularUserMutationArgs,
  CreateRegularUserResponse
} from "../../../types/graph";
import User from "../../../entities/User";
import Interest from "../../../entities/Interest";
import { generateToken } from "../../../utils";
const resolvers: Resolvers = {
  Mutation: {
    createRegularUser: async (
      _,
      args: CreateRegularUserMutationArgs
    ): Promise<CreateRegularUserResponse> => {
      const { email, password, name } = args;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            error: "이메일이 이미 존재합니다",
            token: null
          };
        }

        const newUser = await User.create({
          email,
          password,
          name
        }).save();
        console.log("newUser", newUser);

        const token = generateToken(newUser.id);
        return {
          ok: true,
          error: null,
          token
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
