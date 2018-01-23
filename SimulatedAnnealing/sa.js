function SimulatedAnnealing(parameters, model){
  this.cords = [];
  this.fitness = Number.MAX_VALUE;
  this.temperature = parameters.initialTemperature;
  this.model = model;
  this.parameters = parameters;

  this.search = function(){
    if(this.temperature > this.parameters.finalTemperature){
      var newCords = this.newSolution(this.cords.slice(0));
      var newFitness = this.model.calculateFitness(newCords);
      if(newFitness < this.fitness){ //New solution is better (less) than stored solution
        this.cords = newCords;
        this.fitness = newFitness;
      } else if(Math.exp((this.fitness-newFitness)/this.temperature) > Math.random()){ //New solution is worse (bigger) than stored solution
        this.cords = newCords;
        if(this.parameters.increaseTemperature){
          var fitnessFactor = (newFitness-this.fitness)/newFitness;
          this.temperature += this.parameters.Kinc*fitnessFactor;
          //console.log("Increase temp "+ this.parameters.Kinc*fitnessFactor );
        }
        this.fitness = newFitness;
      }
      this.temperature *= this.parameters.dT;
      if(this.temperature == Infinity){
        throw new Error("Temperature is Infinity");
      }
    }
    return this.cords;
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

  this.finished = function(){
    return !(this.temperature > this.parameters.finalTemperature);
  }

};


function SaParameters(){
  this.dT = 0.999; //dif Temperature
  this.initialTemperature = 400; //initial temperature
  this.finalTemperature = 0.1; //final Temperature
  this.dimensions = 0; //number of cords
  this.cordsMin = []; //min value for cord
  this.cordsMax = []; //max value for cord
  this.step = [] //max variation of distance in that dimension when calculate new solution
  this.stepProb = [] //probability of mutation
  this.increaseTemperature = false //let increased temperature when algorithm is exploring
  this.Kinc = 0.7; //Factor to control the increase of temperature

}


var exp = (typeof exports === 'undefined'? this['mrWolf'] = this['mrWolf'] || {}: exports);
exp.SimulatedAnnealing = SimulatedAnnealing;
exp.SaParameters = SaParameters;
