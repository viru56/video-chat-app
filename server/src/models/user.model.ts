import * as mongoose from "mongoose";
import { hashPassword } from "../services";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "name is required"],
      maxlength: [250, "name can not greater than 250 chars"],
      lowercase: true,
      trim: true
    },
    lastName: {
      type: String,
      required: [true, "name is required"],
      maxlength: [250, "name can not greater than 250 chars"],
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      match: [/^[0-9]{10,12}$/, "phone should have 10 digits only"]
    },
    email: {
      type: String,
      required: [true, "email is required"],
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "not a valid email address"
      ],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: String,
    isDeleted: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive"
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

UserSchema.pre("validate", function() {
  this.password = this.password ? hashPassword(this.password) : null;
});

export const User = mongoose.model("User", UserSchema);
