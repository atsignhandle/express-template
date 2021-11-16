process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import express, { Router } from 'express';
import jwt from 'express-jwt';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { environment } from './environment';

export interface Routes {
  path?: string;
  router: Router;
}

export class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  static db: any;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
  }

  public listen() {
    try {
      this.app.listen(environment.port, () => {
        console.info(`=================================`);
        console.info(`======= ENV: ${this.env} =======`);
        console.info(`🚀 App listening on the port ${environment.port}`);
        console.info(`=================================`);
      });
    } catch (e: any) {
      console.error(`app listen encountered:${e.message}`);
    }
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(jwt({ secret: environment.jwtSecret, algorithms: ['HS256'] }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }
}
