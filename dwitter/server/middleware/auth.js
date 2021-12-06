import jwt from "jsonwebtoken";
import { secret } from "../config/jwt.js";

const AUTH_ERROR = { message: "Authentication Error!" };

export async function isAuth(req, res, next) {
  try {
    const authHeader = req.get("Authorization");
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
      res.status(401).json(AUTH_ERROR);
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, async (err, decoded) => {
      if (err) console.error(err);
      console.info(`Token decoded: `, decoded);
      req.userId = decoded.id; // req.custom data
      next();
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
}
