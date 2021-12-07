import { GraphQLList } from "graphql";
import User from '../../Models/user.js'
import { UserType } from "../TypeDefs/User.js";

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  async esolve() {
    const user = await User.find();
    let userDetail = user?.map(async (element) => {
      let user = await User.findOne({ id: element?.creator });
      if (user) {
        return { ...user, creator: user.name };
      }
      return { ...user };
    });
    console.log(userDetail);
    return userDetail;
  },
};
