---
layout: post
title: "Positional audio"
---
 
A big part of the VR experience (especially in a headset like the oculus rift) is the ability to talk to other users. With the rift on, you can't see the keyboard, and text overlays look a bit manky anyway (since DK1 is so low resolution), so being able to naturally talk to people is a great idea. So I'd like to have voice chat in my scene-server project.

# Everyone always connected

The brute force way of making this work is making everyone constantly connected to a mixing server that mixes the channels for each avatar and streams it down to your PC, so your client has only one inbound and one outbound connection, and the server does all the mixing. Obviously this will be super expensive for the server, since you'll be processing dozens or hundreds or thousands of connections and then mixing them together. Even if you limit channels so you can only hear anyone within 20 metres, it'll still be expensive, so not keen on this way.

# Auto connect to anyone nearby

Using webRTC and connecting to each other via a STUN server, you can do a direct p2p connection to other clients in the world. This way, your client could just choose the 3 nearest people and auto connect to them, and anything they say you could hear. This is a pretty nice solution since it's relatively automatic.

# UI for 'click to talk'

This is currently my preferred way, in that you walk up to someone, and if you click on them, it'll start a webRTC connection with them and you can start talking to each other, and the connection will last until you're far enough apart to stop talking.

# Positional audio

This is something I haven't been able to find any prototypes of yet, but I'm pretty sure is doable. It's using this [positional audio](http://www.html5rocks.com/en/tutorials/webaudio/positional_audio/) article combined with webRTC so that you can sample the microphone, send it over to another client and then play it back in stereo and faded for the distance away the other person is, to help with immersion. I'm looking forward to having a hack at this.