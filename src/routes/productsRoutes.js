import { Router } from 'express';
import * as productsCtrl from '../controllers/productsController';
import { authJwt } from "../middlewares";

const router = Router();

router.get('/', productsCtrl.getProducts);

router.get('/:productId', productsCtrl.getProductById);

router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct);

router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.updateProductById);

router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById);

export default router;