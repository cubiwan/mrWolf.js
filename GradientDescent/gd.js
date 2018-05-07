function GradientDescent(parameters, model, diff){
  this.model = model;
  this.cords = [];
  this.fitness = Number.MAX_VALUE;
  this.parameters = parameters;
  this.step = this.parameters.step;
  this.numberIncreaseSteps = 0;

  this.search = function(){
    var newCords = this.newSolution(this.cords.slice(0));
    var newFitness = this.model.calculateFitness(newCords);
    //console.log("fitness: "+this.fitness + " new fitness "+newFitness);
    if(newFitness < this.fitness){
      this.cords = newCords;
      this.fitness = newFitness;
    } else {
      this.parameters.step *= this.parameters.reduceStep;
    }
  };

  this.newSolution = function(cords){
    cords = cords || [];
    if(cords.length == 0){
      for(var i = 0; i < this.parameters.dimensions; ++i){
        cords[i] = (Math.random() * (this.parameters.cordsMax[i]-this.parameters.cordsMin[i]))+this.parameters.cordsMin[i];
      }
    }else{
      var grad = diff.grad(cords, this.model.calculateFitness);
      //console.log("grad: "+grad);
      for(var i = 0; i < this.parameters.dimensions; ++i){
        cords[i] -= this.parameters.step*grad[i]
      }
      //console.log("new cords: "+cords);
    }
    return this.model.validateCords(cords);
  }

};

function GdParameters(){
  this.dimensions = 0; //number of cords
  this.cordsMin = []; //min value for cord
  this.cordsMax = []; //max value for cord
  this.step = 0.1 // calculate newSolution = solution-step*grad
  this.reduceStep = 0.9; // reduce step each time fitness value not decreased
};

var exp = (typeof exports === 'undefined'? this['mrWolf'] = this['mrWolf'] || {}: exports);
exp.GradientDescent = GradientDescent;
exp.GdParameters = GdParameters;
