---
layout: post
title: "Physics, hulls and cannon.js"
---
 
As part of my exploring metaverse stuff lately, I've been thinking of ways I could make some cash moneys off the technology I've built. One of the first ideas I've come across, is to make a walk-through visualizer for architectural models. So as well as providing a global metaverse where anyone can upload art, also have private workspaces where people can place models and walk through them with their clients.

# Collision detection

This is where the problem is. I'm pretty sure I can get cycles light-baking working (the hardest part imo is automatic UV mapping), so I can do a lightmap for the 3d model (it's amazing how good a cheap sketchup model looks when you put it through a proper GI renderer - that was one of my takeaway lessons from working at [Indigo](http://indigorenderer.com/)). But having a model is all well and good, you eventually want to be able to walk around the model.

# Fly throughs

Currently I don't have any collision detection or physics in my 3d world, at the moment you basically fly around the world at ground level, using mouselook and WASD keys. Although this is okay, I think it'd be much more interesting to have proper level physics so you can walk up and down stairs, not walk through walls etc.

# Bullet physics

I've used [bullet physics](http://bulletphysics.org/wordpress/) before. One of my early metaverse simulations was a c++ app that ran bullet physics, and reflected the simulation state over websockets, letting you send lua commands to the world to add elements to the simulation. So I took a quick look at ammo.js, which is an emscription compilation of bullet to javascript. My biggest concern with ammo is just it's size, it's 1.2mb of uncompressed javascript, and 400kb compressed. I'm guessing that's going to totally kill mobile devices (which is a platform I don't want to rule out just yet).

# Cannon.js

[Cannon](http://cannonjs.org/) is a little pure javascript physics library. It's pretty cool, and has a few first person shooter demos, including a nice voxel one where you can shoot spheres around the world. The simulation seems pretty fast and reasonably accurate. I suspect it's not as good as bullet, since it's a much younger project, but it seems good enough to try out.

The first problem I came up with cannon is that it doesn't support triangle meshes (see [this issue](https://github.com/schteppe/cannon.js/issues/43)). I asked @schteppe about this, and he said that most games end up using convex hulls (convex polyhedrons, sometimes called brushes by game designers) as the collision model, instead of using the mesh directly.

# Creating convex hulls

The typical way a game designer creates a set of convex hulls to represent level geometry, is to draw it by hand, or manipulate the visual geometry by decimating and simplifiyng the meshes until you have a low res set of hulls to collide against. I want to avoid this if possible, since my target demographic probably aren't game designers, so I need some automatic way of generating the collision geometry.

# Hierarchical Approximate Convex Decomposition

I found the [HACD library](http://kmamou.blogspot.co.nz/2011/10/hacd-hierarchical-approximate-convex.html) while searching for automatic methods to convert meshes into a set of convex hulls. After a 5 minute play around (it was getting late), I couldn't work out how what parameters to tweak to generate an accurate mesh. For example, this is a model of the barcelona pavillion - there's way too much approximation going on, making the collision set useless.

<img src="/images/hacd.png" />
<cite>Barcelona pavillion processed with HACD</cite>

# Next steps

The way I see it - there are two things I can do from here. One is to keep playing with the HACD library and try and work out how to more accurately model the 3d models I send for processing. The demos included with the HACD library are pretty impressive, involving lots of complex concave shapes, so I suspect I just have my dimensions, or export process (I'm currently going sketchup to blender to meshconv to .off) incorrect. Anyway, the other option which is equally valid, would be to add trimesh support to cannon.js.

@schteppe said that he doesn't really believe in triangle meshes, because they have "bad performance and need small timesteps to function properly", which may be true, but bullet supports trimeshes for static objects, and it'd be a fun challenge adding trimesh support for static objects to cannon.js, so I might have a go at doing that next week. We'll see.

Either way, my next goal is to have a lightmapped, collision detected model of the barcelona pavillion for people to walk around.

addendum: The last thing I could do would be to write a custom physics library that basically just does collision detection using rays. This is an okay solution, and I could probably reuse a lot of the three.js ray-triangle intersection code, but I'd rather have a proper physics engine to be honest.