import express from "express";
import * as authController from "../controller/auth.js";
import * as validate from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

/**
 * [POST] /auth/signup
 * signup api
 *
 * Request body : {
 * username, password, name, email, url
 * }
 *
 * Response : {
 * token, username
 * }
 */

router.post("/signup", validate.signup, authController.signup);

/**
 * [POST] /auth/login
 * login api
 *
 * Request body: {
 * username, password
 * }
 *
 * Response: {
 * token, username
 * }
 */
router.post("/login", validate.credential, authController.login);

/**
 * [POST] /auth/me
 * login with JWT
 * Request Header: Authorization: Bearer ~~
 * Response: {
 * token, username
 * }
 */
router.get("/me", isAuth, authController.me);

export default router;
