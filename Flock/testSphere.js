var test = require('../test/sphere.js');
var mrWolf = require('./flock.js');

var sphere = new test.TestSphere();
var model = {
  calculateFitness: sphere.calculateFitnessMaximize.bind(sphere),
  validateCords: sphere.validateCords.bind(sphere)
}
var parameters = new mrWolf.FlockParameters();
parameters.dimensions = 5;
parameters.cordsMin = [-10, -10, -10, -10, -10];
parameters.cordsMax = [10, 10, 10, 10, 10];
parameters.velocityMin = [-1, -1, -1, -1, -1];
parameters.velocityMax = [1, 1, 1, 1, 1];
parameters.inertiaChange = 0.05;

var flock = new mrWolf.Flock(parameters, model)
for(var i = 0; i < 1000; ++i){
  flock.search();
  console.log("Iteration "+i+" : "+flock.birds[0].socialExperience.fitness)
}
console.log("Best solution:")
console.log(flock.birds[0].socialExperience.fitness);
for(var i = 0; i < flock.birds[0].socialExperience.cords.length; ++i){
  console.log(flock.birds[0].socialExperience.cords[i]);
}
