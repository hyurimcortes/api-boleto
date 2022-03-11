import { Request, Response } from 'express';
import { ConsultaBoletoUseCase } from "../../services/boleto/ConsultaBoletoUseCase";


/**
 * Controller responsavel apenas para receber requisicao e da resposta
 */


class ConsultaBoleoController {

    constructor(private consultaBoletoUserCase:ConsultaBoletoUseCase){

    }

     async handle(request:Request, response:Response): Promise<Response>{
        const { codeBoleto } = request.params;
        const all = await this.consultaBoletoUserCase.execute(codeBoleto);
        return response.status(200).json(all);

    }

}

export { ConsultaBoleoController }
