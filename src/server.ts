import CarController from './controllers/CarController';
import { Car } from './interfaces/CarInterface';
import MotorcycleController from './controllers/MotorcycleController';
import { Motorcycle } from './interfaces/MotorcycleInterface';
import GenericRouter from './routes/Router';
import App from './app';

const server = new App();

const motorcycleController = new MotorcycleController();
const motorcycleRouter = new GenericRouter<Motorcycle>();
const carController = new CarController();
const carRouter = new GenericRouter<Car>();

carRouter.addRoute(carController);
motorcycleRouter.addRoute(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;