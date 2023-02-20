const express = require("express");
const cors = require("cors");
const {connection} = require("./db");
const {userRouter} = require("./Routes/user.route");
const {postRoute} = require("./Routes/post.route");
const {Authenticate} = require("./middleware/Authenticate");
require("dotenv").config()

const app = express();
app.use(cors({
    origin:"*"
}))
app.use(express.json());

app.use("/users", userRouter)
app.use(Authenticate)
app.use("/posts",postRoute )

app.get("/",(req,res)=>{
    res.send("Home page Linkedin Users and Posts App ")
})

app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log("server is running at 8200")
})