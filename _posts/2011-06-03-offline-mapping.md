---
layout: post
title: Offline Mapping in HTML5
---

I've been doing some research and development around offline mapping for a client of mine. Here's my notes on the current state of technology.

# Tile based offline mapping

The easiest way to do offline mapping is to use something like openlayers and store tiles offline. This is kind of gross at first glance, but in practise it works well. It's very simple, the technology is mature, and above a certain zoom level, it can actually be smaller to store the raster data than the underlying unprocessed vector data. However, it clearly doesn't work for high zoom levels.

To map an area the size of New Zealand using offline tile caching to zoom level 15, a naive implementation would take about 25 gigabytes of storage. With a little development you could probably get it down to 1-2gb, and with some serious development (adaptive zoom levels based on feature detection in the underlying vector data) you could maybe get to a ~200mb download, but it's clearly not a trivial download.

However - this isn't such a big problem if you're doing a small area like a city or a town, So - assuming you don't need ultra-high zoom levels, and you can solve the issues of download size, what technology exists to do offline mapping?

# Delivering offline maps

The team at [mapbox](http://mapbox.com/) have created a suite of tools for offline mapping. Maps on a stick is an interesting tool that uses openlayers, firefox and html5 to create an offline mapping tool. It is written in javascript, and requires that you download the map tiles and store them on your local filesystem. The downside to this is that copying over 800,000 5kB tiles takes approximately forever. To solve this issue on their ipad app, Mapbox created the [mbtiles](http://mbtiles.org/) format, which is involves putting all the maptiles into a sqlite database that modern filesystems can move around much easier.

Sadly, maps on a stick doesn't support mbtiles, so I looked into what would be involved in adding mbtiles support to maps on a stick. Basically, it boils down to creating a firefox xpcom component (in javascript) that uses the firefox sqlite interface to expose the tiles to openlayers. It's doable, but fiddly.

On the plus side, you could then wrap up maps on a stick, your mbtiles components and xulrunner to create an installable offline mapping tool. From my experiments with xulrunner and reading through the xpcom documentation, this is non-trivial.

# Chrome store?

You could just shortcut all the xulrunner / xpcom stuff and do your offline apps using the chrome app store, or safari html5 offline support. I prototyped this and made a phonegap-powered ipad app that downloaded tiles from [cloudmade](http://cloudmade.com/) and stored them in the html5 web database store. The downside to this is downloading the tiles is sloooww, and although you can do multiple requests at once using multiple subdomains, you still get slower throughput than if all the tiles were globbed together into one sqlite database.

# Vector data and C++

The best solution, if you were keen to do some serious development, would be to bust out your compiler and package up mapnik or another renderer to act as an xpcom component for firefox. You could still serve tiles, so you could use openlayers (or tile5 or leaflet), and you would have infinite zoom, nice small vector data (the OSM dataset for New Zealand is about 25mB) and you would win all the technical brownie points.

Down this path also lies writing your UI in QT (ala Google Earth) or WX instead of using Firefox, so you could create a completely custom mapping tool.

# Analysis

I haven't finalized my decision yet, but it seems to me that there are no natural inflection points on the cost/benefit graph for offline mapping. If anything, I might lean towards xulrunner + something like "maps on a stick", but it's neither here nor there.

Basically, there are no good offline mapping solutions for netbooks / laptops, so maybe there's a market niche there.