const createdCar = {
  doorsQty: 2,
  seatsQty: 2,
  model: 'Fusca',
  status: true,
  year: 1999,
  color: 'red',
  buyValue: 25000
};

const updatedCar = {
  doorsQty: 10,
  seatsQty: 20,
  model: 'Uno da firma com escada',
  status: true,
  year: 2010,
  color: 'black',
  buyValue: 9999999
};

const allCars = [
  {
    _id: '62c8989d6ed7271452ace435',
    doorsQty: 2,
    seatsQty: 2,
    model: 'Fusca',
    status: true,
    year: 1999,
    color: 'red',
    buyValue: 25000
  },
  {
    _id: '62c898f26ed7271452ace439',
    doorsQty: 2,
    seatsQty: 4,
    model: 'Uno da firma com escada',
    status: true,
    year: 2010,
    color: 'red',
    buyValue: 20000
  },
  {
    _id: '62c899716ed7271452ace43c',
    doorsQty: 2,
    seatsQty: 2,
    model: 'Opala',
    status: true,
    year: 1979,
    color: 'red',
    buyValue: 84900
  }
];

export { allCars, createdCar, updatedCar }