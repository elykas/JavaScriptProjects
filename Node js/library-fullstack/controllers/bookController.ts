import { Request, Response } from "express";
import { getAllBooks,fetchBookFromApi,addBookToUser ,editBookService,deleteBookService} from "../service/bookService.js";
import { error } from "console";


export const getAll = async(req: Request, res:Response) => {
    try {
        const {userId} = req.params;

        if(!userId){
            return res.status(400).json({ error: 'User ID is required.' });
        }

        const books = await getAllBooks(userId);

        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found for this user.' });
          }

        res.status(200).json({books})
        
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error', error});    
    }
}



export const addBook = async (req: Request, res: Response) => {
    try {
        const { userId, bookName } = req.body;

        if (!userId || !bookName) {
            return res.status(400).json({ error: "User ID and Book Name are required." });
        }

        const book = await fetchBookFromApi(bookName);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const updatedUser = await addBookToUser(userId, book);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(201).json({bookId: book.id, book });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to add book'});
    }
};


export const editBook = async(req: Request,res:Response) => {
    try {
        const {bookId} = req.params;
        const {userId,book} = req.body;

        if (!userId || !bookId || !book) {
            return res.status(400).json({ error: "User ID, Book ID, and updated data are required." });
        }

        const updatedBook = await  editBookService(bookId,userId,book);

        if(!updatedBook){
            return res.status(404).json({ error: 'Book not found' });
        }

        return res.status(201).json({updatedBook });


        
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the book'});
    }
}


export const deleteBook = async(req: Request,res:Response) => {
    try {
        const {bookId} = req.params;
        const {userId} = req.body;

        if (!userId || !bookId) {
            return res.status(400).json({ error: "User ID, Book ID" });
        }

        const deletedBook = await deleteBookService(userId,bookId)
        if(deletedBook){
            return res.status(200).json({message: "Book deleted successfully."})
        }else {
            return res.status(404).json({ error: "User or book not found." });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the book'});
    }
}