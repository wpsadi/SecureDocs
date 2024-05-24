import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { ViewFileApp } from "../../appwrite/storage/viewItem";
import { ViewFileInfoApp } from "../../appwrite/storage/getFileInfo";
import mime from "mime"
import fs from "fs"

export const ExFuncFileDownload = async (req:any,res:Response,next:NextFunction)=>{
    try{
        req.body.fileID = req.query.fileID
        const {id,fileID} = req.body;
        
        
        if(!id || !fileID){
            return next(new AppError("Please provide all the details",400))
        }   

        const fileInfo = await ViewFileInfoApp({
            id:id,
            fileID
        })
 

        const int8array = await ViewFileApp({
            id,
            fileID
        })

        const buffer = await Buffer.from(int8array);

        const type = mime.lookup(fileInfo.name);
        // Get the file signature
       
        if (!type) {
            throw new Error("Couldn't determine the file type of the requested file")
        }


        res.setHeader('Content-Type', type);
        res.setHeader('Content-Disposition', `attachment; filename=${fileInfo.name}`);
        res.setHeader('Content-Length', buffer.length);
        res.setHeader('Content-Transfer-Encoding', 'binary');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        
        
        // // @ts-ignore
        // const stream = fs.createReadStream(null, { buffer });

        // // Pipe the read stream to the response
        // stream.pipe(res);

        res.send(buffer)
        


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}