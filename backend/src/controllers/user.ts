import { UserModel } from './../models/user';
import type { MongoQuery, RequestHandler, User, UserDocument } from 'types';
import {
  createSuccessResponse,
  createErrorResponse,
} from './../utils/responses';

export const findUserWithUsername = (
  username: User['username'],
): MongoQuery<UserDocument> => UserModel.findOne({ username });

export const loginUser: RequestHandler<{ username: string }, User> = async (
  req,
  res,
) => {
  try {
    const { username } = req.body;
    if (!username)
      return res
        .status(400)
        .json(createErrorResponse('Missing username in request'));

    let user = await findUserWithUsername(username);
    if (!user) {
      user = new UserModel({ username });
      await user.save();
    }
    return res.status(200).json(createSuccessResponse<User>(user));
  } catch (e: unknown) {
    return res.status(500).json(createErrorResponse((e as Error).message));
  }
};
