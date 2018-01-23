# Simulated Annealing
Simple implementation of [simulated annealing](https://en.wikipedia.org/wiki/Simulated_annealing) in a continuos space with temperature variable

Load

NodeJS:
```js
var mrWolf = require('./SimulatedAnnealing/sa.js');
```  

Browser:
```html
<script src="./SimulatedAnnealing/sa.js"></script>
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

Adjust parameters:

```js
var parameters = new mrWolf.SaParameters();
parameters.dT = 0.999; //dif Temperature
parameters.initialTemperature = 400; //initial temperature
parameters.finalTemperature = 0.1; //final Temperature
parameters.dimensions = 5; //number of cords
parameters.cordsMin = [-10, -10, -10, -10, -10]; //min value for cord
parameters.cordsMax = [10, 10, 10, 10, 10]; //max value for cord
parameters.step = [1, 1, 1, 1, 1]; //max variation of distance in that dimension when calculate new solution
parameters.stepProb = [0.3,0.3,0.3,0.3,0.3]; //probability of mutation
parameters.increaseTemperature = false //let increased temperature when algorithm is exploring
parameters.Kinc = 0.7; //Factor to control the increase of temperature
```

Create instance:

```js
var sa = new mrWolf.SimulatedAnnealing(parameters, model);
```

Iterate:
```js
while(!sa.finished()){
  sa.search();
  console.log("Temperature: "+sa.temperature + "    fitness: "+sa.fitness);
}
```

And solve your problem:
```js
console.log("Best solution:")
console.log(sa.cords);
```
