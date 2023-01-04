export interface TApolloServer {
  token?: String;
}

export type TUserInput = {
  user: {
    name: string;
    email: string;
    password: string;
  };
};

export type TUserInputLogin = {
  user: {
    email: string;
    password: string;
  };
};
