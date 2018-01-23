function Differentiation(epsilon){
  this.epsilon = epsilon || 0.001;
  var that = this;
  this.diff = function(x, f){
    //console.log("diff: "+x)
    return (f(x+this.epsilon)-f(x-this.epsilon))/(this.epsilon*2);
  }

  this.diffN = function(n, x, f){
    //console.log("diffN: "+n+" ; "+x);
    if(n == 1)
      return this.diff(x,f);
    else
      return this.diffN(n-1, x, function(x){return that.diff(x,f)});
  }

  this.grad = function(x, f){
    //console.log("grad: "+x)
    return this.gradN(1,x,f);
  }

  this.gradN = function(n, x, f){
    //console.log("Grad: "+x);
    G = [];
    for(var i = 0; i < x.length; ++i){
      var auxX = x.slice(0);
      var fdx = function(x){auxX[i] = x; return f(auxX);}
      G.push(this.diffN(n, auxX[i], fdx));
    }
    return G;
  }
}

var exp = (typeof exports === 'undefined'? this['mrWolf'] = this['mrWolf'] || {}: exports);
exp.Differentiation = Differentiation;
