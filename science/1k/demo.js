var h = [[1,0],[2,0],[0,1],[3,1],[3,2],[2,3],[1,4],[0,5]];
var g = [[1,1],[2,1],[0,2],[1,2],[2,2],[0,3],[1,3],[0,4]];

size = 600;
mul = 50;
offset=300;
rotation=0;

w = document.getElementById("c");
w.width = w.height = size;
c = w.getContext("2d");

color = function(i){
  var r = parseInt($r * 255 * i);
  var g = parseInt($g * 255 * i);
  var b = parseInt($b * 255 * i);
  c.fillStyle = "rgb(" + [r,g,b].join(",") + ")";
//  console.log("rgb(" + [r,g,b].join(",") + ")");
}

func = function(v){
  x = v[0];
  y = v[1];
  z = 0;

  function d(x,y,z){
    xt=x*Math.cos(rotation)-z*Math.sin(rotation);
    yt=y;
    zt=x*Math.sin(rotation)+z*Math.cos(rotation);
    
    xt = xt * mul + offset;
    yt = yt * mul + offset;
    
    console.log(xt,yt);
    c.lineTo(xt,yt); //
    // +ofsx,j2*mul+ofsy)
  }

  c.beginPath();

  color(Math.cos(rotation) / 3 + 0.3);

  d(x,y-3,z);
  d(x+1,y-3,z);
  d(x+1,y-2,z);
  d(x,y-2,z);
  
  c.closePath();
  c.fill();

  c.beginPath();

  color(1.0);

  d(x,y-2,z);
  d(x,y-2,z+1);
  d(x,y-3,z+1);
  d(x,y-3,z);

  c.closePath();
  c.fill();
};

draw = function(){
  rotation = rotation + 0.07;
  
  c.fillStyle = "#000";
  c.fillRect(0, 0, size, size);

  $r = $g = $b = 1;
  h.map(func);

  $g = 0; $b = 0.7;
  g.map(func);
  setTimeout(draw, 22)
}

draw();