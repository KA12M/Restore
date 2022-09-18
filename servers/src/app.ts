import express from "express";
import { Params, Query, Request, Response } from "express-serve-static-core";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { User, UserForm } from "./models/user.type";

const PORT = process.env.PORT || 8080;    

export interface TypedRequest<T extends Query, P extends Params, B> extends Express.Request {
  query: T; 
  params: P; 
  body: B; 
}

const app = express(); 

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json({ result: "ok" });
});

app.post("/login/:id", (req: TypedRequest<User, {id:string}, UserForm>, res: Response) => { 
  res.json(req.body.email);
});

app.get("/get/:id", (req: TypedRequest<User, {id:string}, UserForm>, res: Response) => { 
  res.json(req.params.id);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
  console.log("Server is running...");
});
