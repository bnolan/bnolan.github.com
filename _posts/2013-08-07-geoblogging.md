---
layout: post
title: "Geoblogging"
---
 
I think geoblogging might become a popular thing. It's pretty nerdy, and whenever I research the larger social networks, no one really seems to care very much about location when they create content, but I think it might become a thing. I think the most popular geosocial network at the moment is foursquare, and there is a lot of microcontent being created there, hints and tips on places.

People also create foursquare lists, which are awesome maps of places (venues in the foursquare parlance) to visit across cities and countries. I think foursquare is the geosocial network that I wanted to build back in 2006 when I started building zoomin. It's like flickr but with places.

## Findery

[Findery](http://findery.com/) is [Caterina Fakes](http://twitter.com/caterina/) attempt to build 'flickr around places'. It's been going for over a year, and has a bit of funding and about 15 employees. It's a cool idea, but whenever I use it, I find that it's not very addictive to use, and I wonder if they just haven't cracked what it is that makes a site about places really sticky and fun to use. You can write a post about anything on the map, and it uses google places api so that you can search for most businesses and places around the world. I think Findery might get interesting once it has an API available.

## Hi

[Hi](http://sayhi.co/) is [Craig Mods](http://twitter.com/craigmod) "Narrative mapping" site. It's been built by his team in Tokyo, it's got the idea of sketches - where you make a few notes about a place, and then people can ask you to expand upon an idea and write more. One thing I find a bit weird about hi, is that it seems you can only write about your current location (it asks for permission to access your GPS), it doesn't seem that you can write about different places. It also doesn't have groups or maps, so you can't make a few posts and mash them together into a little map.

## Maptia

[Maptia](http://maptia.com/) isn't launched yet, but they have an awesome backstory. They're an english team, that started out in the UK, attending start-up chile, got into techstars in seattle, then moved to a surf-beach town in morocco to live as cheaply as possible and keep cranking on their idea. They have a great twitter presence, lots of people are interested in what they're doing. But they're still in private beta, so I haven't had a chance to see what they're building.

## Subtract

Subtract is what I'm working on. It's a tool for creating mini-blogs about places on your phone. I created it after our trip to the rainforest north of Cairns, where I didn't have a laptop with me, but I wanted to created a record of our trip, so that I could share the experience with my friends, and have something to point at if anyone I know is visiting that part of the world in the future. It's a mobile web app, written using rails and deployed on heroku, and it's my current 1-day-a-week project. I'm modelling it on Tumblr, which has a great mobile content creation experience. The way I'm using it at the moment, each blog you create only has 1-10 entries, for example I've created a blog called "Places in Petone", another one "Newtown, it's a bit shit" and "Our Cairns trip". Then you created 'posts', and each post is associated with a place. Because you have all this geodata, the app can show you blogs that are near where you are, and recent posts that are happening near you. You can also see a blog as a chronological list of posts, or you can see all the posts on a map.

I did the first cut of subtract in backbone.js, but didn't find it very easy to riff on and try different ideas, so I've re-written it as a pure rails app. I think I've got the content creation nailed, it's pretty easy to create a cool little blog, but the display of the posts is the hard part. I like it when you have a simple content creation tool, and it creates something really nice looking that you'd be proud of showing your friends, you put in a little work and get a nice reward, and the way I display posts at the moment isn't doing that for me. But I'll keep riffing on it for a few weeks and see where it ends up.