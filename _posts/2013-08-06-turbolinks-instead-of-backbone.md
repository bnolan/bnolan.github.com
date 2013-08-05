---
layout: post
title: "Turbolinks instead of backbone"
---
 
I read this [interesting article](http://www.mattdeleon.net/) by Matt De Leon, about using turbolinks and server-side generated javascript with Rails to build a nice fast app. He is a backbone developer, and found that he could build a nicer app using turbolinks than he could using Backbone.

I've found a similair problem. I've been working on my "microgeoblogging" tool [subtract](http://subtract.in/), and because I want it to be a nice responsive mobile app, I did the first cut using backbone.js and a minimal rails app that ran the backend. This came together pretty quickly, I knocked it all up in coffeescript and using my `capt` build tool.

But the problem was I got to a point pretty quickly where I needed to rapidly change the design, layout and user interface of the app. I built the tool I was imagining, and it was boring to use, it didn't create the pretty little blog that I was hoping to create, a blog that showed our trip to Cairns and Sydney last month.

<img src="/images/subtract-1.png" />
<cite>The most recent iteration of the mobile blog theme</cite>

And iterating on a backbone.js app is a whole lot slower than iterating on a rails html view. So I threw away the backbone app for now, and reimplemented everything in rails 4. I had to add a polyfill to get turbolinks running on chrome for android, and I'm not sure that it's working correctly on ios mobile yet, but even just using proper caching and forms that submit using ajax, the mobile app is pretty fun to use, and it's been a lot easier to riff on the code and come up with new ideas.

I'm currently at the stage where I just need to keep looking up ideas on [dribbble](http://dribbble.com/), trying them out on the two little blogs I've created so far (one for places I like in Petone, and one recording our trip to Cairns), and once I start to make something that is cool and I want to show to other people, then put the app out there.