export interface User{
    name:string;
    email:string;
    password:string;
    rePassword:string;
    dateOfBirth:string;
    gender:string;
}
export interface Data{
    token:string;
    tokenType:string;
    expiresIn:string;
    user:string;
}
export interface IAuthReponse{
    success:boolean;
    message:string;
    data: Data
}