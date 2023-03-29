import { Router } from 'express';
import { check } from 'express-validator';

import {
  saveWebsite,
  findWebsitesForUserRequestHandler,
  findLinksForWebsite,
} from './../controllers/website';
import { validator } from './../middlewares/validator';

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Website
 *   description: Website
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Website:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *         username:
 *           type: string
 */

/**
 * @swagger
 * /api/website:
 *   post:
 *     tags: [Website]
 *     summary: Creates a new website record in the database
 *     description: Returns the website data (id, title, url and links). If it doesn't exist, it's created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Website'
 *     responses:
 *       "200":
 *         description:
 *           Process completed successfully. Website was created or found
 *       "500":
 *         description: Couldn't connect to database or an unexpected error occurred.
 */

router.post(
  '/',
  [
    check('url', 'Website URL is required').notEmpty(),
    check('url', 'Website URL does not have the right URL format').isURL(),
    check('username', 'Username is required').notEmpty(),
    validator,
  ],
  saveWebsite,
);

/**
 * @swagger
 * /api/website:
 *   get:
 *     tags: [Website]
 *     summary: Get the scrapped websites for the given user
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: The username of the user to search websites for
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to start showing items from
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The limit of items to get for the given page
 *     responses:
 *       "200":
 *         description:
 *           Process completed successfully. A list of websites is returned (can be empty).
 *       "500":
 *         description: Couldn't connect to database or an unexpected error occurred.
 */

router.get(
  '/',
  [check('user', 'Username is required').notEmpty(), validator],
  findWebsitesForUserRequestHandler,
);

/**
 * @swagger
 * /api/website/{websiteId}:
 *   get:
 *     tags: [Website]
 *     summary: Get the scrapped links for a website if it exists
 *     parameters:
 *       - in: path
 *         name: websiteId
 *         schema:
 *           type: string
 *         description: The id of the website
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to start showing items from
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The limit of items to get for the given page
 *     responses:
 *       "200":
 *         description:
 *           Process completed successfully. A list of links is returned (can be empty).
 *       "500":
 *         description: Couldn't connect to database or an unexpected error occurred.
 */

router.get(
  '/:websiteId',
  [check('websiteId', 'websiteId is required').notEmpty(), validator],
  findLinksForWebsite,
);

export default router;
