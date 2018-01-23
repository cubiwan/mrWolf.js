function Experience(K){
  this.fitness = 0;
  this.cords = [];
  this.K = K || 2;

  this.updateFitness = function(fitness, cords){
    if(fitness > this.fitness){
      this.fitness = fitness;
      this.cords =  cords.slice();
    }
  }

  this.velocities = function(birdCords){
    var velocities = [];
    for(var i = 0; i < this.cords.length; ++i){
      velocities[i] = (this.cords[i]-birdCords[i]) * this.K * Math.random();
    }
    return velocities;
  }
}

function Bird(inertia, socialExperience, ownExperience, modelFitness, parameters){
  this.socialExperience = socialExperience;
  this.ownExperience = ownExperience;
  this.parameters = parameters;
  this.modelFitness = modelFitness;
  this.fitness = 0;
  this.cords = [];
  this.velocities = [];
  this.inertia = inertia;

  this.fly = function(){
    this.updateVelocities();
    this.move();
    this.cords = this.modelFitness.validateCords(this.cords);
    this.inertia.update();
    //update fitness
    this.fitness = this.modelFitness.calculateFitness(this.cords);
    //console.log("fitness "+this.fitness);
    this.ownExperience.updateFitness(this.fitness, this.cords);
    this.socialExperience.updateFitness(this.fitness, this.cords);
  }

  //Update cords
  this.move = function(){
    for(var i = 0; i < this.cords.length; ++i){
      this.cords[i] += this.velocities[i];
      //console.log("cords["+i+"] "+this.cords[i]);
    }
  };

  this.updateVelocities = function(){
      var ownExperienceVelocities = this.ownExperience.velocities(this.cords);
      var socialExperienceVelocities = this.socialExperience.velocities(this.cords);
      for(var i = 0; i < this.cords.length; ++i){
        this.velocities[i] = this.inertia.value * this.velocities[i] + ownExperienceVelocities[i] + socialExperienceVelocities[i];
        //console.log("velocities["+i+"] "+this.velocities[i]);
      }
  };

  this.initialize = function(){
    for(var i = 0; i < this.parameters.dimensions; ++i){
      this.cords[i] = (Math.random() * (this.parameters.cordsMax[i]-this.parameters.cordsMin[i]))+this.parameters.cordsMin[i];
      this.velocities[i] = (Math.random() * (this.parameters.velocityMax[i]-this.parameters.velocityMin[i]))+this.parameters.velocityMin[i];
      //console.log("init velocities["+i+"] " +this.velocities[i]);
    }
    this.cords = this.modelFitness.validateCords(this.cords);
    this.fitness = this.modelFitness.calculateFitness(this.cords);
    //console.log("init fitness " +this.fitness);
    this.socialExperience.updateFitness(this.fitness, this.cords);
    this.ownExperience.updateFitness(this.fitness, this.cords);
  };
};

function Flock(parameters, modelFitness){
  this.birds = [];
  this.social = [];
  this.parameters = parameters;

  this.search = function(){
    if(!this.birds[0]){
      this.create();
      return;
    }

    for(var i = 0; i < this.parameters.numberOfBirds; ++i){
      //console.log("bird "+i);
      this.birds[i].fly();
    }
  };

  this.create = function(){
    var socialExperience = new Experience(this.parameters.Ksocial);
    for(var i = 0; i < this.parameters.numberOfBirds; ++i){
      var inertia = new Inertia(this.parameters.inertiaMin, this.parameters.inertiaMin, this.parameters.inertiaChange);
      this.birds[i] = new Bird(inertia, socialExperience, new Experience(this.parameters.Kown), modelFitness, parameters);
      this.birds[i].initialize();
      //console.log("Bird "+i+" initialized");
    }
  };
};

function Inertia(inertiaMin, inertiaMax, inertiaChange){
  this.inertiaMin = inertiaMin || 0;
  this.inertiaMax =  inertiaMax || 1;
  this.inertiaChange = inertiaChange || 0.01;
  this.value = 1;

  this.update = function(){
    if(this.value > this.inertiaMin){
      this.value -= this.inertiaChange;
    }
    if(this.value < this.inertiaMin){
      this.value = this.inertiaMin;
    }
  }
}

function FlockParameters(){
  this.dimensions = 0; //number of cords
  this.cordsMin = []; //min value for cord
  this.cordsMax = []; //max value for cord
  this.velocityMin = []; //max value each cord velocity
  this.velocityMax = []; //min value each cord velocity
  this.inertiaMin = 0; //inertia final value
  this.inertiaMax = 1; //inertia initial value
  this.inertiaChange = 0.01; //
  this.numberOfBirds = 20; //number of birds
  this.Ksocial = 2; //Constant social experience
  this.Kown = 2;  //Constant own experience
}

var exp = (typeof exports === 'undefined'? this['mrWolf'] = this['mrWolf'] || {}: exports);
exp.Flock = Flock;
exp.FlockParameters = FlockParameters;
