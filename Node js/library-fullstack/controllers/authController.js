var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { registerUser, loginUser } from "../service/authService.js";
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const registeredUser = yield registerUser(user);
        res.status(201).send({ userId: registeredUser.id });
    }
    catch (error) {
        res.status(500).send({ message: "Error registering user", error });
    }
});
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const user = yield loginUser(userName, password);
        if (user) {
            res.status(200).json({ userId: user.id });
        }
        else {
            res.status(401).json({ message: "Wrong credentials" });
        }
    }
    catch (error) {
        res.status(500).send({ message: "Error logging in user", error });
    }
});
