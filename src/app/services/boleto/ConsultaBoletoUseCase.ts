import { validateBoletoBancario, validateConcessionaria, clear } from '../../../helpers/index';
import { AppError, AppSuccess } from '../../../helpers/Response';

/**
 * Use Case são serivos independentes e suas regras de negocio na programacao
 *
 */

interface IResponse {
  barCode: any,
  amount: string,
  expirationDate?: string
}

class ConsultaBoletoUseCase {

    constructor(){

    }

    async execute( codeBoleto:string ):Promise<IResponse> {
        const barcode = await clear(codeBoleto);


        if(barcode === undefined) {
            return AppError('Código de barra obrigatório');
        }

        if(barcode.length < 44) {
            return AppError('Seu código barra tem que ser maior que 43');
      }


        return AppSuccess(barcode.length > 44 ?  validateConcessionaria(barcode) : validateBoletoBancario(barcode));
    }

}

export { ConsultaBoletoUseCase }
