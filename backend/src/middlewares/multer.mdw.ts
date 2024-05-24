import path from "path";

import multer from "multer";

const destination = "upload/"

const upload = function(Storepath=""){
    
  return multer({
    dest: path.join(destination,Storepath),
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 mb in size max limit
    storage: multer.diskStorage({
      destination: (req:any, file:any, cb:any) => {
        cb(null, path.join(destination,Storepath));
      },
      filename: (req:any, file:any, cb:any) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}`+(file.originalname.split(" ")).join("-"));
      },
    }),
    
  });
}



export default upload;
