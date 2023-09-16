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

/* The password string that's provided by the user is not stored directly in the user
document. Instead, it is handled as a virtual field. */
UserSchema.virtual("password")
  .set(function (password: string) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

/* The encryption logic and salt generation logic, which are used to generate the
hashed_password and salt values representing the password value, are defined as
UserSchema methods. */
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

// Password field validation
/* To add validation constraints to the actual password string that's selected by the end
user, we need to add custom validation logic and associate it with the
hashed_password field in the schema. */
UserSchema.path("hashed_password").validate(function () {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be ate least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required.");
  }
});

const User = model<IUser, UserModel>("User", UserSchema);
export default User;
