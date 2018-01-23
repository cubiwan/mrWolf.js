var test = require('../test/rosembrock.js');
var mrWolf = require('./sa.js');

var rosembrock = new test.TestRosembrock();
var model = {
  calculateFitness: rosembrock.calculateFitnessMinimize.bind(rosembrock),
  validateCords: rosembrock.validateCords.bind(rosembrock)
}
var parameters = new mrWolf.SaParameters();
parameters.dimensions = 5;
parameters.cordsMin = [-5, -5, -5, -5, -5];
parameters.cordsMax = [5, 5, 5, 5, 5];
parameters.step = [1, 1, 1, 1, 1];
parameters.stepProb = [0.3,0.3,0.3,0.3,0.3];
parameters.increaseTemperature = true;

var sa = new mrWolf.SimulatedAnnealing(parameters, model)

while(!sa.finished()){
  sa.search();
  console.log("Temperature: "+sa.temperature + "    fitness: "+sa.fitness+ "   cords: "+sa.cords);
}
console.log(sa.cords);
