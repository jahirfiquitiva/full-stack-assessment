import { UserModel } from './../models/user';
import type { MongoQuery, RequestHandler, User, UserDocument } from 'types';
import {
  createSuccessResponse,
  createErrorResponse,
} from './../utils/responses';

export const findUser = (username: User['username']): MongoQuery<UserDocument> =>
  UserModel.findOne({ username });

const findOrCreateUser = async (
  username: User['username'],
): Promise<UserDocument> => {
  let user = await findUser(username);
  if (!user) {
    user = new UserModel({ username });
    await user.save();
  }
  return user;
};

export const loginUser: RequestHandler<{ username: string }, User> = async (
  req,
  res,
) => {
  try {
    const { username } = req.body;
    const user = await findOrCreateUser(username);
    return res.status(200).json(createSuccessResponse<User>(user));
  } catch (e: unknown) {
    return res.status(500).json(createErrorResponse((e as Error).message));
  }
};
