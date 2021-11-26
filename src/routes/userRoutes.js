import { Router } from "express";
import * as usersCtrl from "../controllers/userController";
import { authJwt, verifySignup } from "../middlewares";

const router = Router();

router.post("/", [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkDuplicateUsernameOrEmail], usersCtrl.createUser);

router.get("/", [authJwt.verifyToken, authJwt.isModerator], usersCtrl.getUsers);

router.get("/:userId", [authJwt.verifyToken, authJwt.isModerator], usersCtrl.getUserById);

router.delete("/:userId", [authJwt.verifyToken, authJwt.isAdmin], usersCtrl.deleteUserById);

export default router;