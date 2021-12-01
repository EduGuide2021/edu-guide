import { GraphQLID, GraphQLString } from "graphql";
import { Blog } from "../../Entities/Blog";
import { BlogType } from "../TypeDefs/Blog";
import { MessageType } from "../TypeDefs/Messages";

export const CREATE_BLOG = {
    type: BlogType,
    args: {
      id: { type: GraphQLID },
      content: { type: GraphQLString },
      creator: {type:GraphQLID},
    },
    async resolve(parent: any, args: any) {
      const { content,creator } = args;
      await Blog.insert({
        content,
        creator,
        createdAt: new Date(),
        is_approved: false
      });
      return args;
    },
  };


  export const DELETE_BLOG = {
    type: MessageType,
    args: {
      id: { type: GraphQLID },
    },
    async resolve(parent: any, args: any) {
      const id = args.id;
      await Blog.delete(id);
  
      return { successful: true, message: "DELETE WORKED" };
    },
  };