const mongoose=require('mongoose')

const connectDB=async()=>{
    await mongoose.connect(process.env.MONGO_STRING)
}

module.exports=connectDB