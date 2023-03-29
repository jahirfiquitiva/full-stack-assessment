import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Swagger
 *   description: App's API swagger documentation
 */
const options = {
  swaggerDefinition: {
    basePath: '/api/',
    openapi: '3.0.3',
    info: {
      title: 'Scraper-Backend',
      version: '1.0',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Jahir Fiquitiva',
        url: 'https://jahir.dev',
        email: 'hola@jahir.dev',
      },
    },
  },
  apis: ['./routes/*'],
};

const specs = swaggerJSDoc(options);

router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(specs, { explorer: true }));

/**
 * @swagger
 * path:
 *  /api/docs/swagger.json:
 *    get:
 *      tags: [Swagger]
 *      summary: Get swagger specification in JSON format
 *      requestBody:
 *        required: false
 *      responses:
 *        "200":
 *          description: Swagger specification in JSON format
 */
router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.send(specs);
});

export default router;
