var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { writeUsersToFile, readUsersFromFile } from "../DAL/jsonUsers.js";
import axios from 'axios';
export const getAllBooks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!userId) {
        throw new Error('User ID is required');
    }
    const users = yield readUsersFromFile();
    if (!users || users.length === 0) {
        throw new Error('No users found');
    }
    const user = users.find(u => u.id === userId);
    if (!user) {
        throw new Error('User not found');
    }
    return (_a = user === null || user === void 0 ? void 0 : user.books) !== null && _a !== void 0 ? _a : [];
});
export const fetchBookFromApi = (bookName) => __awaiter(void 0, void 0, void 0, function* () {
    const urlBook = `https://openlibrary.org/search.json?q=${bookName}`;
    const response = yield axios.get(urlBook);
    const bookData = response.data.docs[0];
    if (!bookData) {
        return null;
    }
    const newBook = {
        id: "",
        title: bookData.title,
        author: bookData.author_name ? bookData.author_name[0] : 'Unknown author'
    };
    return newBook;
});
export const addBookToUser = (userId, newBook) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const users = yield readUsersFromFile();
    const user = users.find(u => u.id === userId);
    if (!user) {
        return null;
    }
    const id = ((_a = user.books) === null || _a === void 0 ? void 0 : _a.length) ? String(user.books.length + 1) : '1';
    newBook.id = id;
    user.books = user.books ? [...user.books, newBook] : [newBook];
    yield writeUsersToFile(users);
    return user;
});
export const editBookService = (bookId, userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readUsersFromFile();
    const user = users.find(u => u.id === userId);
    if (!user || !user.books) {
        return null;
    }
    const book = user.books.find(b => b.id === bookId);
    if (!book) {
        return null;
    }
    updateBookProperties(book, updatedData);
    yield writeUsersToFile(users);
    return book;
});
const updateBookProperties = (book, updatedData) => {
    if (updatedData.title) {
        book.title = updatedData.title;
    }
    if (updatedData.author) {
        book.author = updatedData.author;
    }
    if (updatedData.id) {
        book.id = updatedData.id;
    }
};
export const deleteBookService = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readUsersFromFile();
    const user = users.find(u => u.id === userId);
    if (!user || !user.books) {
        return null;
    }
    const bookIndex = user.books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) {
        return null;
    }
    user.books.splice(bookIndex, 1);
    yield writeUsersToFile(users);
    return true;
});
