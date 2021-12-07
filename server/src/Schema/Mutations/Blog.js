import { GraphQLID, GraphQLString } from "graphql";
import Blog from "../../Models/blog.js";
import { BlogType } from "../TypeDefs/Blog.js";
import { MessageType } from "../TypeDefs/Messages.js";

export const CREATE_BLOG = {
    type: BlogType,
    args: {
      id: { type: GraphQLID },
      content: { type: GraphQLString },
      creator: {type:GraphQLID},
    },
    async resolve(parent, args) {
      const { content,creator } = args;
      await Blog.updateOne({
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
    async resolve(parent, args) {
      const id = args.id;
      await Blog.deleteOne(id);
  
      return { successful: true, message: "DELETE WORKED" };
    },
  };