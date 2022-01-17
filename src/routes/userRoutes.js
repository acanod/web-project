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

router.get("/:userId", [authJwt.verifyToken, authJwt.isModerator], usersCtrl.getUserById);

router.post("/", [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkDuplicateUsernameOrEmail], usersCtrl.createUser);

router.delete("/:userId", [authJwt.verifyToken, authJwt.isAdmin], usersCtrl.deleteUserById);

export default router;