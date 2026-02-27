//Packages
import exppress from 'express';
import cors from 'cors';
import 'dotenv/config';

//config
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

//routes
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/ordersRoutes.js';


//app config
const app = exppress();
const port = process.env.PORT || 4000;
connectDB();            // connect to database
connectCloudinary();//connect database for Images


//middleware
app.use(exppress.json())
app.use(cors())


// api endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/orders", orderRouter)


app.get('/', (req, res) => {
    res.send("api working")
})


app.listen(port, () => {
    console.log("server respond on port: " + port)
})