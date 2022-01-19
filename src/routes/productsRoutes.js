import { Router } from 'express';
import * as productsCtrl from '../controllers/productsController';
import { authJwt } from "../middlewares";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           readOnly: true
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The product name
 *         category:
 *           type: string
 *           description: The product category
 *         price:
 *           type: number
 *           description: The product price
 *         imgURL:
 *           type: string
 *           description: The product description
 *         comment:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             text:
 *               type: string
 *             rating:
 *               type: number
 *       example:
 *         id: 619bf93afa572ab1feef11b8
 *         name: Laptop hp
 *         category: laptops
 *         price: 599.99
 *         imgURL: https://m.media-amazon.com/images/I/61cNY70JaZL._AC_SL1500_.jpg
 *         comment: Very good product
 */

/**
  * @swagger
  * tags:
  *   name: Products
  *   description: The products in company API
  */

/**
 * @swagger
 * paths:
 *  /api/products/:
 *      get:
 *          summary: Returns a list of products
 *          tags: [Products]
 *          description: All available products are sent
 *          responses:
 *              '200':
 *                  description: Shipping of all products
 *          content:
 *               application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/Product'
 */
router.get('/', productsCtrl.getProducts);

/**
 * @swagger
 * paths:
 *  /api/products/{productId}:
 *      get:
 *          summary: Returns one product
 *          tags: [Products]
 *          description: The desired object is returned
 *          parameters:
 *            - in: product id
 *              name: productId
 *              description: Product id
 *              schema:
 *                  type: string
 *                  required: true
 *                  description: The product id
 *          responses:
 *              '200':
 *                  description: Product is returned
 */
router.get('/:productId', productsCtrl.getProductById);

/**
 * @swagger
 * paths:
 *  /api/products/:
 *      post:
 *          summary: Create a product
 *          tags: [Products]
 *          description: Create a new product
 *          responses:
 *              '200':
 *                  description: Product created
 */
router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct);

/**
 * @swagger
 * paths:
 *  /api/products/{productId}:
 *      put:
 *          summary: update a product
 *          tags: [Products]
 *          description: The desired object is updated
 *          parameters:
 *            - in: product id
 *              name: productId
 *              description: Product id
 *              schema:
 *                  type: string
 *                  required: true
 *                  description: The product id
 *          responses:
 *              '200':
 *                  description: Product updated
 */
router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.updateProductById);

/**
 * @swagger
 * paths:
 *  /api/products/{productId}:
 *      delete:
 *          summary: delete a product
 *          tags: [Products]
 *          parameters:
 *            - in: product id
 *              name: productId
 *              description: Product id
 *              schema:
 *                  type: string
 *                  required: true
 *                  description: The product id
 *          responses:
 *              '200':
 *                  description: Product deleted
 */
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrl.deleteProductById);

export default router;