import { model, Schema } from 'mongoose';
import type { Model } from 'mongoose';
import validator from 'validator';
import { User } from 'types';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [validator.isAlphanumeric, validator.isLowercase],
  },
});

UserSchema.methods.toJSON = function (): string {
  const { _id, ...user } = this.toObject();
  user.id = _id;
  delete user.__v;
  return user;
};

export const UserModel: Model<User> = model<User>('user', UserSchema);
