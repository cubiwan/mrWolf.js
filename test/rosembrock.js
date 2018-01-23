(function(exports){
exports.TestRosembrock = function(){
  this.calculateFitnessMinimize = function(cords){
    var value = 0;
    for(var i = 0; i < cords.length-1; ++i){
      value += Math.abs(100*Math.pow(cords[i+1]-(cords[i]*cords[i]),2)+Math.pow(cords[i]-1,2));
    }
    return value;
  };

  this.calculateFitnessMaximize = function(cords){
    return (10000*cords.length) - this.calculateFitnessMinimize(cords);
  };

  this.validateCords = function(cords){
      for(var i = 0; i < cords.length; ++i){
        if(cords[i] > 5){
          cords[i] = 5;
        } else if(cords[i] < -5){
          cords[i] = -5;
        }
      }
      return cords;
  };
}
})(typeof exports === 'undefined'? this['mrWolf'] = this['mrWolf'] || {}: exports);
