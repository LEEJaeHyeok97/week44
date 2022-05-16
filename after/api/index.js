import { Router } from "express";
import Posts from "./posts";
import Auth from "./auth";


const app = Router();

app.use("/posts", Posts);
app.use("/auth", Auth);  



export default app;