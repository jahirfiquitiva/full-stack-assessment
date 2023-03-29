import { WebsiteModel } from './../models/website';
import type {
  MongoQuery,
  RequestHandler,
  Website,
  WebsiteDocument,
  User,
} from 'types';
import {
  createSuccessResponse,
  createErrorResponse,
} from './../utils/responses';
import { scrapeWebsite } from './../utils/scrapper';
import { findUser } from './user';

const findWebsiteWithURL = (url: Website['url']): MongoQuery<WebsiteDocument> =>
  WebsiteModel.findOne({ url });

const findWebsitesForUser = (userId: User['id']) =>
  WebsiteModel.find({ users: userId });

export const saveWebsite: RequestHandler<Website> = async (req, res) => {
  try {
    const { url, username } = req.body;

    const user = await findUser(username);
    if (!user) {
      return res
        .status(401)
        .json(createErrorResponse(`User "${username}" was not found`));
    }

    const websiteData = await scrapeWebsite(url);
    if (!websiteData) {
      return res
        .status(500)
        .json(
          createErrorResponse(`Could not check website with url: "${url}"`),
        );
    }

    let website = await findWebsiteWithURL(url);
    if (!website) {
      website = new WebsiteModel({ ...websiteData, url, users: [user.id] });
      await website.save();
    } else if (!website.users.includes(user.id)) {
      // Only push the user id if it's not already in the list of users
      website.users.push(user.id);
      await website.save();
    }

    return res.status(200).json(createSuccessResponse<Website>(website));
  } catch (e: unknown) {
    return res.status(500).json(createErrorResponse((e as Error).message));
  }
};

export const findWebsitesForUserRequestHandler: RequestHandler<
  Array<Website>
> = async (req, res) => {
  try {
    const { user: userQuery } = req.query;
    let username = Array.isArray(userQuery)
      ? userQuery.join('')
      : userQuery?.toString() || '';

    const user = await findUser(username);
    if (!user) {
      return res
        .status(401)
        .json(createErrorResponse(`User "${username}" was not found`));
    }

    const websites = await findWebsitesForUser(user.id);
    return res.status(200).json(createSuccessResponse(websites));
  } catch (e: unknown) {
    return res.status(500).json(createErrorResponse((e as Error).message));
  }
};
