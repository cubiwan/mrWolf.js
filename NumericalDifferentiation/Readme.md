# Numerical Differentiation
Simple implementation of numerical differentiation

Create one class with two functions:

```js
var diff = new mrWolf.Differentiation(epsilon);
```

Creates a new Differentiation object. Uses epsilon to aproximate derivative _f(x+epsilon)-f(x-epsilon)/epsilon*2_  
Default values of epsilon is 0.001.

```js
diff(x, f);
```

Calculate derivative of function f in point x

```js
diffN(n, x, f);
```

Calculate n derivative of function f in point x

```js
grad(x[], f);
```

Calculate gradient of function f in point x[]

```js
diffN(n, x[], f);
```

Calculate n gradient of function f in point x[]

Example:

```js
var mrWolf = require('./differentiation.js')

var diff = new mrWolf.Differentiation();

function xx2(x) { return x*x*2;};

console.log(diff.diff(3, xx2)); //12
console.log(diff.diffN(2,3,xx2)); //4

function xy2(v) { return v[0]*v[1]*2;};

console.log(diff.grad([3,4],xy2)); //[8,6]
console.log(diff.gradN(2,[3,4],xy2)); //[0,0]
```
