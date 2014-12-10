---
layout: post
title: "SceneVR, multiuser 3D"
---
 
[SceneVR](//scenevr.com) is my node.js + webgl project that lets you easily create 3d scenes that you can experience with multiple people at once. It uses node.js and websockets to provide a server. The server loads [html-like](http://www.scenevr.com/scene.html) scene descriptions and lets you script interactions, so that the scene can respond to people in the scene. The cool thing is, that everything is simulated on the server, so every connected client sees the same thing. This makes it easy to write multi-user experiences (games, demos, toys), just code it once in xml + javascript, and everyone can connect to it and play with it.

It's an open source (bsd licensed) project and is up on [github](//github.com/bnolan/scenevr). I don't have a live demo of it yet, because I'm still nailing down a few things before I stick it up on heroku or nodejitsu. Because the hosting is a bit different from normal node.js apps, I'd like to make a hosting service that specializes in serving sceneVR scenes.

The `virtualreality` folder on my macbook has had lots of activity over the past 6 months, but it was only during a holiday to visit [Rissa](//twitter.com/ristari)s family in Brisbane in early November that I decided to have a crack at building a high quality scene server in node.js, and knock up a quick web client to view the scenes. It came together pretty fast, using [dom-lite](https://www.npmjs.com/package/dom-lite), htmlparser2 and websockets.

## Current state

Currently SceneVR is pre-release. I've got a milestone set up in github, and once I've closed all those issues, I should be good to start showing it off to more people. I really want to make a good video that demos everything you can do in SceneVR, since there's a lot to demo (realtime reload, index files, javascript, multiple clients, physics models, model import, lightmaps, audio).

## Oculus rift support

The rift is supported in webVR browsers (chromium and firefox nightly). It's not 100% yet, but works pretty well. I test things in webVR regularly, and it helps me remember to make sure everything is rendered at a reasonable size, that the player moves at a reasonable speed, and that the html-textures aren't too small to be read on a dk1 screen

## Mobile support

This was a bit of a surprise to me, but the client renders perfectly on mobile. I added two little thumb wheels for controlling the look and movement of the client. It's not finished either, but I definitely want to keep mobile as a platform for viewing sceneVR scenes.

## Portals

SceneVr has a `<link />` element that links between scenes. So you can walk around a scene, find the link, a portal opens to the next scene, you step through the portal and you're in the next scene. I got this idea from [JanusVR](//janusvr.com) which does something similair, and of course the great game "Portal".

## Familiair API

I've modelled the scripting API for scenes on the DOM. So you can `document.getElementById` and `element.addEventListener('click', ...)`. You can also manipulate the `position`, `rotation` and `scale` vectors directly (well rotation is a euler, but yeah...). So `element.position.z += 10` just works.

## Network updates

Network updates work magically, and send updates 5x a second (the client sends the players location that often too). The wire protocol is currently xml, which isn't ideal, but I plan on optimising the most frequent messages in time. I use the tween.js library to interpolate scene updates so that everything appears silky smooth (at 60fps even on my underpowered macbook 11").

# Future

I plan to keep working on SceneVR, and will probably start a blog at [scenevr.com](//scenevr.com) to post updates there. I'd love to eventually work part-time on SceneVR if enough people start creating content for it, but that's a long way off at the moment. At the moment the project has only 10 stars on github. Here's to the next 10! :)