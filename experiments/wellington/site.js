mapboxgl.accessToken = getAccessToken();

var map = new mapboxgl.Map({
    container: 'map',
    zoom: 17.5,
    center: [-41.293768, 174.775417],
    style: '/experiments/wellington/style.json',
    hash: false,
    interactive : true
});

map.addControl(new mapboxgl.Navigation());

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.clearRect(0,0,400,400);
ctx.strokeStyle = "#FF0000";
  
$("#canvas").hide();

var Physics = function(){
    this.streets = [];
    this.gravity = new Box2D.Common.Math.b2Vec2(0, 0);
    this.world = new Box2D.Dynamics.b2World(this.gravity, true);
    this.heading = 180;
}

Physics.prototype.addStreet = function(street){
    // expect integer [ {x,y} ] vertices in range 0..4096
    this.streets.push(street);
}

function sweepStreet(streetPath, streetWidth){
  var co = new ClipperLib.ClipperOffset(2.0, 0.25);
  var sweptPath = new ClipperLib.Paths();
  var path = new ClipperLib.Paths();
  path[0] = streetPath.map(function(vertex){
    return { X : vertex.x, Y : vertex.y};
  });
  co.AddPaths(path, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etOpenRound);
  co.Execute(sweptPath, streetWidth);
  return sweptPath;
}

function combineStreets(streetPaths){
  var memo = streetPaths[0];

  for(i=1;i<streetPaths.length;i++){
    var clipper = new ClipperLib.Clipper();
    var result = new ClipperLib.Paths();
    clipper.AddPaths(memo, ClipperLib.PolyType.ptClip, true);
    clipper.AddPaths(streetPaths[i], ClipperLib.PolyType.ptSubject, true);
    clipper.Execute(ClipperLib.ClipType.ctUnion, result);
    memo = result;
  }
  
  return memo;
}

function cutoutStreets(combinedStreets){
  var c = new ClipperLib.Clipper();
  var tileOutline = [[{X:0,Y:0}, {X:4096,Y:0}, {X:4096,Y:4096}, {X:0,Y:4096}]];
  var solution = new ClipperLib.Paths();

  c.AddPaths(tileOutline, ClipperLib.PolyType.ptSubject, true);
  c.AddPaths(combinedStreets, ClipperLib.PolyType.ptClip, true);
  c.Execute(ClipperLib.ClipType.ctDifference, solution);

  return solution;
}

Physics.prototype.createPolygons = function(streetWidth){
  var t1 = Date.now();

  streetPaths = this.streets.map(function(path){
    return sweepStreet(path, streetWidth);
  });
  console.log("#sweepStreet %dms", Date.now() - t1);
  t1 = Date.now();

  var combinedStreets = combineStreets(streetPaths);
  console.log("#combineStreets %dms", Date.now() - t1);
  t1 = Date.now();

  this.polygons = cutoutStreets(combinedStreets);
  console.log("#cutoutStreets %dms", Date.now() - t1);
  t1 = Date.now();

  return this.polygons;
}

Physics.prototype.addPolygonsToWorld = function(scale){
  var self = this;

  this.polygons = this.polygons.filter(function(inputPath){
    var fixDef = new Box2D.Dynamics.b2FixtureDef;
    fixDef.density = 100;
    fixDef.friction = 0.5;
    fixDef.restitution = 0;
    fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape;

    var bodyDef = new Box2D.Dynamics.b2BodyDef;
    bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
    // These could be the mercator offset of the parent tile at the current zoom level
    // (might cause precision issues)
    bodyDef.position.x = 0;
    bodyDef.position.y = 0;

    var body = self.world.CreateBody(bodyDef)

    var path = inputPath.map(function(p){
      return { x : p.X * scale, y : p.Y * scale};
    });

    try{
      Box2DSeparator.separate(body, fixDef, path, 1.0);
      return true;
    }catch(e){
      // aww shit the convexifier doesn't like these paths :(
      //
      // minimal failure case - please to debug:
      //
      // [{"x":483,"y":1176},{"x":596,"y":1220},{"x":551,"y":1345},{"x":490,"y":1321},{"x":487,"y":1320},{"x":446,"y":1314},{"x":415,"y":1315},{"x":399,"y":1317},{"x":397,"y":1285},{"x":386,"y":1131}] 

      // console.log(Box2DSeparator.validate(path));
      // console.log(JSON.stringify(path));
      return false;
    }
  });
}

Physics.prototype.addPlayer = function(x, y, radius){
  var fixDef = new Box2D.Dynamics.b2FixtureDef;
  fixDef.density = 1
  fixDef.friction = 1
  fixDef.restitution = 0.4
  fixDef.shape = new Box2D.Collision.Shapes.b2CircleShape(radius);

  var bodyDef = new Box2D.Dynamics.b2BodyDef;
  bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
  bodyDef.position.x = x;
  bodyDef.position.y = y;
  bodyDef.linearDamping = 0.5;
  bodyDef.angularDamping = 0.01;
  // bodyDef.userData = 'player';

  this.playerBody = this.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
}

Physics.prototype.renderStreets = function(ctx, scale){
    this.streets.forEach(function(path){
        ctx.moveTo(path[0].x * scale, path[0].y * scale);
        ctx.beginPath();
        path.forEach(function(p){
            ctx.lineTo(p.x * scale, p.y * scale);
        });
        ctx.stroke();
    });
}

Physics.prototype.renderPolygons = function(ctx, scale){
  ctx.fillStyle = "#cccccc";
  ctx.strokeStyle = "#333333";

  this.polygons.forEach(function(inputPath){
    ctx.moveTo(inputPath[0].X * scale, inputPath[0].Y * scale);
    ctx.beginPath();
    inputPath.forEach(function(p){
      ctx.lineTo(p.X * scale, p.Y * scale);
    });
    ctx.lineTo(inputPath[0].X * scale, inputPath[0].Y * scale);
    ctx.fill();
    ctx.stroke();
  });
}

Physics.prototype.renderPlayer = function(ctx, scale){
  ctx.fillStyle = "#FF0000";
  ctx.strokeStyle = "#000000";

  var rad = this.heading * 0.0174532925;

  ctx.beginPath();
  ctx.arc(this.playerBody.GetPosition().x * scale, this.playerBody.GetPosition().y * scale, 10, rad + Math.PI * 0.75, rad + Math.PI * 1.25);
  ctx.lineTo(this.playerBody.GetPosition().x * scale, this.playerBody.GetPosition().y * scale);
  ctx.fill();
  ctx.stroke();
}

// Fixme, setTimeout sucks..
setTimeout(function(){
  var physics = new Physics;

  map.featuresAt([0,0], { geometry : true, radius : 10000 }, function(err, features) {
      if (err) throw err;
      
      features.forEach(function(f){
          if(f._bucket.match(/road.+/)){
              physics.addStreet(f._geometry[0]);
          }
      })

      $("canvas").show();
      $("div,center").hide();

      physics.createPolygons(20);
      physics.addPolygonsToWorld(1.0);
      physics.addPlayer(800,100,5);

      setInterval(function(){
        ctx.clearRect(0,0,800,800);
        physics.renderPolygons(ctx, 0.2);
        physics.renderPlayer(ctx, 0.2);
      }, 1000 / 10);

      setInterval(function(){
        var t1 = Date.now();

        var speed = 0;

        if(keys[39]){
          physics.heading += 5;
        }
        if(keys[37]){
          physics.heading -= 5;
        }
        if(keys[38]){
            speed = 100;
        }
        if(keys[40]){
            speed = -100;
        }

        var rad = physics.heading * 0.0174532925,
          impulse = new Box2D.Common.Math.b2Vec2(Math.cos(rad) * speed, Math.sin(rad) * speed);
        
        physics.playerBody.ApplyImpulse(impulse, physics.playerBody.GetPosition());
        physics.world.Step(1/10, 10, 10)
        physics.world.ClearForces();

        var t2 = Date.now() - t1;

        if(t2 > 1000 / 60 + 5){
          console.log("%dms", t2);
        }
      }, 1000 / 60);
  });
}, 5000);

var keys = {};

$(document.body).keydown(function(e){
    keys[e.keyCode] = true;
})

$(document.body).keyup(function(e){
    keys[e.keyCode] = false;
})

var heading = 0,
    position = {
        latitude : -41.293768,
        longitude : 174.775417
    };

function getAccessToken() {
  return "pk.eyJ1IjoiYm5vbGFuIiwiYSI6IlMwVWcwQm8ifQ.UsO8Pl7OfIqsqKMz0MCiIQ";
}
