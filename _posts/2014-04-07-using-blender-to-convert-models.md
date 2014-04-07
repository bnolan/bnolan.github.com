---
layout: post
title: "Using blender to convert models"
---
 
So I got the [world server](http://github.com/bnolan/mv-server/) working for my 3d world project. You can reliably connect from the client which is currently using obelisk.js to render an isometric overview of the world. I also added [script](https://github.com/bnolan/mv-server/blob/master/scenes/hello.xml) element to the scene, so you can script an animation on the server, and it'll get replicated out to all the connecting clients. 

I don't have any online demos for this stuff yet, because I can't decide on what domain name I want to use for this. The current architecture I'm thinking of:

# Node.js world server

An opensource world server that runs in plain (with optional native models for linux servers) that anyone can run. It loads a `scene.xml` scene description, and can serialize it's state back out to xml at any stage when you want to save out the current world state.

# Isometric world viewer

This viewer uses obelisk (or something similair) to view the world. You don't have an avatar in this world, but you can authenticate with the world server and modify the world. It's basically a minimal world for testing the client side viewer code. The client code will be shared with the three.js viewer.

# Three.js viewer

A fully featured viewer that uses three.js to provide a first person experience in the world. Will have oculus rift, positional audio and webgl support.

The javascript for both the viewers will run on a central server, so that you can embed world viewers on your webpage, in a similar way to how you can use the google maps api anywhere.

# Asset server

This will run on a similar server, and will allow uploading of many different types of models, convert those models into a three.js compatible model format, and upload the models to a CDN so that world servers can quickly refer to the models. This server will use various binary tools to convert meshes, sanitize and rasterize them. To this end, I started writing some blender scripts to import different model formats, render an image of them, rescale them so they are 1 unit in size in the longest dimension (I'm picturing a world where all the models are normalized to the same size, and you specify a scale parameter when you add the model to the world to set the size of the model), and then output the 3d model file.

Out of the box blender seems to support `collada`, `3ds`, `obj`, `stl`, `x3d` and obviously `blend` files. I haven't finished my normalizer / converter / importer, but there is a [gist](https://gist.github.com/bnolan/10016675) of what I've managed so far. The blender api isn't very well documented. :(