import { NextFunction ,Request,Response} from "express"
import AppError from "../../utils/errorClass"
import { ViewFileApp } from "../../appwrite/storage/viewItem";
import { ViewFileInfoApp } from "../../appwrite/storage/getFileInfo";
import mime from "mime"
import fs from "fs"

export const ExFuncFileView = async (req:any,res:Response,next:NextFunction)=>{
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

        const buffer = Buffer.from(int8array);

        const type = mime.lookup(fileInfo.name);
       
        if (!type) {
            throw new Error("Couldn't determine the file type of the requested file")
        }

if (!type.includes("video")){
    res.setHeader('Content-Type', type);
    // res.setHeader('Content-Disposition', `attachment; filename=${fileInfo.name}`);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Content-Transfer-Encoding', 'binary');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.send(buffer)
}
else{
    const range = req.headers.range;
    const videoSize = buffer.length;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;

        const chunkSize = (end - start) + 1;
        const videoChunk = buffer.slice(start, end + 1);

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4",
        };
        

        res.writeHead(206, headers);
        res.end(videoChunk, 'binary');
    } else {
        const headers = {
            "Content-Type": "video/mp4",
            "Content-Length": videoSize,
        };
        
        res.writeHead(200, headers);
        res.end(buffer, 'binary');
    }
}

        


    }catch(e:any){
        return next(new AppError(e.message,400))
    }
}