var test = require('../test/rosembrock.js');
var mrWolf = require('./flock.js');

var rosembrock = new test.TestRosembrock();
var model = {
  calculateFitness: rosembrock.calculateFitnessMaximize.bind(rosembrock),
  validateCords: rosembrock.validateCords.bind(rosembrock)
}
var parameters = new mrWolf.FlockParameters();
parameters.dimensions = 5;
parameters.cordsMin = [-5, -5, -5, -5, -5];
parameters.cordsMax = [5, 5, 5, 5, 5];
parameters.velocityMin = [-1, -1, -1, -1, -1];
parameters.velocityMax = [1, 1, 1, 1, 1];
parameters.inertiaChange = 0.05;

var flock = new mrWolf.Flock(parameters, model)
for(var i = 0; i < 2000; ++i){
  flock.search();
  console.log("Iteration "+i+" : "+flock.birds[0].socialExperience.fitness)
}
console.log("Best solution:")
console.log(flock.birds[0].socialExperience.fitness);
for(var i = 0; i < flock.birds[0].socialExperience.cords.length; ++i){
  console.log(flock.birds[0].socialExperience.cords[i]);
}
