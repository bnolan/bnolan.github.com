---
layout: post
title: "Tweening with obelisk"
---
 
While working on the isometric viewer for `mv-world`, I added some basic tweening to obelisk using tween.js.

You can see the code [here](https://github.com/bnolan/isometric-test/blob/master/app/src/packets.coffee) in the packet processor. I'm pretty sure this is the wrong place to be doing animation, but basically the idea is...

# 2 hertz network updates

So we get two network positional updates per second. This is currently hard coded, but in the future, should be calculated by measuring the number of updates per second (as the server may throttle you if there's too much going on, or your network connection is a bit rubbish).

# Store positional data as a THREE.Vector

I'm trying to write the scene / node code in a way that can be extracted into a bower / node module for creating headless, isometric, text-only and 3d clients for the mv-server. To that end, I'm storing everything as a three vector.

# Using Tween with THREE.Vector

Tween doesn't support using the Vector3 class directly, so I have a little `onUpdate` helper that converts an object with {x,y,z} attributes into a proper vector, that is then set on the scene element.

    tween.to( { x : @positionX, y : @positionY, z : @positionZ }, 500).
      easing(TWEEN.Easing.Linear.None).
      onUpdate( -> element.position = new THREE.Vector3(@x, @y, @z)).
      start()

# Render loop reads from the scene element

Obelisk doesn't have it's own scene graph, you just call `pixelView.renderObject` on each element. It doesn't even actually do it's own depth sorting, hopefully that'll be added. So for the render loop, I just iterate over every element in the scene and call render, converting the three.js vector into a obelisk pointer. I had some performance issues originally, but after I talked to Max (the obelisk maintainer) he told me not to create the obelisk objects in the render loop and now I can render several hundred elements at 60fps on my macbook.