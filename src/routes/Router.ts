import { Router } from 'express';
import GenericController from '../controllers/GenericController';

export default class GenericRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: GenericController<T>,
    route: string = controller.route,
  ) {
    this.router.get(route, controller.read);
    this.router.get(`${route}/:id`, controller.readOne);
    this.router.post(route, controller.create);
    this.router.delete(`${route}/:id`, controller.delete);
    this.router.put(`${route}/:id`, controller.update);
  }
}
