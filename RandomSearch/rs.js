function RandomSearch(parameters, model){
  this.model = model;
  this.cords = [];
  this.fitness = Number.MIN_VALUE;
  this.parameters = parameters;
  this.step = this.parameters.step;
  this.numberIncreaseSteps = 0;
  this.search = function(){
    var newCords = this.newSolution(this.cords.slice(0));
    var newFitness = this.model.calculateFitness(newCords);
    if(newFitness > this.fitness){
      this.cords = newCords;
      this.fitness = newFitness;
      this.step = this.parameters.step;
      this.numberIncreaseSteps = 0;
    } else {
      this.numberIncreaseSteps++;
      if(this.numberIncreaseSteps < this.parameters.maxTimesIncreaseStep){
        for(var i = 0; i < this.parameters.dimensions; ++i){
          this.step[i] *= this.parameters.increaseStep[i];
        }
      }
      //console.log("step size:" + this.step+ " || "+this.numberIncreaseSteps);
    }
  };

  this.newSolution = function(cords){
    cords = cords || [];
    if(cords.length == 0){
      for(var i = 0; i < this.parameters.dimensions; ++i){
        cords[i] = (Math.random() * (this.parameters.cordsMax[i]-this.parameters.cordsMin[i]))+this.parameters.cordsMin[i];
      }
    }else{
      for(var i = 0; i < this.parameters.dimensions; ++i){
        if(Math.random() < this.parameters.stepProb[i]){
          cords[i] += (Math.random() * (this.parameters.step[i]*2))-this.parameters.step[i];
        }
      }
    }
    return this.model.validateCords(cords);
  }

};

function RsParameters(){
  this.dimensions = 0; //number of cords
  this.cordsMin = []; //min value for cord
  this.cordsMax = []; //max value for cord
  this.step = [] //max variation of distance in that dimension when calculate new solution
  this.stepProb = [] //probability of mutation
  this.increaseStep = [] //increase (or decrease) step size when no found a better solution (step[i] = step[i]*increaseStep[i])
  this.maxTimesIncreaseStep = 0 //max number of times the steps are increases, avoid steps increase until infinity or almost 0
}



var exp = (typeof exports === 'undefined'? this['mrWolf'] = this['mrWolf'] || {}: exports);
exp.RandomSearch = RandomSearch;
exp.RsParameters = RsParameters;
