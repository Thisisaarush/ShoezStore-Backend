export type UserCartItem = {
  itemId: string;
  itemSize: number;
  numberOfItems: number;
};
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

export type TForgotPassword = {
  user: {
    email: string;
  };
};

export type TResetPassword = {
  user: {
    newPassword: string;
    confirmPassword: string;
  };
};

export type TUpdateCartItems = {
  user: {
    email: string;
    cartItems: UserCartItem[];
  };
};
