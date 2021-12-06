import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/tweet.js";
import * as validate from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

/**
 * [GET] /tweets
 * get all tweets
 * Response 200
 */
/**
 * [GET] /tweets?username=:username
 * get all tweets for user's username
 * Response 200
 */

router.get("/", isAuth, tweetController.getAll);

/**
 * [GET] /tweets/:id
 * get tweet by id
 * Response 200
 */
router.get("/:id", isAuth, tweetController.getById);

/**
 * [POST] /tweets
 * creating new tweet
 * Request body = { text, name, username, url(optional) }
 * Response 201
 */
router.post("/", isAuth, validate.create, tweetController.create);

/**
 * [PUT] /tweets/:id
 * updating tweet
 * Request body { text }
 * Response 200
 */
router.put("/:id", isAuth, tweetController.create);

/**
 * [DELETE] /tweets/:id
 * updating tweet
 * Response 204
 */
router.delete("/:id", isAuth, tweetController.remove);

export default router;
