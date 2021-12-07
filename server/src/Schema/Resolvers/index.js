import pkg from 'graphql-iso-date';
import userResolvers from './user.js';
import messageResolvers from './message.js';
const { GraphQLDateTime } = pkg;



const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
];
