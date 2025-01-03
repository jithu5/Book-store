export class ApiResponse{
    constructor(statusCode,data, message){
        this.success = statusCode<400 ;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }
}