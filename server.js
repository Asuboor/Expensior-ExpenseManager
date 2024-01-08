const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const path=require('path')
const connectDB = require('./config/connectDB')
dotenv.config()

//database connection

connectDB();

const app=express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//user
app.use('/api/v1/users',require('./routes/userRoutes'))

//transactions
app.use("/api/v1/transaction",require("./routes/transactionRoutes"))

//static files

app.use(express.static(path.join(__dirname,"./client/build")));

app.get("*",function(req,res){
    res.sendfile(path.join(__dirname,"./client/build/index.html"))
})


app.listen(8000,function(req,res){
    console.log("listening");
})
