import { ConsultaBoleoController } from "./controllers/boleto/ConsultaBoletoController";
import { ConsultaBoletoUseCase } from "./services/boleto/ConsultaBoletoUseCase";


/**
 * Injeção de dependencias modo manual
 * Onde UseCase->Controller
 */


export default ():ConsultaBoleoController =>{

const consultaBoletoUseCase = new ConsultaBoletoUseCase();
const consultaBoleoController = new ConsultaBoleoController(consultaBoletoUseCase);

return consultaBoleoController;

}
