---
layout: post
title: "Mapbox GL walking game"
---
 
I discovered [mapbox gl](https://github.com/mapbox/mapbox-gl-js) for the web the other day. It's an awesome library by mapbox that renders vector tiles in the browser using webgl. It's super fast, and allows rotation of the map, which let me prototype something I've been trying to do for ages.

# Walking simulator

I want to make a tourism game, where you walk around a city, collecting photos of places, buying beers at pubs and eating lunch at cafes. It's like an RPG, except it's set in real cities, and you explore by walking the streets. I was thinking something like Game Never Ending. You can use foursquare to populate the places database, panoramio and google street view to show photos of the places (walk past a cool church in Prague, collect a photo and get some in-game points).

# Prototype

This [prototype](/experiments/walk/) shows what I'm thinking in turn of UI, use the arrow keys to walk and turn.

# Physics

I haven't worked out how yet, but in theory, it should be possible to get the vector street data out of the mapbox tiles. I'll then use the jsclipper library to draw a big rectangle over the city and cut out all the streets. Once I've converted the left over polygons into convex polygons, I can use matter.js or box2d to simulate physics (with gravity set to 0), then you should be able to push in any direction and the physics engine will ensure you stay on the streets, without having to aim exactly down the street.

I got jsclipper working generating the concave polygons, but didn't have enough time last night to convert the polys to convex and throw them into box2d. That'll be the task for the weekend.

# Gameplay

I'm quite excited about this game, since it lets you simulate trips to cities that you might never be able to visit (a real problem down here in New Zealand, where it's at least 30 hours to Europe). I'll probably make the game run at 1 second = 1 minute, has in-game currency for buying things. I'd also like to make it multiplayer, so that if someone else is exploring Wellington at the same time as you, you'll see them walk past you. Anyway. I've had these ideas for a while, it's exciting that mapbox GL let's me prototype them.