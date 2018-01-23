var test = require('../test/sphere.js');
var mrWolf = require('./sa.js');

var sphere = new test.TestSphere();
var model = {
  calculateFitness: sphere.calculateFitnessMinimize.bind(sphere),
  validateCords: sphere.validateCords.bind(sphere)
}
var parameters = new mrWolf.SaParameters();
parameters.dimensions = 5;
parameters.cordsMin = [-10, -10, -10, -10, -10];
parameters.cordsMax = [10, 10, 10, 10, 10];
parameters.step = [1, 1, 1, 1, 1];
parameters.stepProb = [0.3,0.3,0.3,0.3,0.3];

var sa = new mrWolf.SimulatedAnnealing(parameters, model)
while(!sa.finished()){
  sa.search();
  console.log("Temperature: "+sa.temperature + "    fitness: "+sa.fitness);
}
console.log(sa.cords);
