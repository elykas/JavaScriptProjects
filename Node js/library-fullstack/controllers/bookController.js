var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllBooks, fetchBookFromApi, addBookToUser, editBookService, deleteBookService } from "../service/bookService.js";
export const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }
        const books = yield getAllBooks(userId);
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found for this user.' });
        }
        res.status(200).json({ books });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});
export const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, bookName } = req.body;
        if (!userId || !bookName) {
            return res.status(400).json({ error: "User ID and Book Name are required." });
        }
        const book = yield fetchBookFromApi(bookName);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        const updatedUser = yield addBookToUser(userId, book);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(201).json({ bookId: book.id, book });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to add book' });
    }
});
export const editBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { userId, book } = req.body;
        if (!userId || !bookId || !book) {
            return res.status(400).json({ error: "User ID, Book ID, and updated data are required." });
        }
        const updatedBook = yield editBookService(bookId, userId, book);
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.status(201).json({ updatedBook });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update the book' });
    }
});
export const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { userId } = req.body;
        if (!userId || !bookId) {
            return res.status(400).json({ error: "User ID, Book ID" });
        }
        const deletedBook = yield deleteBookService(userId, bookId);
        if (deletedBook) {
            return res.status(200).json({ message: "Book deleted successfully." });
        }
        else {
            return res.status(404).json({ error: "User or book not found." });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete the book' });
    }
});
