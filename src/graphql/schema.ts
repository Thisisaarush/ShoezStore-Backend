export const typeDefs = `#graphql
  type HeroSlider {
    name: String
    uri: String
    price: Int
    sizes: [Int]
  }
  type Recommended {
    name: String
    uri: String
    price: Int
    sizes: [Int]
  }
  type Trending {
    name: String
    uri: String
    price: Int
    sizes: [Int]
  }
  type Category {
    name: String
    uri: String
    price: Int
    sizes: [Int]
    category: String
    color: String
    tag: String
    brand: String
  }
  type User {
    name: String    
    email: String
    token: String    
    success: Boolean
    message: String
  }

  input IUser {
  name: String!
  email: String!
  password: String!
  }
  input IUserLogin {
  email: String!
  password: String!
  }
  input IForgotPassword {
    email: String!
  }
  input IResetPassword {
    newPassword: String!
    confirmPassword: String!
  }

  type Query {
    heroSlider: [HeroSlider]
    recommended: [Recommended]
    trending: [Trending]
    category: [Category]
  }

  type Mutation {
    registerUser(user: IUser!): User!
    loginUser(user: IUserLogin!): User!
    logoutUser: User!
    forgotPassword(user: IForgotPassword!): User!
    resetPassword(user: IResetPassword!): User!
  }
`;
