import { Router} from "express"
import upload from "../middlewares/multer.mdw";
import { ExFuncUploadFile } from "../controllers/storage/uploadFile";
import { isTokenPresent } from "../middlewares/isTokenPresent.mdw";
import { ExFuncFileDownload } from "../controllers/storage/getDownload";
import { ExFuncFileView } from "../controllers/storage/getView";
import { ExFuncUpdateFileName } from "../controllers/storage/updateFilename";
import { ExFuncDeleteFile } from "../controllers/storage/deleteFile";

const StoreRouter:Router = Router();


StoreRouter.post("/upload",isTokenPresent,upload().single("file"),ExFuncUploadFile)
StoreRouter.get("/download",isTokenPresent,ExFuncFileDownload)
StoreRouter.get("/view",isTokenPresent,ExFuncFileView)

StoreRouter.put("/rename",isTokenPresent,ExFuncUpdateFileName)
StoreRouter.delete("/delete",isTokenPresent,ExFuncDeleteFile)

export default StoreRouter