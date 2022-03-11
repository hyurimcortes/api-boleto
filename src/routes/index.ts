
import { Router } from 'express';
import { boletoRoutes } from './boleto.routes';


const router = Router();

router.use("/boleto", boletoRoutes);

export default router
