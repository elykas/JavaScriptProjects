var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from "uuid";
import { writeUsersToFile, readUsersFromFile } from "../DAL/jsonUsers.js";
import bcrypt from "bcrypt";
export const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.userName || !user.password) {
        throw new Error("Email and password are required.");
    }
    if (!emailValidation(user.userName)) {
        throw new Error("Invalid email format.");
    }
    if (!passwordValidation(user.password)) {
        throw new Error("Password must contain at least one uppercase letter, one lowercase letter, and be at least eight characters long.");
    }
    const users = yield readUsersFromFile();
    const userExists = users.some((existingUser) => existingUser.userName === user.userName);
    if (userExists) {
        throw new Error("Username already exists.");
    }
    user.id = uuidv4();
    user.password = bcrypt.hashSync(user.password, 10);
    user.books = [];
    users.push(user);
    yield writeUsersToFile(users);
    return user;
});
export const loginUser = (userName, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userName || !password) {
        throw new Error("Email and password are required.");
    }
    const users = yield readUsersFromFile();
    const user = users.find((u) => u.userName === userName);
    if (user && bcrypt.compareSync(password, user.password)) {
        return user;
    }
    return null;
});
const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const passwordValidation = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
};
