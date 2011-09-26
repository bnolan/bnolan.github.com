---
layout: post
title: Webkit Transform
---

I was quite taken with these [isometric minecraft renders](http://www.minecraftforum.net/topic/37409-mcmap-isometric-renders-sspsmp-18-support/), so I decided to dig out some of my old game code and try and build an isometric renderer...

<img src="/images/webkit-transform.png" />
<cite>A little 3d world</cite>

That is created using webkit transforms, the minecraft textures. The heightmap is some perlin noise that I same via getImageData. Now to add some collision detection so you can walk around the world.