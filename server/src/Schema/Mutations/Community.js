import { GraphQLID, GraphQLString } from "graphql";
import Community from "../../Models/community.js";
import { CommunityType } from "../TypeDefs/Community.js";
import { MessageType } from "../TypeDefs/Messages.js";

export const CREATE_COMMUNITY = {
    type: CommunityType,
    args: {
      id: { type: GraphQLID },
      comment: { type: GraphQLString },
      
    },
    async resolve(parent, args) {
      const { comment } = args;
      await Community.updateOne({
        comment
      });
      return args;
    },
  };


  export const DELETE_COMMUNITY = {
    type: MessageType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent, args) {
      const id = args.id;
      await Community.deleteOne(id);
  
      return { successful: true, message: "DELETE WORKED" };
    },
  };