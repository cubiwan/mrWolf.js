var test = require('../test/rosembrock.js');
var differentiation = require('../NumericalDifferentiation/differentiation.js');
var mrWolf = require('./gd.js');

var diff = new differentiation.Differentiation();
var rosembrock = new test.TestRosembrock();
var model = {
  calculateFitness: rosembrock.calculateFitnessMinimize.bind(rosembrock),
  validateCords: rosembrock.validateCords.bind(rosembrock)
}
var parameters = new mrWolf.GdParameters();
parameters.dimensions = 5;
parameters.cordsMin = [-5, -5, -5, -5, -5];
parameters.cordsMax = [5, 5, 5, 5, 5];
parameters.step = 0,01;

var gd = new mrWolf.GradientDescent(parameters, model, diff);
for(var i = 0; i < 2000; ++i){
  gd.search();
  console.log("Iteration "+i+" : "+gd.fitness+" "+gd.cords);
}
console.log(gd.cords);
