import { v4 as uuidv4 } from "uuid";
import { writeUsersToFile, readUsersFromFile } from "../DAL/jsonUsers.js";
import bcrypt from "bcrypt";
import { User } from "../models/types.js";

export const registerUser = async (user: User): Promise<User> => {
  if (!user.userName || !user.password) {
    throw new Error("Email and password are required.");
  }

  if (!emailValidation(user.userName)) {
    throw new Error("Invalid email format.");
  }

  if (!passwordValidation(user.password)) {
    throw new Error(
      "Password must contain at least one uppercase letter, one lowercase letter, and be at least eight characters long."
    );
  }

  const users: User[] = await readUsersFromFile();
  const userExists = users.some(
    (existingUser) => existingUser.userName === user.userName
  );
  if (userExists) {
    throw new Error("Username already exists.");
  }

  user.id = uuidv4();
  user.password = bcrypt.hashSync(user.password, 10);
  user.books = [];

  users.push(user);
  await writeUsersToFile(users);

  return user;
};

export const loginUser = async (
  userName: string,
  password: string
): Promise<User | null> => {
  if (!userName || !password) {
    throw new Error("Email and password are required.");
  }

  const users: User[] = await readUsersFromFile();
  const user = users.find((u) => u.userName === userName);

  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }

  return null;
};

const emailValidation = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const passwordValidation = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};
