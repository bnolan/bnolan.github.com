var clipsy = require('./index')
clipper = new clipsy.Clipper()

var paths = [[{X:-85.53508758544922,Y:33.28777693677941},{X:-85.53508758544922,Y:33.32751625923708},{X:-85.43895721435547,Y:33.32751625923708},{X:-85.43895721435547,Y:33.28777693677941}]];

var delta = 5
var miterLimit = 5
var joinType = 1

offsetResult = clipper.OffsetPolygons(paths, delta, joinType, miterLimit, true);

console.log(offsetResult);

/*

var subj_paths = [[{X:10,Y:10},{X:110,Y:10},{X:110,Y:110},{X:10,Y:110}],
                  [{X:20,Y:20},{X:20,Y:100},{X:100,Y:100},{X:100,Y:20}]]; 
var clip_paths = [[{X:50,Y:50},{X:150,Y:50},{X:150,Y:150},{X:50,Y:150}],
                  [{X:60,Y:60},{X:60,Y:140},{X:140,Y:140},{X:140,Y:60}]];

var cpr = new clipsy.Clipper();

var scale = 100;
ClipperLib.JS.ScaleUpPaths(subj_paths, scale);
ClipperLib.JS.ScaleUpPaths(clip_paths, scale);

cpr.AddPaths(subj_paths, ClipperLib.PolyType.ptSubject, true);  // true means closed path
cpr.AddPaths(clip_paths, ClipperLib.PolyType.ptClip, true);

var solution_paths = new ClipperLib.Paths();
var succeeded = cpr.Execute(ClipperLib.ClipType.ctUnion, solution_paths, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);

// console.log(JSON.stringify(solution_paths));

// Scale down coordinates and draw ...
var svg = '<svg style="background-color:#dddddd" width="160" height="160">';
svg += '<path stroke="black" fill="yellow" stroke-width="2" d="' + paths2string(solution_paths, scale) + '"/>';
svg += '</svg>';
document.getElementById("svgcontainer").innerHTML = svg;

*/