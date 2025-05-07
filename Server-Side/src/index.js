import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "./Models/usersModel.js";
import { ProductModel } from "./Models/productsModel.js";
import { seedFakeProducts } from "./Utils/seeder.js";
import { OrderItemsModel, OrderModel } from "./Models/ordersModel.js";

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

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = req.headers.authorization.split(' ')[1]; 
    jwt.verify(token, "dsf454sd5f-45ds4f4dsf12c-5fd4awdf1", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    })
}

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

    if (!theUser) {
        console.log("no user");
        return res.status(403).send({ success: false, message: "Invalid credential" });
    }

    if (theUser?.password !== password) {
        console.log("pass fail");
        return res.status(403).send({ success: false, message: "Invalid credential" });
    }

    const token = jwt.sign({ userId: theUser._id }, "dsf454sd5f-45ds4f4dsf12c-5fd4awdf1", { expiresIn: '5h' });
    res.status(201).send({ success: true, message: "Login Successful", token });
})

app.post("/api/product", async (req, res) => {
    const { name, description, price, stock } = req.body;
    const newProduct = new ProductModel({ name, description, price, stock });
    await newProduct.save();
    res.status(201).send({ success: true, message: "new product created" });
})

app.get("/api/product", async (req, res) => {
    const { pid, size=10, page=1, searchText } = req.query;

    if(!!pid){
        const product = await ProductModel.findOne({ _id: pid }).select({ createdAt: 0, updatedAt: 0, __v: 0 });
        res.status(201).send({ success: true, product });
        return;
    }

    const pipeline = [
        {
            $skip: ((page*1)-1)*(size*1)
        },
        {
            $limit: size*1
        },
        {
            $project: { createdAt: 0, updatedAt: 0, __v: 0 }
        },
        
    ];

    if(searchText){
        pipeline.unshift({
            $match: { 
                $or: [
                    { name: { $regex: searchText, $options: 'i' } },
                    { description: { $regex: searchText, $options: 'i' } },
                ]
             }
        });
    }

    const products = await ProductModel.aggregate(pipeline);
    res.status(201).send({ success: true, products });
});

app.post("/api/selected-products", async (req, res) => {
    const { pidList } = req.body;
    const query = { _id: { $in: pidList } };
    const products = await ProductModel.find(query).select({ createdAt: 0, updatedAt: 0, __v: 0 });
    res.status(201).send({ success: true, products });
});

app.post("/api/make-order", verifyToken, async (req, res) => {
    const { cart } = req.body;
    if (!cart || cart?.length < 1) {
        return res.status(400).send({ success: false, message: "please Enter a valid cart in array" });
    }
    const pidList = cart.map((item) => item.prodId);
    const query = { _id: { $in: pidList } };
    const products = await ProductModel.find(query).select({ _id: 1, name: 1, price: 1, stcock: 1 });
    
    let payTotal = 0;
    products.forEach(product=>{
        const productInCart = cart.find(c => c.prodId == product._id.toString());
        if(productInCart){
            payTotal += product?.price * productInCart.qty;
        }

    })

    const newOrder = new OrderModel({ customerId: req?.user?.userId, total: payTotal });
    await newOrder.save();

    const orderedItems = cart.map((item) => {
        const theItem = (products.find((prod) => prod?._id.toString() === item?.prodId.toString()));
        return {
            orderId: newOrder._id,
            productId: theItem._id,
            unitPrice: theItem.price,
            quantity: item.qty,
            subtotal: item.qty * theItem.price
        };
    });

    await OrderItemsModel.insertMany(orderedItems);
    const populatedOrder = await OrderModel.findById(newOrder._id).populate("items").exec();

    res.status(201).send({ success: true, orderDetail: populatedOrder });
})

app.get("/api/orders", async (req, res)=>{
    const { pid, size=10, page=1, searchText } = req.query; 
    // const query = searchText ? {  }: {};
    // const populatedOrder = await OrderModel.find().skip(size*(page-1)).limit(size).populate("customer").select({password: 0}).exec();
    const pipeline = [
        {
            $addFields: {
                customerId: { $toObjectId: "$customerId" },
            },
        },    
        {
            $lookup: {
                from: "users",
                localField: "customerId",
                foreignField: "_id",
                as: "customer",
            },
        },
        {
            $unwind: "$customer",
        },
        {
            $project: {
                "customer._id": 0,
                "customer.password": 0,
                "customer.__v": 0,
                __v: 0,
                createdAt: 0, updatedAt: 0
            },
        }
    ]

    if(searchText){
        pipeline.push({
            $match: { 
                // $or: [
                    "customer.name": { $regex: searchText, $options: 'i' }
                    // { description: { $regex: searchText, $options: 'i' } },
                // ]
             }
        },
        {
            $skip: ((page*1)-1)*(size*1)
        },
        {
            $limit: size*1
        });
    }else{
        pipeline.unshift({
            $skip: ((page*1)-1)*(size*1)
        },
        {
            $limit: size*1
        })
    }

    const allOrders = await OrderModel.aggregate(pipeline);
    res.status(200).json({success: true, orders: allOrders});
})

app.get("/api/total", async (req, res)=>{
    const { table } = req.query;
    const size  = await mongoose.model(table).estimatedDocumentCount();
    res.send({success: true, info: { table, size }}) 
})

app.get("/api/seedproduct", async (req, res) => {
    const products = seedFakeProducts(20);
    const insResp = await ProductModel.insertMany(products);
    res.status(201).send({ success: true, message: "Fake products Seeded to DB" });
})

app.listen(5000, () => {
    console.log(`server is running at http://localhost:${5000}`);
});