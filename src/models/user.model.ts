import { Schema, model } from "mongoose";

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

const UserSchema = new Schema<IUser>({
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

const User = model("User", UserSchema);
export default User;
