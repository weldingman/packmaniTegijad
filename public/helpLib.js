var moving = {
  u:false,
  d:false,
  r:false,
  l:false,
  s:false,
  w:false,
  save:false,
  load:false
};

var testLib = {


  genRandEvent: function(prob){
    prob = prob/100;
    if(random() <= prob){
      return true;
    }
    return false;
  },

  circCircColl: function(c1, c2){
    var a = {
      x:c1.x,
      y:c1.y
    }
    var b = {
      x:c2.x,
      y:c2.y
    }
    var dist = this.calcDist(a, b);
    if(dist <= c1.r / 2 + c2.r / 2){
      return true;
    }
    return false;
  },

  calcDist: function(a, b){
    var dist = sqrt(((b.x - a.x) * (b.x - a.x)) + ((b.y - a.y) * (b.y - a.y)));
    return dist;
  },

  circRectCol: function(circle, rectIn, mode){
    var rectA = {
      x: rectIn.x,
      y: rectIn.y,
      w: rectIn.w,
      h: rectIn.h
    };
    var tempR = circle.r;
    if(mode){
      var tempR = circle.r/2;
    }
    //rect(rectA.x, rectA.y, rectA.w, rectA.h);
    //ellipse(circle.x, circle.y, circle.r * 2, circle.r * 2);
    var circleDistance = {
      x: abs(circle.x - rectA.x),
      y: abs(circle.y - rectA.y)
    };

    // if distance along x is greater than half scuare dist and circle radius
    // then it's deffinetly can't be colliding
    if (circleDistance.x > (rectA.w/2 + tempR)) { return false; }
    // if distance along y is greater than half scuare dist and circle radius
    // then it's deffinetly can't be colliding
    if (circleDistance.y > (rectA.h/2 + tempR)) { return false; }

    // if it hasn't returned false check if circle is close inaf to rect
    // check's for collision along y axis
    if (circleDistance.x <= (rectA.w/2)) { return true; }
    // check's for collision along x axis
    if (circleDistance.y <= (rectA.h/2)) { return true; }

    // checks for corner collisions
    var cornerDistance_sq = Math.pow((circleDistance.x - rectA.w/2),2) +
                         Math.pow((circleDistance.y - rectA.h/2),2);

    return (cornerDistance_sq <= Math.pow(tempR,2));
  },

  rectRectCol: function(rectA, rectB){
    return (rectA.x < rectB.x + rectB.w && rectA.x + rectA.w > rectB.x &&
    rectA.y < rectB.y + rectB.h && rectA.y + rectA.h > rectB.y);
  },

  checkWalls: function(wall, pcMan){
    var wallIsPresent = {
      l:false,
      r:false,
      u:false,
      d:false
    };
    var tresh = 3;
    if(pcMan.x < wall.x + wall.w && pcMan.x + tresh > wall.x + wall.w && pcMan.y <= wall.y + wall.h && pcMan.y + pcMan.h >= wall.y){
      wallIsPresent.l = true;
    }
    if(pcMan.x + pcMan.w > wall.x &&  pcMan.x + pcMan.w - tresh < wall.x && pcMan.y <= wall.y + wall.h && pcMan.y + pcMan.h >= wall.y){
      wallIsPresent.r = true;
    }
    if(pcMan.y < wall.y + wall.h && pcMan.y + tresh > wall.y + wall.h && pcMan.x <= wall.x + wall.w && pcMan.x + pcMan.w >= wall.x){
      wallIsPresent.u = true;
    }
    if(pcMan.y + pcMan.h > wall.y &&  pcMan.y + pcMan.h - tresh < wall.y && pcMan.x <= wall.x + wall.w && pcMan.x + pcMan.w >= wall.x){
      wallIsPresent.d = true;
    }
    //console.log(wallIsPresent);
    return wallIsPresent;
  },

  keys: function(){
    document.onkeydown = function(event){
      //console.log(event.keyCode);
      if(event.keyCode === 68 || event.keyCode === 39)   //d
        moving.r = true;
      else if(event.keyCode === 83 || event.keyCode === 40)   //s
    		moving.d = true;
      else if(event.keyCode === 65 || event.keyCode === 37) //a
    		moving.l = true;
      else if(event.keyCode === 38) // w
    		moving.u = true;
      else if(event.keyCode === 32) // space
        moving.s = true;
      else if(event.keyCode === 88) // x
        moving.save = true;
      else if(event.keyCode === 76) // l
        moving.load = true;
      else if(event.keyCode === 87) // w
      	moving.w = true;
      }
      document.onkeyup = function(event){
    		if(event.keyCode === 68 || event.keyCode === 39)    //d
    			moving.r = false;
    		else if(event.keyCode === 83 || event.keyCode === 40)   //s
    		  moving.d = false;
    		else if(event.keyCode === 65 || event.keyCode === 37) //a
    			moving.l = false;
    		else if(event.keyCode === 87 || event.keyCode === 38) // w
    			moving.u = false;
        else if(event.keyCode === 32) // space
          moving.s = false;
        else if(event.keyCode === 88) // x
          moving.save = false;
        else if(event.keyCode === 76) // l
          moving.load = false;
        else if(event.keyCode === 87) // w
          moving.w = false;
        }

        return moving;
  }
}
