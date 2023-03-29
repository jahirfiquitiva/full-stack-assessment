import { WebsiteModel } from './../models/website';
import type {
  MongoQuery,
  RequestHandler,
  Website,
  WebsiteDocument,
} from 'types';
import {
  createSuccessResponse,
  createErrorResponse,
} from './../utils/responses';
import { scrapeWebsite } from './../utils/scrapper';
import { findUser } from './user';

export const saveWebsite: RequestHandler<
  { url: string; username: string },
  Website
> = async (req, res) => {
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

    console.log(websiteData);
    const website = new WebsiteModel({ ...websiteData, url, userId: user.id });
    await website.save();
    return res.status(200).json(createSuccessResponse<Website>(website));
  } catch (e: unknown) {
    return res.status(500).json(createErrorResponse((e as Error).message));
  }
};
