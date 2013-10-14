---
layout: post
title: "ZoomOut - Maps for the Mission District"
---
 
So today I woke up and decided that I'd have a crack at seeing whether I can build something like ZoomIn, but for the Mission District of San Francisco. And whether it could be built using OpenStreetMap data. Presenting... [ZoomOut](http://www.zoomout.us/).

# Importing data

I started by getting a boundary polygon of the Mission, and using it to make an .osm extract of the california open street map data. I used `osmosis` for this, and it took about 10 minutes to extract out all the data for the mission.

I ended up with 102 unique streets that cover all of the mission. I then wrote an importer that merged the street segments together (since there are multiple OSM `way` records per street). I did this by using `st_collect` and `st_linemerge`. Which turns out to be a bit of a mistake - as you can [see here](http://www.zoomout.us/california/san-francisco/the-mission/15th-street/and/guerrero-street), where the line data has lots of jumps. I'm not sure how to fix this, but I designed my importer and URL scheme so that I can just reprocess the data at any stage as I come up with better ways of writing the importers.

# Knocking up some rails

I created a quick rails app using `activerecord-postgis-adapter` to connect to the postgis database. I created url schemes like so:

    'california/san-francisco/the-mission/:street/and/:cross_street'
    'california/san-francisco/the-mission/:street'
    
To create nice guessable, composable and shareable urls to cover all the streets of the mission, and the 900 intersections between streets in the mission. Each intersection shows a streetview of the cross street, and links to the nearest intersections (bit flaky at the moment, but I'm working on it).

The street view shows the street with a polyline rendered where the street is, and a list of the cross streets.

# Disqus with ease

I initially was going to use `devise` and create a `Comment` model in my app, but it turned out to be much easier just to use [Disqus](http://www.disqus.com/). Especially once I found out that you can pull disqus comments out of their API. I could then easily insert the comments into my own database for doing geospatial queries, but without me having to create and maintain my own user database.

# Linode

I was about to deploy all this on [heroku](http://www.heroku.com/), but after the hassle of the last app I did on heroku, plus the fact that you have to pay $50 a month to use postgis, I decided to just reboot my 1GB linode and reinstall apache + passenger. I don't have puppet scripts for this yet, but I'm talking to a friend this week about how to go about setting up some scripts for firing up VMs. It took about an hour to get apache, passenger and postgis all setup and the app deployed.

# Sitemaps and Google

Part of this is an experiment to see whether google will index a site that provides a place to discuss all the streets and cross streets and intersections of San Francisco, so I submitted a sitemap, registered the domain with google webmaster tools, and we'll see if the almight Googs decides whether or not to crawl the site.

I still think I can make an interesting site even if the Googs doesn't index the site, but it would be pretty cool to be on the first page of results for [15th and Utah](http://www.zoomout.us/california/san-francisco/the-mission/15th-street/and/utah-street).

In the longer term, I'd like this to become something like the sadly missed Everyblock. I'll get started with a nice url scheme, lots of nodes for people to talk about, get searching working well, aggregate content together into easily discoverable views, and then see what happens.