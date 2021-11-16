import { Router } from 'express';
import { IndexController } from '../controllers/index';
import { Routes } from '../app';

export class IndexRoute implements Routes {
  public path = '/';
  public type = 'index';
  public version = 'v1';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/${this.version}.${this.type}.generateMnemonic`, this.indexController.index);
  }
}
