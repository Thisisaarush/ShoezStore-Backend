export interface TApolloServer {
  req: Express.Request;
  res: Express.Response;
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
