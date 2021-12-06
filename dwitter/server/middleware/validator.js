import express from "express";
import { body, param, query, validationResult } from "express-validator";

function validationErrCatch(req, res, next) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

export const create = [
  body("text")
    .trim()
    .not()
    .isEmpty()
    .withMessage("text empty")
    .isLength({ min: 10, max: 40 })
    .withMessage("text must be longer than 10, shorter than 40"),
  body("name").trim().not().isEmpty().withMessage("name empty"),
  body("username").trim().not().isEmpty().withMessage("username empty"),
  body("url")
    .trim()
    .not()
    .isEmpty()
    .withMessage("url empty")
    .isURL()
    .withMessage("not a URL"),
  validationErrCatch,
];

export const credential = [
  body("username").trim().notEmpty().withMessage(`username empty`),
  body("password").trim().notEmpty().withMessage(`password empty`),
  validationErrCatch,
];

export const signup = [
  body("name").trim().notEmpty().withMessage(`name empty`),
  body("email").trim().isEmail().withMessage(`Invalid Email`),
  body("url")
    .trim()
    .isURL()
    .withMessage(`Invalid URL`)
    .optional({ nullable: true, checkFalsy: true }),
  credential,
  validationErrCatch,
];
