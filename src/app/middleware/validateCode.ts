import { NextFunction, Request , Response } from 'express';


export async function validateCode(request:Request, response:Response, next: NextFunction) {


    try{

      const { codeBoleto } = request.params

      console.log(codeBoleto)

   /*     if(!codeBoleto){
         return { "error":"Codigo boleto é obrigatório", "number":"401" }
     } */

     next();

    }catch{
        return { "error":"Processo Invalido"}
    }


}
