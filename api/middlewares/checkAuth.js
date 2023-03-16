import jwt from "jsonwebtoken";
import { createResponse } from "../utils/createResponse.js";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secrethash123");
      req.userId = decoded._id;

      next();
    } catch (error) {
      createResponse(res, 403, "Нет доступа!")
    }
  } else {
    createResponse(res, 403, "Нет доступа!")
  }
};
