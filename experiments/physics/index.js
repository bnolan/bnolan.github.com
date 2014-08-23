/*
var clipsy = require('clipsy')
clipper = new clipsy.Clipper()

var paths = [[{X:-85.53508758544922,Y:33.28777693677941},{X:-85.53508758544922,Y:33.32751625923708},{X:-85.43895721435547,Y:33.32751625923708},{X:-85.43895721435547,Y:33.28777693677941}]];

var delta = 2
var miterLimit = 5
var joinType = 1

offsetResult = clipper.OffsetPolygons(paths, delta, joinType, miterLimit, true);

console.log(offsetResult);

// Scale down coordinates and draw ...
var svg = '<svg style="background-color:#dddddd" width="800" height="800">';
svg += '<path stroke="black" fill="yellow" stroke-width="2" d="' + paths2string(offsetResult, 10.0) + '"/>';
svg += '</svg>';
document.body.innerHTML = svg;

// Converts Paths to SVG path string
// and scales down the coordinates
function paths2string (paths, scale) {
  var svgpath = "", i, j;
  if (!scale) scale = 1;
  for(i = 0; i < paths.length; i++) {
    for(j = 0; j < paths[i].length; j++){
      if (!j) svgpath += "M";
      else svgpath += "L";
      svgpath += ((paths[i][j].X + 90) * scale) + ", " + (paths[i][j].Y * scale);
    }
    svgpath += "Z";
  }
  if (svgpath=="") svgpath = "M0,0";
  return svgpath;
}
*/

var subj_paths = [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
                  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]]; 
var clip_paths = [[{X:50,Y:50},{X:150,Y:50},{X:150,Y:150},{X:50,Y:150}],
                  [{X:60,Y:60},{X:60,Y:140},{X:140,Y:140},{X:140,Y:60}]];

var cpr = new ClipperLib.Clipper();

var scale = 1;
ClipperLib.JS.ScaleUpPaths(subj_paths, scale);
ClipperLib.JS.ScaleUpPaths(clip_paths, scale);

cpr.AddPaths(subj_paths, ClipperLib.PolyType.ptSubject, true);  // true means closed path
cpr.AddPaths(clip_paths, ClipperLib.PolyType.ptClip, true);

var solution_paths = new ClipperLib.Paths();
var succeeded = cpr.Execute(ClipperLib.ClipType.ctUnion, solution_paths, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);

var solution = new ClipperLib.Paths();

function sweepStreet(streetPath){
  var co = new ClipperLib.ClipperOffset(2.0, 0.25);
  var sweptPath = new ClipperLib.Paths();
  var path = new ClipperLib.Paths();
  path[0] = streetPath;
  co.AddPaths(path, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etOpenRound);
  co.Execute(sweptPath, 10);
  return sweptPath;
}

function combineStreets(streetPaths){
  var result = new ClipperLib.Paths();
  var world_path = [[{X:0,Y:0}, {X:180,Y:0}, {X:180,Y:-90}, {X:0,Y:-90}]];

  var memo = streetPaths[0];

  for(i=1;i<streetPaths.length;i++){
    var clipper = new ClipperLib.Clipper();
    result = new ClipperLib.Paths();
    clipper.AddPaths(memo, ClipperLib.PolyType.ptClip, true);
    clipper.AddPaths(streetPaths[i], ClipperLib.PolyType.ptSubject, true);
    clipper.Execute(ClipperLib.ClipType.ctUnion, result);
    memo = result;
  }
  
  // streetPaths.forEach(function(path){
  // });

  return result;
}
var SCALING_FACTOR = 2;

var streetPaths = new ClipperLib.Paths();
streetPaths.push([{X:0,Y:0},{X:180,Y:90}]);
streetPaths.push([{X:0,Y:90},{X:90,Y:0}]);
streetPaths.push([{X:45,Y:90},{X:90,Y:45}]);

console.log(streetPaths);
ClipperLib.JS.ScaleUpPaths(streetPaths, SCALING_FACTOR);
console.log(streetPaths);

streetPaths = streetPaths.map(function(path){
  return sweepStreet(path);
});

// var streetPaths = [
//   sweepStreet([{X:0,Y:0},{X:180,Y:-90}]),
//   sweepStreet([{X:0,Y:-90},{X:90,Y:0}]),
//   sweepStreet([{X:45,Y:-90},{X:90,Y:-45}])
// ];

// streetPaths.map(function(p){
//   ClipperLib.JS.ScaleUpPath(p, 10);
// });

var combinedStreets = combineStreets(streetPaths);

var c = new ClipperLib.Clipper();

var world_path = [[{X:0,Y:0}, {X:180,Y:0}, {X:180,Y:90}, {X:0,Y:90}]];
ClipperLib.JS.ScaleUpPaths(world_path, SCALING_FACTOR);

c.AddPaths(world_path, ClipperLib.PolyType.ptSubject, true);
c.AddPaths(combinedStreets, ClipperLib.PolyType.ptClip, true);
c.Execute(ClipperLib.ClipType.ctDifference, solution);

// console.log(JSON.stringify(solution_paths));

//solution = combinedStreets;

console.log(solution);

var paths = [];

var b2Vec2 = Box2D.Common.Math.b2Vec2
var gravity = new b2Vec2(0, 0); // random(-0.5, 0.5), random(-0.5, 0.5))
var world = new Box2D.Dynamics.b2World(gravity, true);
    
solution.forEach(function(inputPath){
  var path = inputPath.map(function(p){
    return { x : p.X, y : p.Y};
  });

  var fix_def = new Box2D.Dynamics.b2FixtureDef
  fix_def.density = 100
  fix_def.friction = 0.5
  fix_def.restitution = 0

  fix_def.shape = new Box2D.Collision.Shapes.b2PolygonShape

  var body_def = new Box2D.Dynamics.b2BodyDef
  body_def.type = Box2D.Dynamics.b2Body.b2_dynamicBody

  body_def.position.x = 0
  body_def.position.y = 0
  body_def.userData = [123]
  body_def.type = Box2D.Dynamics.b2Body.b2_staticBody;
  var body = world.CreateBody(body_def) // .CreateFixture(fix_def).GetBody()

  Box2DSeparator.separate(body, fix_def, path, 1.0);

  // console.log(Box2DSeparator.validate(path));
});

b2Vec2 = Box2D.Common.Math.b2Vec2
b2BodyDef = Box2D.Dynamics.b2BodyDef
b2Body = Box2D.Dynamics.b2Body
b2FixtureDef = Box2D.Dynamics.b2FixtureDef
b2Fixture = Box2D.Dynamics.b2Fixture
b2World = Box2D.Dynamics.b2World
b2MassData = Box2D.Collision.Shapes.b2MassData
b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
b2DebugDraw = Box2D.Dynamics.b2DebugDraw

body_def = new b2BodyDef
body_def.type = b2Body.b2_dynamicBody
fix_def = new b2FixtureDef
fix_def.density = 1
fix_def.friction = 1
fix_def.restitution = 0

fix_def.shape = new b2CircleShape(2)
fix_def.restitution = 0.4
body_def.position.x = 45
body_def.position.y = -140
body_def.linearDamping = 0.5;
body_def.angularDamping = 0.01;
body_def.userData = 'player'
var playerBody = world.CreateBody(body_def).CreateFixture(fix_def).GetBody();

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var keys = {};

$(document.body).keydown(function(e){
    keys[e.keyCode] = true;
    // e.preventDefault();
})

$(document.body).keyup(function(e){
    keys[e.keyCode] = false;
})

var heading = 0;

setInterval(function(){
  world.Step(1/10, 10, 10)
  world.ClearForces();

  var speed = 0;

  if(keys[39]){
      heading += 3;
  }
  if(keys[37]){
      heading -= 3;
  }
  if(keys[38]){
      speed = 10;
  }
  if(keys[40]){
      speed = -10;
  }

  var rad = heading * 0.0174532925,
    impulse = new b2Vec2(Math.cos(rad) * speed, Math.sin(rad) * speed);

  playerBody.ApplyImpulse(impulse, playerBody.GetPosition());

  // ctx.fillStyle = "#FFFFFF";
  ctx.clearRect(0,0,400,400);

  ctx.fillStyle = "#FFFF00";
  solution.forEach(function(inputPath){

    ctx.moveTo(inputPath[0].X, inputPath[0].Y);
    ctx.beginPath();

    inputPath.forEach(function(p){
      ctx.lineTo(p.X + 10, p.Y + 150);
    });

    ctx.lineTo(inputPath[0].X + 10, inputPath[0].Y + 150);

    ctx.fill();
    ctx.stroke();
  });

  ctx.fillStyle = "#FF0000";
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  ctx.arc(playerBody.GetPosition().x + 10, playerBody.GetPosition().y + 150, 10, rad + Math.PI * 0.75, rad + Math.PI * 1.25);
  ctx.lineTo(playerBody.GetPosition().x + 10, playerBody.GetPosition().y + 150);
  ctx.fill();
  ctx.stroke();

  //console.log(playerBody.GetPosition());
}, 1000 / 60);

// Scale down coordinates and draw ...
var svg = '<svg style="background-color:#dddddd" width="800" height="800">';
svg += '<path stroke="black" fill="yellow" stroke-width="2" d="' + paths2string(solution, 2) + '"/>';
svg += '</svg>';
document.getElementById('svg').innerHTML = svg;

// Converts Paths to SVG path string
// and scales down the coordinates
function paths2string (paths, scale) {
  var svgpath = "", i, j;
  if (!scale) scale = 1;
  for(i = 0; i < paths.length; i++) {
    for(j = 0; j < paths[i].length; j++){
      if (!j) svgpath += "M";
      else svgpath += "L";
      svgpath += ((paths[i][j].X + 90) * scale) + ", " + ((paths[i][j].Y + 180) * scale);
    }
    svgpath += "Z";
  }
  if (svgpath=="") svgpath = "M0,0";
  return svgpath;
}



// var paths = [[{"X":10,"Y":10},{"X":110,"Y":10},{"X":110,"Y":110},{"X":10,"Y":110}]];
// console.log(JSON.stringify(paths));
// ClipperLib.Clipper.ReversePaths(paths);
// console.log(JSON.stringify(paths));
