var test = require('../test/sphere.js');
var differentiation = require('../NumericalDifferentiation/differentiation.js');
var mrWolf = require('./gd.js');

var diff = new differentiation.Differentiation();
var sphere = new test.TestSphere();
var model = {
  calculateFitness: sphere.calculateFitnessMinimize.bind(sphere),
  validateCords: sphere.validateCords.bind(sphere)
}
var parameters = new mrWolf.GdParameters();
parameters.dimensions = 5;
parameters.cordsMin = [-10, -10, -10, -10, -10];
parameters.cordsMax = [10, 10, 10, 10, 10];
parameters.step = 0,1;

var gd = new mrWolf.GradientDescent(parameters, model, diff);
for(var i = 0; i < 1000; ++i){
  gd.search();
  console.log("Iteration "+i+" : "+gd.fitness+" "+gd.cords);
}
console.log(gd.cords);
