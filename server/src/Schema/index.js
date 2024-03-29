import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "./Queries/User.js";
import {
  CREATE_USER,
  DELETE_USER,
  EDIT_PROFILE,
  GET_CURRENT_USER,
  UPDATE_GENERAL_SCORE,
  UPDATE_PASSWORD,
  USER_LOGIN,
} from "./Mutations/User.js";
import { CREATE_COMMUNITY, DELETE_COMMUNITY } from "./Mutations/Community.js";
import { GET_ALL_POSTS } from "./Queries/Community.js";
import { GET_ALL_BLOGS } from "./Queries/Blog.js";
import { CREATE_BLOG, DELETE_BLOG } from "./Mutations/Blog.js";
import { GET_SPECIAL_TESTS, UPDATE_SPECIAL_TEST } from "./Mutations/SpecialTest.js";

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
    getCurrentUser: GET_CURRENT_USER,
    getSpecialTests: GET_SPECIAL_TESTS,
    
    
    createCommunity: CREATE_COMMUNITY,
    deleteCommunity: DELETE_COMMUNITY,

    createBlog: CREATE_BLOG,
    deleteBlog: DELETE_BLOG,

    updateSpecialTest: UPDATE_SPECIAL_TEST,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema