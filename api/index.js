import express from "express"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import multer from "multer"
import cors from "cors"

const corsOptions={
    origin:true,
    credentials:true,
    withCredentials:true,
    optionSuccessStatus:200,
    methods: ["GET", "POST", "PUT", "DELETE"]
}
const app=express()
app.use(express.json())
app.use(cors(corsOptions))

const storage=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null, '../client/upload')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})


const upload=multer({storage})

app.post('/api/upload',upload.single('file'),function (req,res){
    const file=req.file
    res.status(200).json(file.filename)
})

app.use('/api/auth',authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)

app.listen(8800,()=>{
    console.log('Connected')
})