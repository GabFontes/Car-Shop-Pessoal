import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarController from '../../../controllers/CarController';
import { Request, Response } from 'express';
import { allCars, createdCar, updatedCar } from '../CarMocks'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes Car Controller', () => {
  const carController = new CarController()

  describe('Método create', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(async () => {
      sinon
        .stub(carController.service, 'create')
        .resolves(createdCar);
      res.json = sinon.stub().returns(createdCar);
      res.status = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('Quando é criado um carro corretamente, a função retorna o objeto correto e o status 201', async () => {
      req.body = createdCar;
      const car = await carController.create(req, res);

      expect(car).to.be.deep.equals(createdCar);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.ok;
    });

  });

  describe('Método read', () => {
    const req = {} as Request;
    const res = {} as Response;

    before(async () => {
      sinon
        .stub(carController.service, 'read')
        .resolves(allCars);
      res.json = sinon.stub().returns(allCars);
      res.status = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('A função retorna um array de objetos com todos os carros criados e o status 200', async () => {
      const cars = await carController.read(req, res);

      expect(cars).to.be.deep.equals(allCars);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.ok;
    });

  });

  describe('Método readOne', () => {
    const req = {} as Request<{ id: string }>;
    const res = {} as Response;

    before(async () => {
      sinon
        .stub(carController.service, 'readOne')
        .resolves(allCars[0]);
      res.json = sinon.stub().returns(allCars[0]);
      res.status = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('Quando é passado um id correto, a função retorna o carro corresponte como status 200', async () => {
      req.params = { id: '62c8989d6ed7271452ace435' };
      const car = await carController.readOne(req, res);

      expect(car).to.be.deep.equals(allCars[0]);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.ok;
    });

  });

  describe('Método update', () => {
    const req = {} as Request<{ id: string }>;
    const res = {} as Response;

    before(async () => {
      sinon
        .stub(carController.service, 'update')
        .resolves(updatedCar);
      res.json = sinon.stub().returns(updatedCar);
      res.status = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('Quando é atualizado um carro corretamente, a função retorna um objeto com os dados atualizados e o status 201', async () => {
      req.params = { id: '62c8989d6ed7271452ace435' };
      // req.body = updatedCar;
      const car = await carController.update(req, res);

      expect(car).to.be.deep.equals(updatedCar);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.ok;
    });

  });

  describe('Método delete', () => {
    const req = {} as Request<{ id: string }>;
    const res = {} as Response;

    before(async () => {
      sinon
        .stub(carController.service, 'delete')
        .resolves(allCars[0]);
      res.json = sinon.stub().returns(null);
      res.status = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('Passado um id correto, a função retorna null e o status 204', async () => {
      req.params = { id: '62c8989d6ed7271452ace435' };
      const car = await carController.delete(req, res);

      expect(car).to.be.deep.equals(null);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.ok;
    });

  });

});