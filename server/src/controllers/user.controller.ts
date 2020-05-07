import { User } from "../models";
import { Request, Response } from "express";
import {
  hashPassword,
  jwtToken,
  mailService,
  logger,
  parseUser
} from "../services";
import { applicationData } from "../config";
export class UserController {
  public static async userRegister(req: Request, res: Response) {
    try {
      logger.info("/user/register", "post", "userRegister", req.body.email);
      logger.log("body", req.body);
      const newUser = new User(req.body);
      const user = await newUser.save();
      logger.log("new user added");
      const token = jwtToken({
        aud: user.id,
        type: "activation",
        email: user.email
      });
      const mailOptions = {
        userName: `${req.body.firstName} ${req.body.lastName}`,
        link: `${applicationData.accountActivation.link}${token}`,
        linkDescription: applicationData.accountActivation.linkDescription,
        to: user.email,
        subject: applicationData.accountActivation.subject,
        text1: applicationData.accountActivation.text1,
        text2: applicationData.accountActivation.text2,
        text3: applicationData.accountActivation.text3,
        template: applicationData.accountActivation.template,
        hostName: applicationData.accountActivation.hostName
      };
      mailService(mailOptions);
      return res.status(200).json({
        message: applicationData.responseMessages.accountActivation
      });
    } catch (error) {
      logger.error("falied to create new user, reason:- ", error);
      return res.status(400).json(error);
    }
  }

  public static async getUsers(req: Request, res: Response) {
    try {
      logger.info("/user/all", "get", "getUsers", req.params.userId);
      const users = await User.find(
        { isDeleted: false },
        { firstName: 1, lastName: 1, email: 1, status: 1 }
      );
      return res.status(200).json(users);
    } catch (error) {
      logger.error("falied to get all users, reason:- ", error);
      return res.status(400).json(error);
    }
  }
  public static async getUser(req: Request, res: Response) {
    try {
      logger.info("/user", "get", "getUser", req.params.userId);
      const user = await User.findOne(
        { _id: req.params.userId, isDeleted: false },
        { firstName: 1, lastName: 1, email: 1 }
      );

      return res.status(200).json(user);
    } catch (error) {
      logger.error("falied to get user details, reason:- ", error);
      return res.status(400).json(error);
    }
  }
  public static async updateUser(req: Request, res: Response) {
    try {
      logger.info("/user", "put", "updateUser", req.params.userId);
      logger.log("req.body", req.body);
      delete req.body.role;
      if (req.body.password) {
        req.body.password = hashPassword(req.body.password);
      }
      const result = await User.updateOne(
        { _id: req.body.id, isDeleted: false },
        req.body,
        {
          runValidators: true
        }
      );
      return res.status(200).json(result);
    } catch (error) {
      logger.error("falied to update user, reason:- ", error);
      return res.status(400).json(error);
    }
  }
  public static async userRoleUpdate(req: Request, res: Response) {
    try {
      logger.info("/user/role", "put", "userRoleUpdate", req.params.userId);
      const result = await User.updateOne(
        { _id: req.body.id, isDeleted: false },
        req.body,
        {
          runValidators: true
        }
      );
      return res.status(200).json(result);
    } catch (error) {
      logger.error("falied to update user role, reason:- ", error);
      return res.status(400).json(error);
    }
  }
  public static async deleteUser(req: Request, res: Response) {
    try {
      logger.info("/user", "delete", "deleteUser", req.params.userId);
      const result = await User.updateOne(
        { _id: req.params.userId },
        { isDeleted: true }
      );
      return res.status(200).json(result);
    } catch (error) {
      logger.error("falied to delete user, reason:- ", error);
      return res.status(400).json(error);
    }
  }
  public static async userLogin(req: Request, res: Response) {
    try {
      logger.info("/api/login", "post", "userLogin", req.body.email);
      const user = await User.findOne(
        { email: req.body.email, isDeleted: false },
        { firstName: 1, lastName: 1, email: 1, password: 1, status: 1 }
      );
      if (!user) {
        logger.error(
          "falied to user login, reason:- email does not esists ",
          req.body.email
        );
        return res.status(400).json({
          message:
            "The email address that you've entered doesn't match any account."
        });
      }
      if (user.status !== "active") {
        logger.error("user account inactive");
        return res.status(400).json({
          message:
            "your account is not active,please check your mail for account activation"
        });
      }
      if (hashPassword(req.body.password) !== user.password) {
        logger.error("password did not match");
        return res.status(400).json({
          message: "The password that you've entered is incorrect."
        });
      } else {
        const token = jwtToken({
          aud: user.id,
          type: "login",
          email: req.body.email,
          role: user.role
        });
        logger.log("token generated");
        res.status(200).json({ token, user: parseUser(user) });
        await User.updateOne(
          { _id: user.id },
          { lastLoggedIn: new Date(), isLoggedIn: true }
        );
      }
    } catch (error) {
      console.log(error);
      logger.error("falied to user login, reason:- ", error);
      return res.status(400).json({
        message:
          "The email address that you've entered doesn't match any account."
      });
    }
  }
  public static async userForgotPassword(req: Request, res: Response) {
    try {
      logger.info(
        "/user/forgotPassword",
        "put",
        "userForgotPassword",
        req.params.userId
      );
      if (req.body.password) {
        const user = await User.findOne({
          _id: req.params.userId,
          isDeleted: false
        });
        user.password = req.body.password;
        user.status = "active";
        user.save((err, user) => {
          if (!err && user) {
            res.status(200).json({
              message:
                " Your password is changed successfully. Now login with your new password."
            });
            logger.log("password updated");
          } else {
            res.status(400).json({ message: "error in update password", err });
            logger.error("error in update password", err);
          }
        });
      } else {
        res.status(400).json({ message: "missing required filed - password" });
      }
    } catch (error) {
      res.status(400).json({ message: "can not update password", error });
      logger.error("can not update password", error);
    }
  }

  // required field - password, newPassword, id

  public static async userResetPassword(req: Request, res: Response) {
    try {
      logger.info(
        "/user/resetPassword",
        "put",
        "userResetPassword",
        req.params.userId
      );
      if (req.body.password && req.body.newPassword) {
        const user = await User.findOne({
          _id: req.params.userId,
          isDeleted: false
        });
        if (hashPassword(req.body.password) !== user.password) {
          logger.error("password did not match");
          return res.status(400).json({ message: "password did not match" });
        } else {
          user.password = hashPassword(req.body.newPassword);
          await user.save();
          return res.status(200).json({ message: "password updated" });
        }
      } else {
        return res.status(400).json({
          message: "missing required filed - password and newPassword"
        });
      }
    } catch (error) {
      logger.error("falied to user reset password, reason:- ", error);
      return res.status(400).json({ message: "error in finding user", error });
    }
  }

  public static async accountActivation(req: Request, res: Response) {
    try {
      logger.info(
        "/user/accountActivation",
        "put",
        "accountActivation",
        req.params.userId
      );
      const result = await User.updateOne(
        { _id: req.params.userId, isDeleted: false },
        { status: "active", updatedAt: new Date() }
      );
      logger.log("your account is activated", result);
      return res.status(200).json({ message: "your account is activated." });
    } catch (error) {
      logger.error("falied to activate user account, reason:- ", error);
      return res.status(400).json({
        message:
          "error in activate account,please refresh the page. if problem persist please write a mail to us on videochatappsupport@gmail.com",
        error
      });
    }
  }
  public static async sendForgotPasswordMail(req: Request, res: Response) {
    try {
      logger.info(
        "/api/forgotPassword",
        "put",
        "sendForgotPasswordMail",
        req.body.email
      );
      const email = req.body.email || req.params.email;
      if (email) {
        const user = await User.findOne({ email, isDeleted: false });
        const token = jwtToken({
          aud: user.id,
          type: "forgot",
          email: user.email
        });
        const mailOptions = {
          userName: `${user.firstName} ${user.lastName}`,
          link: `${applicationData.forgotPassword.link}${token}`,
          linkDescription: applicationData.forgotPassword.linkDescription,
          to: user.email,
          subject: applicationData.forgotPassword.subject,
          text1: applicationData.forgotPassword.text1,
          text2: applicationData.forgotPassword.text2,
          text3: applicationData.forgotPassword.text3,
          template: applicationData.forgotPassword.template,
          hostName: applicationData.forgotPassword.hostName
        };
        logger.log("forgot password mail options", mailOptions);
        res.status(200).json({
          message: "We have sent a mail to reset your password."
        });
        mailService(mailOptions);
      } else {
        res.status(400).json({ message: "missing required field - email" });
      }
    } catch (error) {
      logger.error("falied to send forgot passward mail, reason:- ", error);
      return res.status(400).json({
        message:
          "The email address that you've entered doesn't match any account."
      });
    }
  }
}

export class SocketUserControoker {
  public static async updateUser(query: any, body: any) {
    try {
      await User.updateOne(query, body);
      return "success";
    } catch (error) {
      return "fail";
    }
  }
  public static async findUsers(query?: any) {
    try {
      const users = await User.find(
        { ...query, isDeleted: false },
        {
          firstName: 1,
          lastName: 1,
          email: 1,
          lastLoggedIn: 1,
          loginStatus: 1,
          isLoggedIn: 1,
          socketId: 1
        }
      );
      return users;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  public static async findUser(userId: string) {
    try {
      return await User.findOne(
        { _id: userId },
        {
          firstName: 1,
          lastName: 1,
          email: 1,
          lastLoggedIn: 1,
          loginStatus: 1,
          isLoggedIn: 1,
          socketId: 1
        }
      );
    } catch (error) {
      return "fail";
    }
  }
}
