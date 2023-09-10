import { Schema, model, Model } from "mongoose";
import crypto from "node:crypto";

interface IUser {
  name: string;
  email: string;
  created: Date;
  updated: Date;
  hashed_password: string;
  salt: string;
  _password?: string;
  // 表示这个函数返回值类型是string，也可以这样写：makeSale: () => string;
  //   makeSalt(): string;
  // 表示这个函数返回值类型是string，也可以这样写：encryptPassword: () => string;
  //   encryptPassword(password: string): string;
}

interface IUserMethods {
  authenticate(password: string): boolean;
  encryptPassword(password: string): string;
  makeSalt(): string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+@.+\..+/, "Please fill a valid email address"],
    required: true,
  },
  //   created: {
  //     type: Date,
  //     default: Date.now,
  //   },
  //   updated: Date,
  //   hashed_password: {
  //     type: String,
  //     required: true,
  //   },
  //   salt: String,
  //   _password: { type: String },
});

UserSchema.virtual("password")
  .set(function (password: string) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (password: string) {
    return this.encryptPassword(password) === this.hashed_password;
  },
  encryptPassword: function (password: string) {
    if (!password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

const User = model<IUser, UserModel>("User", UserSchema);
export default User;
