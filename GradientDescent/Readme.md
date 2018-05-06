# Gradient Descent
Simple implementation of gradient descent

Load

NodeJS:
```js
var mrWolf = require('./GradientDescent/gd.js');
var differentiation = require('../NumericalDifferentiation/differentiation.js');
```  

Browser:
```html
<script src="./GradientDescent/gd.js"></script>
<script src="./NumericalDifferentiation/differentiation.jss"></script>

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

Create a instance of NumericalDifferentiation

```js
var diff = new differentiation.Differentiation();
```

Adjust parameters:   

```js
var parameters = new mrWolf.GdParameters();
parameters.dimensions = 0; //number of cords
parameters.cordsMin = [-5,-5,-5,-5,-5]; //min value for cord
parameters.cordsMax = [5,5,5,5,5]; //max value for cord
parameters.step = 0.1 // calculate newSolution = solution-step*grad
this.reduceStep = 0.9; // reduce step each time fitness value not decreased
}
```

Create instance:

```js
var gd = new mrWolf.GradientDescent(parameters, model, diff);
```

Iterate:
```js
for(var i = 0; i < 1000; ++i){
  gd.search();
  console.log("Iteration "+i+" : "+gd.fitness+" "+gd.cords);
}
```

And solve your problem:
```js
console.log("Best solution:")
console.log(gd.cords);
```
