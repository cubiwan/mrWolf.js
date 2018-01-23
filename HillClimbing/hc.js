function HillClimbing(parameters, model){
  this.model = model;
  this.cords = [];
  this.fitness = Number.MIN_VALUE;
  this.parameters = parameters;
  this.step = this.parameters.step;
  this.numberIncreaseSteps = 0;
  this.search = function(){
    var newCords = this.newSolution(this.cords.slice(0));
    var newFitness = this.model.calculateFitness(newCords);
    var newVarition = (auxFitness-this.fitness)/this.distance(newCords, this.cords); //dif_fitness/distance
    for(var i = 1; i < this.parameters.neighbors; ++i){
      var auxCords = this.newSolution(this.cords.slice(0));
      var auxFitness = this.model.calculateFitness(newCords);
      var auxVariation = (auxFitness-this.fitness)/this.distance(auxCords, this.cords);
      if(auxVariation > newVarition){
        newCords = auxCords;
        newFitness = auxFitness;
        newVarition = auxVariation;
      }
    }
    //console.log("newFitness "+newFitness+"   fitness "+this.fitness);
    //console.log("newCords "+newCords+"   cords "+this.cords);
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

  //returns distance^2 (save time don't calculating square root)
  this.distance = function(cordsA, cordsB){
    var dist = 0;
    for(var i = 0; i < cordsA[i].length; ++i){
      dist += Math.pow(cordsA[i]-cordsB[i], 2);
    }
    return dist;
  }

  this.newSolution = function(cords){
    cords = cords || [];
    if(cords.length == 0){
      for(var i = 0; i < this.parameters.dimensions; ++i){
        cords[i] = (Math.random() * (this.parameters.cordsMax[i]-this.parameters.cordsMin[i]))+this.parameters.cordsMin[i];
      }
    }else{
      for(var i = 0; i < this.parameters.dimensions; ++i){
        if(Math.random() < this.parameters.stepProb[i]){
          cords[i] += (Math.random() * (this.step[i]*2))-this.step[i];
        }
      }
    }
    return this.model.validateCords(cords);
  }

};

function HcParameters(){
  this.dimensions = 0; //number of cords
  this.cordsMin = []; //min value for cord
  this.cordsMax = []; //max value for cord
  this.step = [] //max size (max variation of distance) of the step
  this.stepProb = [] //probability of mutation
  this.increaseStep = [] //increase (or decrease) step size when no found a better solution (step[i] = step[i]*increaseStep[i])
  this.maxTimesIncreaseStep = 0 //max number of times the steps are increases, avoid steps increase until infinity or almost 0
  this.neighbors = 10; //number of neighbors visited in each iteration
}

var exp = (typeof exports === 'undefined'? this['mrWolf'] = this['mrWolf'] || {}: exports);
exp.HillClimbing = HillClimbing;
exp.HcParameters = HcParameters;
