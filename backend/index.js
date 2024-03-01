import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app=express();

app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: '',
//         methods: [],
//         allowedHeaders: [],
//     })
// );
app.get("/", (req, res)=>{
    console.log(req);
    return res.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use("/books", bookRoute);

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT, ()=>{
        console.log(`App is listening to port: ${PORT}`)
    });
})
.catch((error)=>{
    console.log("Error connecting to database:", error);
});