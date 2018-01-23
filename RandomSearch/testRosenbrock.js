var test = require('../test/rosembrock.js');
var mrWolf = require('./rs.js');

var rosembrock = new test.TestRosembrock();
var model = {
  calculateFitness: rosembrock.calculateFitnessMaximize.bind(rosembrock),
  validateCords: rosembrock.validateCords.bind(rosembrock)
}
var parameters = new mrWolf.RsParameters();
parameters.dimensions = 5;
parameters.cordsMin = [-5, -5, -5, -5, -5];
parameters.cordsMax = [5, 5, 5, 5, 5];
parameters.step = [1, 1, 1, 1, 1];
parameters.stepProb = [0.3,0.3,0.3,0.3,0.3];
parameters.increaseStep = [0.999,0.999,0.999,0.999,0.999];
parameters.maxTimesIncreaseStep = 30;

var rs = new mrWolf.RandomSearch(parameters, model)
for(var i = 0; i < 2000; ++i){
  rs.search();
  console.log("Iteration "+i+" : "+rs.fitness+" "+rs.cords);
}
console.log(rs.cords);
