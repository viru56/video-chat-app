import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { config } from "../config";
const expiresIn: number = 60 * 60 * 1000 * 24;

export const jwtToken = payload => {
    var data = {
      aud: payload.aud,
      role: payload.role || "user",
      iss: config.hostName,
      type: payload.type || "login",
      email: payload.email || "Unknown"
    };
    return jwt.sign(data, config.secret, { expiresIn });
  };
  
  export const validateToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // check header or url parameters or post parameters for token
    var token = req.body.Authorization || req.query.Authorization || req.headers["Authorization"] || req.headers["authorization"];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          if ((err.name = "TokenExpiredError")) {
            return res.status(401).json({ message: "Token is expired" });
          }
          return res
            .status(401)
            .json({ message: "Failed to authenticate token." });
        } else {
          if (decoded.type !== "login") {
            return res.status(401).json({ message: "Not a valid token" });
          }
          // if everything is good, save to request for use in other routes
          req.params.userId = decoded.aud;
          req.params.email = decoded.email;
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.status(401).send({
        message: "No token provided."
      });
    }
  };
  export const validateAdminToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // check header or url parameters or post parameters for token
    var token = req.body.Authorization || req.query.Authorization || req.headers["Authorization"]|| req.headers["authorization"];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          if ((err.name = "TokenExpiredError")) {
            return res.status(401).json({ message: "Token is expired" });
          }
          return res
            .status(401)
            .json({ message: "Failed to authenticate token." });
        } else {
          if (decoded.type !== "login") {
            return res.status(401).json({ message: "Not a valid token" });
          }
          if (decoded.role !== "admin") {
            return res
              .status(401)
              .json({ message: "Failed to authenticate token." });
          }
          // if everything is good, save to request for use in other routes
          req.params.userId = decoded.aud;
          req.params.email = decoded.email;
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.status(401).send({
        message: "No token provided."
      });
    }
  };
  
  export const validateActivationToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // check header or url parameters or post parameters for token
    var token = req.body.Authorization || req.query.Authorization || req.headers["Authorization"] || req.headers["authorization"];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          if ((err.name = "TokenExpiredError")) {
            return res.status(401).json({ message: "Token is expired" });
          }
          return res
            .status(401)
            .json({ message: "Failed to authenticate token." });
        } else {
          if (decoded.type !== "activation") {
            return res.status(401).json({ message: "not a valid token" });
          }
          req.params.userId = decoded.aud;
          req.params.email = decoded.email;
          // if everything is good, save to request for use in other routes
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.status(401).send({
        message: "No token provided."
      });
    }
  };
  export const validateForgotPasswordToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // check header or url parameters or post parameters for token
    var token = req.body.Authorization || req.query.Authorization || req.headers["Authorization"] || req.headers["authorization"];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          if ((err.name = "TokenExpiredError")) {
            return res.status(401).json({ message: "Token is expired" });
          }
          return res
            .status(401)
            .json({ message: "Failed to authenticate token." });
        } else {
          if (decoded.type !== "forgot") {
            return res.status(401).json({ message: "not a valid token" });
          }
          // if everything is good, save to request for use in other routes
          req.params.userId = decoded.aud;
          req.params.email = decoded.email;
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.status(401).send({
        message: "No token provided."
      });
    }
  };