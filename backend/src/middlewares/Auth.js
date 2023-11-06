import prisma from "../config/PrismaClient.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { userToken } = req.cookies;
    if (!userToken) return next("Anda Belum Login!");

    const decoded = jwt.verify(userToken, process.env.SECRET_KEY);
    req.user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });
    next();
  } catch (error) {
    return next(error);
  }
};
