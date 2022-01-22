import { Router } from 'express';
import * as authCtrl from '../controllers/authController';
import { verifySignup } from "../middlewares";

const router = Router();

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

/**
 * @swagger
 * paths:
 *  /api/users/signup?:
 *      post:
 *          summary: Sign up for the application
 *          tags: [Users]
 *          description: Sign in
 *          parameters:
 *            - in: body
 *              name: username
 *              description: User name
 *              required: true
 *            - in: body
 *              name: email
 *              description: User email
 *              required: true
 *            - in: body
 *              name: password
 *              description: User password
 *              required: true
 *          responses:
 *              '400':
 *                  description: User already exists
 *              '401':
 *                  description: Invalid password
 *              '500':
 *                  description: Unsupported
 *              '200':
 *                  description: OK
 */
router.post("/signup?", [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signUp);

/**
 * @swagger
 * paths:
 *  /api/users/signin:
 *      post:
 *          summary: Sign in to the application
 *          tags: [Users]
 *          description: Sign in
 *          parameters:
 *            - in: body
 *              name: email
 *              description: User email
 *              required: true
 *            - in: body
 *              name: password
 *              description: User password
 *              required: true
 *          responses:
 *              '400':
 *                  description: User not found
 *              '401':
 *                  description: Invalid password
 *              '500':
 *                  description: Unsupported
 *              '200':
 *                  description: OK
 */
router.post('/signin', authCtrl.signIn);

export default router;