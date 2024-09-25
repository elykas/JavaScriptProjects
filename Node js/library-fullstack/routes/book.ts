import express from "express";
import { getAll,addBook,editBook,deleteBook } from '../controllers/bookController.js';

const router = express.Router();

router.route('/:userId').get(getAll);
router.route('/').post(addBook);
router.route('/:bookId').put(editBook);
router.route('/:bookId').put(editBook);
router.route('/:bookId').delete(deleteBook);
export default router;
