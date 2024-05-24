import { Router} from "express"
import { ExFuncCreateFolder } from "../controllers/fileManager/createFolder";
import { isTokenPresent } from "../middlewares/isTokenPresent.mdw";
import { ExFuncRenameFolder } from "../controllers/fileManager/renameFolder";
import { ExFuncDeleteFolder } from "../controllers/fileManager/deleteFolder";
import { ExFuncMainTree } from "../controllers/fileManager/mainViewTree";
import { ExFuncSubTree } from "../controllers/fileManager/viewTree";


const FileManagerRouter:Router = Router();
FileManagerRouter.get("/",isTokenPresent,ExFuncMainTree)
FileManagerRouter.get("/:folderID",isTokenPresent,ExFuncSubTree)

FileManagerRouter.post("/createFolder",isTokenPresent,ExFuncCreateFolder)
FileManagerRouter.put("/renameFolder",isTokenPresent,ExFuncRenameFolder)
FileManagerRouter.delete("/folder",isTokenPresent,ExFuncDeleteFolder)

export default FileManagerRouter