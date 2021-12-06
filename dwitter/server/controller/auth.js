import express from "express";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as authRepository from "../data/auth.js";
import { secret } from "../config/jwt.js";

const bcryptSaltRounds = 12;
const jwtExpiration = "365d";

export async function signup(req, res, next) {
  try {
    const { username, password, name, email, url } = req.body;

    const found = await authRepository.getByUsername(username);
    if (found) {
      res.status(409).json({
        message: `Error: User with username: ${username} already exists!`,
      });
    }

    // hashing password
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);

    const userId = await authRepository.create({
      username,
      password: hashed,
      name,
      email,
      url,
    });
    // creating JWT
    const token = await createJwtToken(userId);

    res.status(201).json({ token, username, hashed });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await authRepository.getByUsername(username);
    if (!user) {
      res.status(401).json({ message: `Error1: Invalid username or password` });
    }
    // compare hashed password wit db password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword);
    if (isValidPassword) {
      const token = await createJwtToken(user.id);
      res.status(200).json({ token, username });
    } else {
      res.status(401).json({ message: `Error: Invalid username or password` });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
}

export async function me(req, res, next) {
  try {
    const userId = req.userId;
    console.log(`userId: ${userId}`);
    const token = req.get("Authorization").split(" ")[1];
    const user = await authRepository.getById(userId);
    res.status(200).json({ token, username: user.username });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
}

async function createJwtToken(userId) {
  return jwt.sign({ userId }, secret, { expiresIn: jwtExpiration });
}
