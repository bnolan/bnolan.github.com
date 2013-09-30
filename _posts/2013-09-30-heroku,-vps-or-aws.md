---
layout: post
title: "Heroku, VPS or AWS"
---
 
So last night I started hacking on a realtime data analysis tool for ZoomIn. Basically, I'm inserting a bit of javacript in the bottom of ZoomIn pages, and that javascript digs out the opengraph tags and sends the latitude/longitude of the current page off to my data analysis tool. I'm doing it so I can generate heatmaps of activity on ZoomIn, and maybe work out whether it's trying to run my own ads on the site.

# Hosting a rails app

I got most of the prototype written last night, and I decided to get the production infrastructure set up today so that I could run it in a dark mode, where my tool doesn't make any change to the ZoomIn site, but I can test that my infrastructure can handle the traffic. I don't want to host this on the [rimuhosting](http://rimuhosting.com/) VPS that hosts zoomin, since it's already pretty pegged performance wise, and I want to get some experiment with other boxes.

# Linode

First I tried setting things up on my 512mb Linode. But a few things went wrong (upgrading passenger to ruby 2.0.0 segfaulted apache spectacularly), and the latency from nz to linode cali is about 170ms, which is too much for this case.

# Digitalocean

I was pretty tempted to try DO, since they have SSD VPS's for very reasonable prices, but I didn't go down this path because [a] latency is high from nz [b] worried about over-tenanted boxes (just read a few posts about people running miners on their hardware).

# Dedicated box

This project doesn't warrant a dedicated box yet, but I would love to get one at some stage. Either build a 32gb ram + SSD box, or lease one from somewhere in the states.

# Heroku

So I went back to deploying on Heroku, except you have to pay extra for Postgis on postgres databases, and I couldn't work out how to get activerecord-postgis to work with the heroku deploy recipes. Plus my last heroku project fucked out because I couldn't work out how to get the asset packager working properly. Plus, it's not in NZ, and there's no Australian availability zone for Heroku.

# EC2 Sydney

I've wanted to try out AWS every since they released their sydney availability zone, so after a bit of mucking around, I managed to get my box up and running on ubuntu 12.04LTS on the sydney zone. The latency is great, less than 20ms from my house in New Zealand. Installing ubuntu, rvm, ruby 2.0, passenger, apache, postgres and postgis went perfectly, and everything is humming away now.

Plus, another advantage with ec2, is that if I do more with this project and need to scale it up, I can start to use all those automated tools for firing up and imaging ec2 instances from the command line. For now I'm just using the web tools though, and capistrano for deployment.

Next research will be whether postgres has the insert capacity to record all the visits to ZoomIn, and whether I can tune postgres or do I need to do move to something else like mongo or redis? Mongo has nice geospatial extensions of course, but redis doesn't have anything built in.