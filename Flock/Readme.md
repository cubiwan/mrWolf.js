# flock.js
Particle swarm optimization

Load

NodeJS:
```js
var mrWolf = require('./Flock/flock.js');
```  

Browser:
```html
<script src="./Flock/flock.js"></script>
```

Create one class with two functions:

```js
var fitness = function(){
  this.calculateFitness = function(cords){
    ...
  };

  this.validateCords = function(cords){
    ...
  };
}
```

Adjust parmeters:

```js
var parameters = new mrWolf.FlockParameters();
parameters.dimensions = 5; //number of cords
parameters.cordsMin = [-5, -5, -5, -5, -5]; //min value for cord
parameters.cordsMax = [5, 5, 5, 5, 5]; //max value for cord
parameters..velocityMin = [-1, -1, -1, -1, -1]; //max value each cord velocity
parameters.velocityMax = [1, 1, 1, 1, 1]; //min value each cord velocity
parameters.inertiaMin = 0; //inertia final value
parameters.inertiaMax = 1; //inertia initial value
parameters.inertiaChange = 0.01; //drecrease inertiaMax each iteration until inertiaMax < inertiaMin
parameters.numberOfBirds = 20; //number of birds
parameters.Ksocial = 2; //Constant social experience
parameters.Kown = 2;  //Constant own experience
```

Create flock:

```js
var flock = new mrWolf.Flock(parameters, fitness);
flock.create();
```

Throw to fly:
```js
for(var i = 0; i < 5000; ++i){
  flock.search();
  console.log("Iteration "+i+" : "+flock.birds[0].socialExperience.fitness);
}
```

And solve your problem:
```js
console.log("Best solution:")
console.log(flock.birds[0].socialExperience.fitness);
for(var i = 0; i < flock.birds[0].socialExperience.cords.length; ++i){
  console.log(flock.birds[0].socialExperience.cords[i]);
}
```
