import { NextFunction ,Request,Response} from "express"


export type ErrorType = {
    message:string,
    status:number
}

type ResponseType = {
    success:boolean,
    resp:(string | object)

}

const errMdw = (err:ErrorType,_req:Request,res:Response,next:NextFunction)=>{
    let message: String = err.message
    try{
        message = JSON.parse(err.message)

    }catch(e){
        null
    }

    const statusCode : number = err.status

    let success = true;
    if(statusCode >= 400 && statusCode < 500){
        success = false
    }

    const response:ResponseType = {
        success,
        resp:message
    }

    res.status(statusCode).json(response)
}

export default errMdw