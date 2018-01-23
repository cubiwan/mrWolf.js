# Hill Climbing
Simple implementation of [hill climbing](https://en.wikipedia.org/wiki/Hill_climbing) in a continuos space with step size variable and steepest neighbour

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
var parameters = new b.Parameters();
parameters.dimensions = 5; //number of cords
parameters.cordsMin = [-10, -10, -10, -10, -10]; //min value for cord
parameters.cordsMax = [10, 10, 10, 10, 10]; //max value for cord
parameters.step = [1, 1, 1, 1, 1]; //max variation of distance in that dimension when calculate new solution
parameters.stepProb = [0.3,0.3,0.3,0.3,0.3]; //probability of mutation
parameters.neighbors = 10; //number of neighbors visited in each iteration
parameters.maxTimesIncreaseStep = 0 //max number of times the steps are increased, avoid steps increase until infinity or almost 0
parameters.increaseStep = [0.1,0.1,0.1,0.1,0.1]; //increase (or decrease) step size when no found a better solution (step[i] = step[i]*increaseStep[i])
```

Create instance:

```js
var hc = new b.HillClimbing(parameters, model)
```

Iterate:
```js
for(var i = 0; i < 5000; ++i){
  hc.search();
  console.log("Iteration "+i+" : "+hc.fitness);
}
```

And solve your problem:
```js
console.log("Best solution:")
console.log(hc.cords);
```

More examples:
[Sphere function](https://github.com/cubiwan/mrWolf.js/blob/master/HillClimbing/testSphere.js) ,
[Rosenbrock function](https://github.com/cubiwan/mrWolf.js/blob/master/HillClimbing/testRosenbrock.js)
