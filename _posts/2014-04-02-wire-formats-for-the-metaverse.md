---
layout: post
title: "Wire formats for the metaverse"
---
 
I've been spending my free time working on some metaverse style projects. This has been kicked off by two things:

* [Nick](http://indigorenderer.com/) visiting for a few weeks and talking about the metaverse over beers
* Borrowing [JDs](http://mindscape.com/) oculus rift and seeing what VR might become

So I started off by writing a little word simulator in c++, using the bullet physics engine and lua, and a client using three.js that connected to the world and saw a big shared virtual world. This was all pretty cool, but I'm not a proficient c++ developer, so I decided to try hacking up a world server using node.js, since it's easier for other people to hack on, and it's a fast prototyping language.

# A wire protocol

I'm using websockets as the communication layer, and I was trying to come up with a wire protocol that's nice and fast for representing the movement of a bunch of avatars and physics-simulated blocks in realtime. I was looking at doing 10fps from the server, and having the client interpolate these.

The simplest data format (a packet representing movement of a 3d object) is:

    { 
      id : uint32
      positionX : float64
      positionY : float64
      positionZ : float64
      eulerX : uint8
      eulerY : uint8
      eulerZ : uint8
    }
    
I decided to express rotation as three euler angles compressed into a byte, using 3 bytes, instead of 4 * float32s of a quaternion, since its easy to convert eulers to quaternions in three.js, and I saw that the minecraft protocol does this also. In retrospect, i'd probably encode the eulers as uint16s, to give a bit more accuracy on larger models, but who knows. I'd also prefer to use float32s for the position, since my worlds are all going to be quite small and you'll always be near the origin, but nick recommended float64's, and that's what msgpack seems to use by default so it's ok by me.

# JSON

First up, I tried encoding the movement packets as json, which is pretty fast, but super space inefficent (since you're sending floats as strings).

# Custom encoding

Then I wrote a custom encoder / decoder using dataviews that writes out a binary representation of the packet. This is fine, except it means you have to write customer encoder / decoders for each packet type that you have, plus with the fixed-sized packet format I was using, it wasn't possible to encode strings, which would mean falling back to json for any packet with a string embedded (which might be a model url, message from one user to another, etc).

# Msgpack

I wrote my custom encoder, thought it was pretty cool, and was just about to turn it into a npm module, when I decided to have a quick look at what other binary wire protocols there are, and I found msgpack. Msgpack is pretty cool, it converts a javascript object (or array in my case) into a binary representation that is quite efficient. It seems to use float64s for floats, and bytes for values in the range 0-255.

# Performance

After reading a bit, I had heard bad things about the performance of msgpack, so I decided to write a [script to test the performance](https://gist.github.com/bnolan/9926889) of the different encodings. 

    Json...
      * benchmark took 7 seconds and 35 ms
      * average size of packet stream is 260097
    Msgpack...
      * benchmark took 5 seconds and 209 ms
      * average size of packet stream is 125770
    Custom...
      * benchmark took 7 seconds and 312 ms
      * average size of packet stream is 106240

Unsurprisingly, my custom encoder was the most concise format on the wire, since it just writes out a two-byte packet header and then all the fields. JSON was the largest. But the biggest surprise was that msgpack (using the node module which calls out to c) was the fastest to encode the packets, as well as having a wire format that was only 20% larger than my custom method.

# Performance in the browser?

I haven't tested performance in the browser, but I'm guessing that msgpack won't be as efficient there, since it doesn't have a native module, however it packs the messages into byte-sized chunks, and doesn't have to do individual bit twiddling to get the message out, so I think performance should be fine. It's the server that's really going to struggle if it has multiple concurrent users anyway.

So I think i've decided on msgpack.

# Windows

I'm still undecided about this, but I thought it'd be cool to write the world server in node in such a way that it can be run on windows boxes without requiring a cygwin environment, ie use native javascript modules instead of binary ones. Msgpack has a pure javascript implementation, and i'm using xmldom instead of libxml. This means that if windows users won't to try creating their own 3d worlds and serving them up via node, they are able to (without having to fire up a linux vm).