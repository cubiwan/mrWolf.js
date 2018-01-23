var test = require('../test/rosembrock.js');
var mrWolf = require('./hc.js');

var rosembrock = new test.TestRosembrock();
var model = {
  calculateFitness: rosembrock.calculateFitnessMaximize.bind(rosembrock),
  validateCords: rosembrock.validateCords.bind(rosembrock)
}
var parameters = new mrWolf.HcParameters();
parameters.dimensions = 5;
parameters.cordsMin = [-5, -5, -5, -5, -5];
parameters.cordsMax = [5, 5, 5, 5, 5];
parameters.step = [1, 1, 1, 1, 1];
parameters.stepProb = [0.3,0.3,0.3,0.3,0.3];
parameters.increaseStep = [1.01,1.01,1.01,1.01,1.01];
parameters.maxTimesIncreaseStep = 20;

var hc = new mrWolf.HillClimbing(parameters, model)
for(var i = 0; i < 2000; ++i){
  hc.search();
  console.log("Iteration "+i+" : "+hc.fitness+" "+hc.cords);
}
console.log(hc.cords);
