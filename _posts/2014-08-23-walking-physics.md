---
layout: post
title: "Walking physics"
---
 
I've done some more work on trying to make a walking simulator on openstreetmap data. I used jsclipper to draw a big rectangle, then extruded the streetlines and cut them out of the rectangle, then turned the polygons into convex hulls and loaded them into box2d. [See here](/experiments/physics/) for a demonstartion.