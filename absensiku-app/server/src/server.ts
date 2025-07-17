import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import router from "./routes";
import { hash } from "./utils/bcyriptjs";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(router)


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));


