// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
// });

// const response = await client.responses.create({
//   model: 'gpt-4o-mini',
// //   instructions: 'You are a coding assistant that talks like a pirate',
//   input: 'make a joke?',
// });

// console.log(response.output_text);

import express from 'express';  //use this syntac fro importing or the given below line for the same thing
//const express=require('express')

import 'dotenv/config';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import getOpenAiResponse from './utils/openai.js';
import mongoose from 'mongoose';
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

const app = express();

const port=8080; //8080 is used by mongodb atlas

// CORS configuration to allow credentials
app.use(cors({
    // origin: 'http://localhost:5173', // Frontend URL
    origin: "https://lepron-gpt-with-auth-frontend.onrender.com",
    credentials: true // $ Allow cookies to be sent  
}));

app.use(express.json());



const MONGO_URL=`${process.env.MONGODB_URI}`; //for mongodb atlas

main().then(()=>{
    console.log("connect to db");
}).catch((err)=>{
    console.log("Failed to connect with db",err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

// Session configuration
app.use(session({  //$
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        touchAfter: 24 * 3600 // lazy session update
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Set to true in production with HTTPS
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
}));

app.listen(port,()=>{
    console.log("server is listening at the port 8080");
    
});

// fetch("https://api.openai.com/v1/chat/completions")
app.use("/api/auth", authRoutes);  //$
app.use("/api",chatRoutes);
// app.post("/test",async( req,res)=>{

//     //all this options to try-catch block is the standard way to handle the fecth req from the api/endpoint
//     // const options={     //all this is shifted to the 
//     //     method:"POST",
//     //     headers:{
//     //         "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
//     //         "Content-Type":"application/json"
//     //     },
//     //     body:JSON.stringify({
//     //         "model": "gpt-4o-mini",
//     //         "messages": [
//     //         {
//     //             "role": "user",
//     //             "content": `${req.body.message}`
//     //         }
//     //         ]
//     //     })
//     // }

//     // try{
//     //     const resp=await fetch("https://api.openai.com/v1/chat/completions",options);
//     //     const data=await resp.json();
//     //     console.log(data.choices[0].message.content);
//     //     res.send(data);
//     // }catch(err){
//     //     console.log(err);
//     // }
//     let response=getOpenAiResponse(req.body.message);
//     res.send(response);
// })



