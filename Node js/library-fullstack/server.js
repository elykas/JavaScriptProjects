import express from "express";
import routerAuths from "./routes/auth.js";
import routerBooks from "./routes/book.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = parseInt(process.env.PORT || "3000", 10);
const app = express();
app.use(express.json());
app.use('/', routerAuths);
app.use('/books', routerBooks);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
