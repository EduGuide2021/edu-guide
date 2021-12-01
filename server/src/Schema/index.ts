import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "./Queries/User";
import {
  CREATE_USER,
  DELETE_USER,
  EDIT_PROFILE,
  UPDATE_GENERAL_SCORE,
  UPDATE_PASSWORD,
  USER_LOGIN,
} from "./Mutations/User";
import { CREATE_COMMUNITY, DELETE_COMMUNITY } from "./Mutations/Community";
import { GET_ALL_POSTS } from "./Queries/Community";
import { GET_ALL_BLOGS } from "./Queries/Blog";
import { CREATE_BLOG, DELETE_BLOG } from "./Mutations/Blog";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_USERS,
    getAllPost: GET_ALL_POSTS,
    getAllBlog: GET_ALL_BLOGS
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    userLogin: USER_LOGIN,
    editProfile: EDIT_PROFILE,
    deleteUser: DELETE_USER,
    updatePassword: UPDATE_PASSWORD,
    updateGeneralScore: UPDATE_GENERAL_SCORE,
    
    
    createCommunity: CREATE_COMMUNITY,
    deleteCommunity: DELETE_COMMUNITY,

    createBlog: CREATE_BLOG,
    deleteBlog: DELETE_BLOG,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
