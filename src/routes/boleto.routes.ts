import { Router } from 'express'
import  consultaBoleoController  from '../app';

const boletoRoutes = Router();


boletoRoutes.get('/:codeBoleto', (req, res) => {
    return consultaBoleoController().handle(req, res);
})

export { boletoRoutes }
