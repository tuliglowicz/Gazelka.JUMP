module.exports = ( global ) => {
  global.String.prototype.reverse = function () {
    return this.split('').reverse().join('');
  };
  global.String.prototype.r = global.String.prototype.repeat;

  global.f = 'f';
  global.F = 'F';
  global.R = 'R';
  global.L = 'L';
  global.T45 = 'T45';
  global.T_45 = 'T-45';

  global.m = o => 'm' + o;
  global.M = o => 'M' + o;
  global.T = o => 'T' + o;
  global.C = o => 'C' + o;

  rad = (a) => a*Math.PI/180
  global.cos = (a) => Math.cos( rad(a) )
  global.sin = (a) => Math.sin( rad(a) )
  global.tan = (a) => Math.tan( rad(a) )

};


//   function b(x,y,r, ctx) {
//   /*
//     P_0 = (0,1), P_1 = (c,1), P_2 = (1,c), P_3 = (1,0)
//     P_0 = (1,0), P_1 = (1,-c), P_2 = (c,-1), P_3 = (0,-1)
//     P_0 = (0,-1), P_1 = (-c,-1), P_3 = (-1,-c), P_4 = (-1,0)
//     P_0 = (-1,0), P_1 = (-1,c), P_2 = (-c,1), P_3 = (0,1)
//     with c = 0.551915024494.
//   */

//   var c = 0.551915024494*r; //  ctx.moveTo(150, 200);

//   var jedenX = x+r;
//   var jedenY = y+r;
//   var mJedenX = x-r;
//   var mJedenY = y-r;

//   ctx.moveTo(x,jedenY);
//   ctx.bezierCurveTo(x+c,jedenY,jedenX,y+c,jedenX,y);
//   ctx.bezierCurveTo(jedenX,y-c,x+c,mJedenY,x,mJedenY);
//   ctx.bezierCurveTo(x-c,mJedenY,mJedenX,y-c,mJedenX,y);
//   ctx.bezierCurveTo(mJedenX,y+c,x-c,jedenY,x,jedenY);
// }