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
    if(newFitness < this.fitness){
      this.cords = newCords;
      this.fitness = newFitness;
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
      console.log("grad: "+grad);
      for(var i = 0; i < this.parameters.dimensions; ++i){
        cords[i] -= this.step*grad[i]
      }
    }
    return this.model.validateCords(cords);
  }

};

function GdParameters(){
  this.dimensions = 0; //number of cords
  this.cordsMin = []; //min value for cord
  this.cordsMax = []; //max value for cord
  this.step = 0.1 // calculate newSolution = solution-step*grad
};

var exp = (typeof exports === 'undefined'? this['mrWolf'] = this['mrWolf'] || {}: exports);
exp.GradientDescent = HillClimbing;
exp.GdParameters = HcParameters;
