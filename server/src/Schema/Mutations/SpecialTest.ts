import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { UserInfoType, UserType } from "../TypeDefs/User";
import { MessageType } from "../TypeDefs/Messages";
import { Users } from "../../Entities/Users";
import { SpecialTest } from "../../Entities/SpecialTest";
import { SpecialTestType } from "../TypeDefs/SpecialTest";



export const UPDATE_SPECIAL_TEST = {
    type: MessageType,
    args: {
      id: { type: GraphQLID },
      test_name: { type: GraphQLString },
      test_score: {type: GraphQLInt}
    },
    async resolve(parent: any, args: any) {
      const id = args.id;
      const test_score = args.test_score
      const test_name = args.test_name
      const user = await Users.findOne({ id: id });
      
      if (user) {
        await SpecialTest.insert(
          {
            test_name,
            creator:user.id,
            createdAt: new Date(),
            score: test_score
          }
        );
        await Users.update({id:id},{special_test_count:user.special_test_count+1})
        return { successful: true, message: "Special test added" };
      }
  
      return { successful: false, message: "Special test add failed" };
    },
}

export const GET_SPECIAL_TESTS = {
  type: new GraphQLList(SpecialTestType),
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    const specialTests = await SpecialTest.find({ creator: id });
    return specialTests
  },
}


