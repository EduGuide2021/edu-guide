import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLList } from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    levelStrand: { type: GraphQLString },
    school: { type: GraphQLString },
    password: { type: GraphQLString },
    is_admin: { type:GraphQLBoolean },
    general_test_score: {type: GraphQLString},
    general_test_count: {type:GraphQLInt},
    special_test_count: {type :GraphQLInt}
  }),
});

export const UserInfoType = new GraphQLObjectType({
  name: "UserInfo",
  fields: () => ({
    user: {type:UserType},
    successful: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});