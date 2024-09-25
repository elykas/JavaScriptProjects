import { User,Book } from "../models/types.js";
import { writeUsersToFile, readUsersFromFile } from "../DAL/jsonUsers.js";
import axios from 'axios';



export const getAllBooks = async (userId: string): Promise<Book[]> => {

    if (!userId) {
        throw new Error('User ID is required');
    }

    const users: User[] = await readUsersFromFile();

    if (!users || users.length === 0) {
        throw new Error('No users found');
    }

    const user = users.find(u => u.id === userId);

    if (!user) {
        throw new Error('User not found');
    }

    return user?.books ?? [];
};


export const fetchBookFromApi = async (bookName: string): Promise<Book | null> => {
    const urlBook = `https://openlibrary.org/search.json?q=${bookName}`;
    const response: any = await axios.get(urlBook);
    const bookData = response.data.docs[0];

    if (!bookData) {
        return null;
    }

    const newBook: Book = {
        id:"",
        title: bookData.title,
        author: bookData.author_name ? bookData.author_name[0] : 'Unknown author'
    };

    return newBook;
};

export const addBookToUser = async (userId: string, newBook: Book): Promise<User | null> => {
    const users: User[] = await readUsersFromFile(); 

    const user = users.find(u => u.id === userId);
    if (!user) {
        return null; 
    }

    const id: string = user.books?.length ? String(user.books.length + 1) : '1';
    newBook.id = id;

    user.books = user.books ? [...user.books, newBook] : [newBook]; 

    await writeUsersToFile(users); 

    return user; 
};

export const editBookService = async(bookId:string,userId:string,updatedData:Partial<Book>): Promise<Book | null>  =>{
    const users: User[] = await readUsersFromFile(); 

    const user = users.find(u => u.id === userId);

    if (!user || !user.books) {
        return null; 
    }

    const book = user.books.find(b => b.id === bookId)
    if(!book){
        return null
    }

    updateBookProperties(book, updatedData);

    await writeUsersToFile(users);

    return book;

}


const updateBookProperties = (book: Book, updatedData: Partial<Book>): void => {
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


export const deleteBookService =async(userId:string,bookId:string)=>{
    const users: User[] = await readUsersFromFile(); 

    const user = users.find(u => u.id === userId);

    if (!user || !user.books) {
        return null; 
    }

    const bookIndex = user.books.findIndex(b => b.id === bookId)
    if(bookIndex === -1){
        return null
    }

    user.books.splice(bookIndex,1)

    await writeUsersToFile(users);
    return true;

}

   