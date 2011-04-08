---
layout: post
title: Native maps speed in Javascript
---

Whenever I use [OpenLayers](http://openlayers.org/) or even [Tile5](http://www.tile5.org/), it annoys me that no matter how much you optimize your javascript code, your html5 map will never be as smooth and fluid as the native iphone maps app. I decided to try and fix that today.

[This demo](/experiments/nativemaps/) is only a proof of concept, but if you try it on an iphone (even my 1st generation iphone), you'll see that it pans as quickly as the native client. It uses:

* A 60fps interval to update the map position
* Damped map velocity movement (flicking)
* Translate3d to use hardware acceleration
* Suppresses touch events and user-select events to prevent the user interaction slowdown
* Zepto.js for event management

I'm discussing with Damon from tile5 to get this code put into tile5 (since writing an entire javascript mapping library isn't on the cards for me today), but I wanted to show the performance that javascript mapping libraries should be aiming for.