import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "./Models/usersModel.js";
import { ProductModel } from "./Models/productsModel.js";
import { seedFakeProducts } from "./Utils/seeder.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoDBConnect = async () => {
    await mongoose.connect(`${process.env.MONGO_URI}`);
};
mongoDBConnect()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => console.error("Connection error", err));


app.get("/", (req, res) => {
    res.send({ hello: "world" })
})

app.post("/api/register", async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = UserModel({ name, email, password })
    await newUser.save();
    res.status(201).send({ success: true, message: "new user created" });
})

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const theUser = await UserModel.findOne({ email });
    console.log(theUser);
    
    if(!theUser){
        console.log("no user");
        return res.status(403).send({ success: false, message: "Invalid credential" });
    }

    if(theUser?.password !== password){
        console.log("pass fail");
        return res.status(403).send({ success: false, message: "Invalid credential" });
    }

    const token = jwt.sign({ userId: theUser._id }, "dsf454sd5f-45ds4f4dsf12c-5fd4awdf1", { expiresIn: '5h' });
    res.status(201).send({ success: true, message: "new user created", token });
})

app.post("/api/product", async (req, res)=>{
    const { name, description, price, stock } = req.body;
    const newProduct = new ProductModel({ name, description, price, stock });
    await newProduct.save();
    res.status(201).send({ success: true, message: "new product created" });
})

app.get("/api/product", async (req, res)=>{
    const products = await ProductModel.find().select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0});
    res.status(201).send({ success: true, products });
})

app.get("/api/seedproduct", async (req, res)=>{
    const products =  seedFakeProducts(20);
    const insResp = await ProductModel.insertMany(products);
    res.status(201).send({ success: true, message: "Fake products Seeded to DB" });
})

app.listen(5000, () => {
    console.log(`server is running at http://localhost:${5000}`);
});