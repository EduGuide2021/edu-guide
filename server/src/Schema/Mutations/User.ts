import { GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLScalarType, GraphQLSchema, GraphQLString } from "graphql";
import { UserInfoType, UserType } from "../TypeDefs/User";
import { MessageType } from "../TypeDefs/Messages";
import { Users } from "../../Entities/Users";
import bcrypt from 'bcrypt'
import { Any } from "typeorm";

export const CREATE_USER = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    levelStrand: { type: GraphQLString },
    school: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { email, name, username, levelStrand, school, password } = args;
    let user = await Users.findOne({ email: email })
    if (user) {
      throw new Error("Email already exist");
    }
    let is_admin = false;
    if (username === 'admin') {
      is_admin = true
    }

    bcrypt.hash(password, 10).then(async (hash: string) => {
      await Users.insert({
        email,
        name,
        username,
        levelStrand,
        school,
        password: hash,
        is_admin
      });
      return { ...args, general_test_score: 0, general_test_count: 0, special_test_count: 0 };
    })

  },
};

export const USER_LOGIN = {
  type: UserInfoType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, password } = args;
    const user = await Users.findOne({ username: username });

    if (!user) {
      throw new Error("USERNAME DOESNT EXIST");
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      return { successful: true, message: "LOGIN SUCCESS!", user: user };
    } else {
      throw new Error("WRONG PASSWORD!");
    }
  },
};

export const UPDATE_PASSWORD = {
  type: MessageType,
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, oldPassword, newPassword } = args;
    const user = await Users.findOne({ username: username });

    if (!user) {
      throw new Error("USERNAME DOESNT EXIST");
    }
    const userPassword = user?.password;

    if (oldPassword === userPassword) {
      await Users.update({ username: username }, { password: newPassword });

      return { successful: true, message: "PASSWORD UPDATED" };
    } else {
      throw new Error("PASSWORDS DO NOT MATCH!");
    }
  },
};

export const EDIT_PROFILE = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    newUsername: { type: GraphQLString },
    newLevelStrand: { type: GraphQLString },
    newSchool: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { id, newUsername, newLevelStrand, newSchool } = args;
    const user = await Users.findOne({ id: id });

    if (user) {
      await Users.update(
        { id: id },
        {
          username: newUsername,
          levelStrand: newLevelStrand,
          school: newSchool,
        }
      );

      return { successful: true, message: "PROFILE UPDATED" };
    }
  },
};

export const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    await Users.delete(id);

    return { successful: true, message: "DELETE WORKED" };
  },
};

export const UPDATE_GENERAL_SCORE = {
  type: MessageType,
  args: { id: { type: GraphQLID }, score: { type: GraphQLString } },
  async resolve(parent: any, args: any) {
    const id = args.id;
    const score = args.score
    const user = await Users.findOne({ id: id });
    if (user) {
      await Users.update(
        { id: id },
        {
          general_test_score: score,
          general_test_count: user.general_test_count + 1
        }
      );

      return { successful: true, message: "SCORE UPDATED" };
    }

    return { successful: false, message: "SCORE UPDATE FAILED" };
  },
}


export const GET_CURRENT_USER = {
  type: UserInfoType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    const user = await Users.findOne({ id: id });
    if (user) {
      return { successful: true, message: "GET USER SUCCESS", user: user };
    }

    return { successful: false, message: "GET USER FAILED" };
  },
}