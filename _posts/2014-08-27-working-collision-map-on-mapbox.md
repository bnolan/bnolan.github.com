---
layout: post
title: "Working collision map on mapbox"
---
 
So this is a total hack, but it works. [Try it out](/experiments/walk-te-aro/). Basically, I've exported the json that represents the static polygons in the physics simulation, and hardcoded the translation functions to convert physics-space to world space. I also hacked up box2d to increase the maximum translation speed (I probably need to scale everything down to do it properly). I also made the streets too wide in the physics. I might go back and fix that. But yeah, you can get a feel for how the game engine might work, with being able to walk up and down streets and side streets. I think it could be a pretty cool game mechanic.