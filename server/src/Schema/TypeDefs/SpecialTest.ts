import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLInt } from "graphql";

export const SpecialTestType = new GraphQLObjectType({
  name: "SpecialTest",
  fields: () => ({
    id: { type: GraphQLID },
    test_name: { type: GraphQLString },
    creator: {type: GraphQLID},
    createdAt: {type:GraphQLString},
    score: {type:GraphQLInt}
  }),
});
