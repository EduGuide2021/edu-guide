import { GraphQLList } from "graphql";
import Community from "../../Models/community.js";
import { CommunityType } from "../TypeDefs/Community.js";
import User from "../../Models/user.js"

export const GET_ALL_POSTS = {
  type: new GraphQLList(CommunityType),
  async resolve() {
    const community = await Community.find();
    let communityDetail = community?.map(async (community) => {
      let user = await User.findOne({ id: community?.creator});
      if (user){
        return { ...community,creator: user.name };
      }
      return { ...community };
    });

    console.log(communityDetail);
    return communityDetail;

  },
};
