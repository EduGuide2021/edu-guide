import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from "graphql";

export const BlogType = new GraphQLObjectType({
  name: "Blog",
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    creator: {type: GraphQLID},
    createdAt: {type:GraphQLString},
    is_approved: {type:GraphQLBoolean}
  }),
});
