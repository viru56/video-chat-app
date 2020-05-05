import * as crypto from "crypto";
import { config } from "../config";
export const hashPassword = (password: string) => {
  return crypto
    .createHmac("sha256", config.secret)
    .update(password)
    .digest("hex");
};

export const parseUser = (user: any) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };
};
