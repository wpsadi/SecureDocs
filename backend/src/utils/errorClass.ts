export default class AppError extends Error{
    constructor(public message: string,public status:number){
        super(message);
        this.status = status || 500;
        Error.captureStackTrace(this,this.constructor)
    }
}