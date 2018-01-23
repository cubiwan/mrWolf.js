var test = require('../test/sphere.js');
var mrWolf = require('./hc.js');

var sphere = new test.TestSphere();
var model = {
  calculateFitness: sphere.calculateFitnessMaximize.bind(sphere),
  validateCords: sphere.validateCords.bind(sphere)
}
var parameters = new mrWolf.HcParameters();
parameters.dimensions = 5;
parameters.cordsMin = [-10, -10, -10, -10, -10];
parameters.cordsMax = [10, 10, 10, 10, 10];
parameters.step = [1, 1, 1, 1, 1];
parameters.stepProb = [0.3,0.3,0.3,0.3,0.3];

var hc = new mrWolf.HillClimbing(parameters, model)
for(var i = 0; i < 2000; ++i){
  hc.search();
  console.log("Iteration "+i+" : "+hc.fitness+" "+hc.cords);
}
console.log(hc.cords);
