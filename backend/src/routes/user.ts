import { Router } from 'express';
import { check } from 'express-validator';

import { loginUser } from './../controllers/user';
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
 *      UserLogin:
 *         type: object
 *         user:
 *             username:
 *                 type:string
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags: [User]
 *     summary: Login user
 *     requestBody:
 *       description: Returns the user data (id and username). If it doesn't exist, it's created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       "200":
 *         description:
 *           Process completed successfully. User was created or found
 *       "500":
 *         description: Couldn't connect to database or an unexpected error occurred.
 */

router.post(
  '/login',
  [
    check('username', 'Username is required').notEmpty(),
    check('username', 'Username must be lowercase').isLowercase(),
    check('username', 'Username must include alpha characters only').isAlpha(),
    validator,
  ],
  loginUser,
);

export default router;
