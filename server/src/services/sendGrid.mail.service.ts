"use strict";
import * as ejs from "ejs";
import * as path from "path";
import * as fs from "fs";
import { logger } from "./logger.service";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);
export async function mailService(mailOptions, callback?) {
  try {

    const ejsFilePath = path.join(
      __dirname,
      "../",
      "../",
      "views",
      mailOptions.template || "general-mail.ejs"
    );
    const compiled = ejs.compile(fs.readFileSync(ejsFilePath, "utf8"));
    // send mail with defined transport object
    mailOptions.html = compiled(mailOptions);
    if (mailOptions.filename) {
      const pathToAttachment = path.join(
        __dirname,
        "../",
        "../",
        "invoice.pdf"
      );
      const attachment = fs.readFileSync(pathToAttachment).toString("base64");
      mailOptions.attachments = [
        {
          content: attachment,
          filename: mailOptions.filename,
          type: "application/pdf",
          disposition: "attachment"
        }
      ];
    }

    mailOptions.from = "virender.nehra@xccelerata.com";
    mailOptions.fromname= 'Virender Nehra';
    const info = await sgMail.send(mailOptions);
    if (callback) callback(info);
    else logger.error("mail info", info);
  } catch (error) {
    if (callback) callback(error);
    else logger.error("mail error", error);
  }
}
