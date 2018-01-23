(function(exports){
exports.TestSphere = function(){
  this.calculateFitnessMinimize = function(cords){
    var value = 0;
    for(var i = 0; i < cords.length; ++i){
      value += cords[i]*cords[i];
    }
    return value;
  };

  this.calculateFitnessMaximize = function(cords){
    return (100*cords.length) - this.calculateFitnessMinimize(cords);
  };

  this.validateCords = function(cords){
      for(var i = 0; i < cords.length; ++i){
        if(cords[i] > 10){
          cords[i] = 10;
        } else if(cords[i] < -10){
          cords[i] = -10;
        }
      }
      return cords;
  };
}
})(typeof exports === 'undefined'? this['mrWolf'] = this['mrWolf'] || {}: exports);
