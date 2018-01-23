var mrWolf = require('./differentiation.js')

var diff = new mrWolf.Differentiation();

function xx2(x) { return x*x*2;};

console.log(diff.diff(3, xx2)); //12
console.log(diff.diffN(2,3,xx2)); //4

function xy2(v) { return v[0]*v[1]*2;};

console.log(diff.grad([3,4],xy2)); //[8,6]
console.log(diff.gradN(2,[3,4],xy2)); //[0,0]
