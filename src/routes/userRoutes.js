import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/userController";
import { authJwt, verifySignup } from "../middlewares";

router.post("/", [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkDuplicateUsernameOrEmail], usersCtrl.createUser);

export default router;