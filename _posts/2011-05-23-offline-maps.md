---
layout: post
title: Offline maps
---

I've recently had a project morph from an online html5 mapping site, into an application that needs to run offline on netbooks and macbooks. So I'm investigating taking an openlayers, backbone and coffeescript application and packaging it up with Firefox webrunner (or [Prism](https://addons.mozilla.org/en-us/firefox/addon/mozilla-labs-prism/)) as an installable package for Windows and os x.

Doing installable software isn't new territory to me. At [Indigo](http://indigorenderer.com/) we built installable packages for Windows, OS X and Linux - so I'm pretty happy to work my way through [innosetup](http://www.jrsoftware.org/isinfo.php) or [nsis](http://nsis.sourceforge.net/Main_Page), and the os x packagemaker. For the map tiles, I might try and adapt the [mbtiles](http://mbtiles.org/) specification from the guys at mapbox. This will be a problem, as the database will have to be jerry rigged into place where Firefox can see it. I'm avoiding doing any binary firefox extensions for this project, although if things go well, there is the posibility of storing vector data locally and creating a mapnik build that operates as a firefox extension.

Data will be stored locally using backbone and sqlite, with regular online syncing to the official point-of-interest repository. So far we only have the html5 protoype done, so there is a lot of ground to cover - but I'll try and keep you all updated on how things go.