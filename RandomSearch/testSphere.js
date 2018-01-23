var test = require('../test/sphere.js');
var mrWolf = require('./rs.js');

var sphere = new test.TestSphere();
var model = {
  calculateFitness: sphere.calculateFitnessMaximize.bind(sphere),
  validateCords: sphere.validateCords.bind(sphere)
}
var parameters = new mrWolf.RsParameters();
parameters.dimensions = 5;
parameters.cordsMin = [-10, -10, -10, -10, -10];
parameters.cordsMax = [10, 10, 10, 10, 10];
parameters.step = [1, 1, 1, 1, 1];
parameters.stepProb = [0.4,0.4,0.4,0.4,0.4];
parameters.increaseStep = [0.2,0.2,0.2,0.2,0.2];

var rs = new mrWolf.RandomSearch(parameters, model)
for(var i = 0; i < 2000; ++i){
  rs.search();
  console.log("Iteration "+i+" : "+rs.fitness+" "+rs.cords);
}
console.log(rs.cords);
