require("dotenv").config() 
//async errors 
require("express-async-errors")

const expr = require("express")
const app = expr() 
const connectDb = require("./db/connect")
const productsRouter = require("./routes/products")


const notFoundMiddleware = require("./middleware/not-found")
const errorMiddleware = require("./middleware/error-handler") 

//midlleware 
app.use(expr.json())  
// app.use(notFoundMiddleware) 
app.use(errorMiddleware) 
 
//routes 
app.get("/",(req,res)=>{
    res.send("<h1>Store api : </h1><a href ='/api/v1/products'>Products routes</a>")
})

app.use("/api/v1/products" ,productsRouter )


//Products route

const start = async ()=>{
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(2000,()=>{console.log("server at 2000..")})
}catch(error){
    console.log(error)
}
}
start()