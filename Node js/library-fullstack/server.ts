import  express, { Application }  from "express";
import routerAuths from "./routes/auth.js";
import routerBooks from "./routes/book.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT:number = parseInt(process.env.PORT || "3000", 10);
const app: Application = express();
app.use(cors)
app.use(express.json())

app.use('/',routerAuths)
app.use('/books',routerBooks)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});