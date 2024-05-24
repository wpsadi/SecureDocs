import { NextFunction, Request, Response } from "express";

import { z } from "zod";
import AppError from "../../utils/errorClass";
import { newUserApp } from "../../appwrite/user/createUser";

export const ExFuncUserSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return next(new AppError("Please provide all the details", 400));
    }

    if (!z.string().email().parse(email)) {
        return next(new AppError("Invalid Email", 400));
    }

    return next(new AppError(      JSON.stringify(
        await newUserApp({
          email,
          password,
          name,
        })
      ),
      201));
  } catch (e: any) {
    if (
      e.message ===
      "Email already in use"
    ) {
      return next(new AppError("User already exists", 400));
    }
    return next(new AppError(e.message, 400));
  }
};
