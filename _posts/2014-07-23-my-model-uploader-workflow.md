---
layout: post
title: "My model uploader workflow"
---
 
I've been doing quite a bit of work on metaverse.sh (there's no site there are the moment) lately, trying to get the model uploader workflow going.

One of the things I want to make really easy in metaverse.sh is adding content to the world. So what I've got at the moment, is you use first person controls to move around the world, and at any stage, you can drag and drop a collada `.dae` model into the world and it'll get uploaded and appear right in front of you (and will also appear in the world of anyone else connected to the server).

# Prototype

I prototyped all the bits together, and it worked. Basically, on `dragover`, I place a big transparent (input type="upload") over the scene. Then when you drop the file, I use a jQuery `$.ajax` call to upload the image the the *assetserver*. The assetserver is a node.js app that takes the upload, does some checks to make sure it's not too big, then hands the upload off to a ruby script that does more inspection, unzips the upload (collada models require external textures, so you zip the model and textures altogether to upload them), and then fires up blender and runs a script.

# Blender script

The blender script deletes all items from the scene, then imports the collada model using blender API calls. It then iterates over all the models in the scene to get a vertex, edge and poly count, and construct a bounding box around the entire mesh. It then uses the threejs exporter script to write out a `.js` version of the model. I also write out some data in json format that is passed back to the node.js script.

# Model checks

The basic checks I'm going to do on a model are:

* Polycount - don't allow models with more than 10k triangles in the main world
* Size - autoscale models when added to the world, so they can't be bigger than 50m on a side

I might also do some model fingerprinting so that if people upload material that they want to copy protect, that is possible

# Back to node

The model and it's textures (converted to .png using mogrify) are then moved to a public folder where they can be hosted, the models data is updated with the vertex count, and the model is saved to a postgresql database. The model is now ready to be served. At this stage, the upload process is finished, and the model data is returned to the client.

# Add element to the world

The client then calls `addElement` over the websocket connection to the server. This adds the model (referenced by id at the moment, since the world server shares a database with the assetserver) to the world, reflects the model to anyone else in the world, and persists the model to the database, so that the model is stil there when the world server restarts.

It's all pretty hinky at the moment, but I'm enjoying the challenge of making a large javascript project.