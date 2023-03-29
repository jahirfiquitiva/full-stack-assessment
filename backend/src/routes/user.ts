import { Router } from 'express';
import { check } from 'express-validator';

import { findOrCreateUserRequestHandler } from './../controllers/user';
import { validator } from './../middlewares/validator';

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags: [User]
 *     summary: Creates a new user record or returns an existing one if found
 *     requestBody:
 *       description: Returns the user data (id and username). If it doesn't exist, it's created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "200":
 *         description:
 *           Process completed successfully. User was created or found
 *       "500":
 *         description: Couldn't connect to database or an unexpected error occurred.
 */

router.post(
  '/',
  [
    check('username', 'Username is required').notEmpty(),
    check('username', 'Username must be lowercase').isLowercase(),
    check(
      'username',
      'Username must include alphanumeric characters only',
    ).isAlphanumeric(),
    check('username', 'Username cannot start with a number').custom(
      (text: string) => {
        const firstChar = text.split('')?.[0];
        if (!firstChar) return false;
        try {
          const number = parseInt(firstChar);
          return Number.isNaN(number); // Invalid if first char is a number
        } catch (e) {
          return false;
        }
      },
    ),
    validator,
  ],
  findOrCreateUserRequestHandler,
);

export default router;
