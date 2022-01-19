import { Router } from "express";
import * as usersCtrl from "../controllers/userController";
import { authJwt, verifySignup } from "../middlewares";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           readOnly: true
 *           description: The auto-generated id of the product
 *         username:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         role:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *       example:
 *         id: 619c06c7ef541e81695a6902
 *         username: Julen
 *         email: jul@gmail.com
 *         password: $2b$10$XuR5lYWaVdale.n3uGhzyeXT4z6pM1iySdigbeeqV/7XMf8fzCjpK
 *         role: 619c0093ae041dcd562f43a9
 */

/**
  * @swagger
  * tags:
  *   name: Users
  *   description: The users in company API
  */

/**
 * @swagger
 * paths:
 *  /api/users/:
 *      get:
 *          summary: Returns a list of users
 *          tags: [Users]
 *          description: All available users are sent
 *          responses:
 *              '200':
 *                  description: Shipping of all users
 *          content:
 *               application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/Product'
 */
router.get("/", [authJwt.verifyToken, authJwt.isModerator], usersCtrl.getUsers);

/**
 * @swagger
 * paths:
 *  /api/users/{userId}:
 *      get:
 *          summary: Returns one user
 *          tags: [Users]
 *          description: The desired object is returned
 *          parameters:
 *            - in: user id
 *              name: userId
 *              description: User id
 *              schema:
 *                  type: string
 *                  required: true
 *                  description: The user id
 *          responses:
 *              '200':
 *                  description: User is returned
 */
router.get("/:userId", [authJwt.verifyToken, authJwt.isModerator], usersCtrl.getUserById);

/**
 * @swagger
 * paths:
 *  /api/users/:
 *      post:
 *          summary: Create a user
 *          tags: [Users]
 *          description: Create a new user
 *          responses:
 *              '200':
 *                  description: OK
 */
router.post("/", [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkDuplicateUsernameOrEmail], usersCtrl.createUser);

/**
 * @swagger
 * paths:
 *  /api/users/{userId}:
 *      delete:
 *          summary: delete a user
 *          tags: [Users]
 *          responses:
 *              '200':
 *                  description: OK
 */
router.delete("/:userId", [authJwt.verifyToken, authJwt.isAdmin], usersCtrl.deleteUserById);

export default router;