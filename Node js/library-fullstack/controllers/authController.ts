import { Request, Response } from "express";
import { registerUser, loginUser } from "../service/authService.js";

export const register = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const registeredUser = await registerUser(user);
    res.status(201).send({ userId: registeredUser.id });
  } catch (error) {
    res.status(500).send({ message: "Error registering user", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const user = await loginUser(userName, password);
    if (user) {
      res.status(200).json({ userId: user.id });
    } else {
      res.status(401).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error logging in user", error });
  }
};
