import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation createUser(
    $email: String!
    $name: String!
    $username: String!
    $levelStrand: String!
    $school: String!
    $password: String!
  ) {
    createUser(
      email: $email
      name: $name
      username: $username
      levelStrand: $levelStrand
      school: $school
      password: $password
    ) {
      id
      email
      name
      username
      levelStrand
      school
    }
  }
`;

export const USER_LOGIN = gql`
  mutation userLogin($username: String!, $password: String!) {
    userLogin(
      username: $username
      password: $password
    ){
      successful
      message
      user {
        id
        email
        name
        username
        levelStrand
        school
        is_admin
        general_test_score
        general_test_count
        special_test_count
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $username: String!
    $oldPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      username: $username
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      message
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation editProfile(
    $id: ID!
    $username: String!
    $levelStrand: String!
    $school: String!
  ) {
    editProfile(
      id: $id
      newUsername: $username
      newLevelStrand: $levelStrand
      newSchool: $school
    ) {
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      message
    }
  }
`;

export const CREATE_COMMUNITY = gql`
  mutation createCommunity($comment: String!) {
    createCommunity(comment: $comment) {
      comment
    }
  }
`;

export const DELETE_COMMUNITY = gql`
  mutation deleteCommunity($id: ID!) {
    deleteCommunity(id: $id) {
      message
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation createBlog($content: String! $creator: ID!) {
    createBlog(content: $content creator: $creator) {
      content
      creator
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation deleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      message
    }
  }
`;

export const UPDATE_GENERAL_SCORE = gql`
  mutation updateGeneralScore(
    $id: ID!
    $score: String!
  ) {
    updateGeneralScore(
      id: $id
      score: $score
    ) {
      message
    }
  }
`;

export const UPDATE_SPECIAL_TEST = gql`
  mutation updateSpecialTest(
    $id: ID!
    $test_name: String!
    $test_score: Int!
  ) {
    updateSpecialTest(
      id: $id
      test_name: $test_name
      test_score: $test_score
    ) {
      message
    }
  }
`;

export const GET_CURRENT_USER = gql`
  mutation getCurrentUser(
    $id: ID!
  ) {
    getCurrentUser(
      id: $id
    ) {
      successful
      message
      user {
        id
        email
        name
        username
        levelStrand
        school
        is_admin
        general_test_score
        general_test_count
        special_test_count
      }
    }
  }
`;

export const GET_SPECIAL_TESTS = gql`
  mutation getSpecialTests(
    $id: ID!
  ) {
    getSpecialTests(
      id: $id
    ) {
      id
      test_name
      score
    }
  }
`;