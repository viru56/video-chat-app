"use strict";
import * as nodemailer from "nodemailer";
import * as ejs from "ejs";
import * as path from "path";
import * as fs from "fs";
import { logger } from "./logger.service";
const { google } = require("googleapis");
const oauth2Client = new google.auth.OAuth2(
  "1079291906756-nipv88tno21dn7itt494n0tlurri1b0o.apps.googleusercontent.com",
  "3JP_nuvqIUXV6ARTcwZ61QDX",
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token:
    "1//04c4_wmRDC-uYCgYIARAAGAQSNwF-L9IrIKi0hQYvUJkTlgMdt-JFBl64MFSV0pY8WfUpHLos5qxCeE3w0NKrMQ0DG8DWI7cXSEo"
});
export async function mailService(mailOptions, callback?) {
  try {
    const { token } = await oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "no.reply.videochatapp@gmail.com",
        clientId:
          "1079291906756-nipv88tno21dn7itt494n0tlurri1b0o.apps.googleusercontent.com",
        clientSecret: "3JP_nuvqIUXV6ARTcwZ61QDX",
        refreshToken:
          "1//04c4_wmRDC-uYCgYIARAAGAQSNwF-L9IrIKi0hQYvUJkTlgMdt-JFBl64MFSV0pY8WfUpHLos5qxCeE3w0NKrMQ0DG8DWI7cXSEo",
        accessToken: token
      }
    });
    const ejsFilePath = path.join(
      __dirname,
      "../",
      "../",
      "views",
      mailOptions.template || "general-mail.ejs"
    );
    if (!fs.existsSync(ejsFilePath)) {
      const error = {
        error: "email is not sent",
        reason: "ejs template file path is not valid",
        path: ejsFilePath
      };
      if (callback) callback(error);
      else logger.error("mail info", error);
    }
    const compiled = ejs.compile(fs.readFileSync(ejsFilePath, "utf8"));
    // send mail with defined transport object
    mailOptions.html = compiled(mailOptions);
    // if (mailOptions.filename) {
    //   mailOptions.attachments = [
    //     {
    //       filename: mailOptions.filename,
    //       path: path.join(__dirname, "../", "../", "invoice.pdf")
    //     }
    //   ];
    // }
    // nodemailer
    mailOptions.from = '"Video Chat App" <no.reply.videochatapp@gmail.com>'; // sender address
    const info = await transporter.sendMail(mailOptions);

    if (callback) callback(info);
    else logger.error("mail info", info);
  } catch (error) {
    if (callback) callback(error);
    else logger.error("mail error", error);
  }
}
