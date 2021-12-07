import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { MessageType } from '../TypeDefs/Messages.js';
import User from "../../Models/user.js"
import SpecialTest from "../../Models/user.js"
import { SpecialTestType } from '../TypeDefs/SpecialTest.js';

export const UPDATE_SPECIAL_TEST = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    test_name: { type: GraphQLString },
    test_score: { type: GraphQLInt },
  },
  async resolve(parent, args) {
    const id = args.id;
    const test_score = args.test_score;
    const test_name = args.test_name;
    const user = await User.findOne({ id });

    if (user) {
      await SpecialTest.insert({
        test_name,
        creator: user.id,
        createdAt: new Date(),
        score: test_score,
      });
      await User.updateOne(
        { id },
        { special_test_count: user.special_test_count + 1 }
      );
      return { successful: true, message: 'Special test added' };
    }

    return { successful: false, message: 'Special test add failed' };
  },
};

export const GET_SPECIAL_TESTS = {
  type: new GraphQLList(SpecialTestType),
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    const id = args.id;
    const specialTests = await SpecialTest.find({ creator: id });
    return specialTests;
  },
};
