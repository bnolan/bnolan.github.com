---
layout: post
title: "Scene server"
---
 
So the last few weeks I've been experimenting with various multi-user 3d environment things. I originally started with a c++ app that uses bullet physics and websockets to provide a shared 3d world where anyone can drop blocks into the world and they physically interact, and the results are streamed out to all the connected clients and rendered using three.js.

At some point I decided to [rewrite everything in node.js](https://github.com/bnolan/mv-server), for ease of hacking, but keep using technology that could be rewritten in c++ at some point if I decided to. The current goal is to build something where:

 * you can see other avatars in the world with you
 * server admins can upload collada .dae art into the world
 * anyone can host their own node server
 * there is a central oauth server for verifying users user names
 
I'm not sure all of these are important, and it's missing the thing that I most wanted, which was to let anyone be able to drag and drop a collada model into the world, but I haven't worked out all the permission stuff yet about how that would work (for example, you'd have to have moderators to delete all the penis models, and how do you prevent people dropping a huge box over the entire world so that you couldn't see anything?).

# Node server

The node [world server](https://github.com/bnolan/mv-server) is written using mostly pure javascript modules, so that in theory it can be run on windows boxes without a cygwin build environment. It's currently got a handful of tests, and is running on travis-ci. 

The idea behind the world server, is that you write a scene in xml, which describes all the 3d models in the scene as [nodes](https://github.com/bnolan/mv-server/blob/master/lib/node.coffee), where they are, what their rotation and scale is, and then fire up the server. The server loads the scene file, then listens for websocket connections. Anyone who connects to the server then sends up their current location in the world and an `Observer` object is created. The server then sends any objects within the observers visible radius to the client.

The initial [introduction](https://github.com/bnolan/mv-server/blob/master/lib/packets.coffee#L1) of an node to an observer is by sending the xml description of the node. After the initial introduction, the observer only gets updated if a node moves in the world (maybe it's subject to physics, or is being animated by a script in the world). These update packets are a lot smaller, since they only include position and rotation squashed down.

All the messages are encoded via msgpack.

# Viewers

I'm currently working on a basic [obelisk.js](https://github.com/nosir/obelisk.js/) powered client that just shows the location of all the boxes and models in the world, as a debugging tool and example of a minimal client. The real target however, is to port some of my three.js-powered viewers over to the new protocol, so that you can have an oculus-rift-capable viewer for 3d scenes that are served via the node server.

# Avatars

The next thing to add will be avatars, so that you can see other people experiencing the world at the same time as you. Then we'll have a proper multi-user 3d space which will be cool.