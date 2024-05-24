import express,{Express,Request,Response} from "express"
import errMdw from "./middlewares/err.mdw";
import LoginRouter from "./routes/loginRoutes";
import cors from "cors"
import cookieParser from "cookie-parser";
import StoreRouter from "./routes/storeRutes";
import FileManagerRouter from "./routes/fileManagement";

const app:Express = express();
app.use(cors({
    origin:"*",
    credentials:true
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())


//  Routes
app.use("/user",LoginRouter)
app.use("/store",StoreRouter)
app.use("/drive",FileManagerRouter)


// Univrsal Route
app.use("*",(req:Request,res:Response)=>{
    res.status(404).json({
        success:false,
        resp:"Not Found"
    })
})


// Handling Errors
app.use(errMdw) 


export default  app