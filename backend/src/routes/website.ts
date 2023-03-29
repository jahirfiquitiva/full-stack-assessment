import { Router } from 'express';
import { check } from 'express-validator';

import { saveWebsite, findWebsitesForUserRequestHandler } from './../controllers/website';
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
 *     summary: Login website
 *     description: Returns the website data (id and websitename). If it doesn't exist, it's created
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

export default router;
