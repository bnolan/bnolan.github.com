---
layout: post
title: Polygons and postgis
---

I use [postgis](http://postgis.refractions.net/) extensively in my geo-local development. If you're working on a project that involves geo data and you haven't seriously looked into postgis, you're doing yourself a disfavour.

Postgres is really quite epic.

* Postgis
* [R for Postgres](http://rpgsql.sourceforge.net/)
* [Python for Postgres](http://www.pygresql.org/)
* A nice stable API for creating C++ extensions

We used the C++ API to make a [xapian](http://xapian.org/) plugin for [zoomin](http://zoomin.co.nz/), back in the day before [tsearch2](http://www.sai.msu.su/~megera/postgres/gist/tsearch/V2/) became integrated into Postgresql.

## Twitterplaces

[Sam](http://twitter.com/sminnee/) asked that I add polygons onto my [twitterplaces maps](http://twitterplaces.com/sfo/soma), so that he could see where the boundaries of a neighbourhood are.

<img src="/images/soma-tp.png">

<cite>South of Mission on Twitterplaces</cite>

The twitter places API gives you the bounding boxes of a place, so I already had the information, it was just a case of how to store the bounding boxes. I decided to do it properly and use [spatial\_adapter](http://github.com/fragility/spatial_adapter) and a :polygon column in my places table.

This meant I could use a method like so:

    def bounding_box=(params)
      points = []
  
      params['coordinates'].first.each do |c|
        points.push GeoRuby::SimpleFeatures::Point.from_x_y(c.first, c.last)
      end

      self.latitude = points.collect(&:y).sum / points.length
      self.longitude = points.collect(&:x).sum / points.length

      c = params['coordinates'].first.first
      points.push GeoRuby::SimpleFeatures::Point.from_x_y(c.first, c.last)
      self.geom = GeoRuby::SimpleFeatures::Polygon::from_points([points])
    end

To convert twitters json representation of a place into a WKRT geometry object in my database. This is cool, because then I can use some coffeescript like this to draw the polygon onto my maps.

    if $place.geom.rings
      points = []
      bounds = new google.maps.LatLngBounds
  
      for point in $place.geom.rings[0].points
        coord = new google.maps.LatLng(point.y, point.x)
        bounds.extend coord
        points.push coord

      if bounds.toSpan().lat() == 0.0 or bounds.toSpan().lng() == 0.0
        marker = new google.maps.Marker {
          map : map
          position : bounds.getCenter()
        }
      else
        poly = new google.maps.Polygon {
          paths : [points]
          map : map
          strokeColor : '#ff0000'
          strokeOpacity: 0.5
          fillOpacity : 0.1
          fillColor : '#ff0000'
        }

That code also checks whether the polygon is degenerate (of zero size), and then plots a marker instead. Twitter always sends polygons, even if the polygon has zero area. Anyway. So this was all nice and took 15 minutes to code up. But it also let me do something super awesome:

    def find_child_pois
      Place.find(:all, :conditions => ['kind = ? AND st_contains(?, geom)', 'poi', geom])
    end

I now have a method to find all places contained inside a place. So for example, [South of Mission](http://twitterplaces.com/sfo/soma) in San Francisco, has [Adobe Systems](http://twitterplaces.com/sfo/adobe-systems-san-francisco) inside of it. You can also find out which places contain this one - for example:

    >> Place.find_by_path('sfo/soma').find_parents.collect(&:name)
    => ["San Francisco", "SoMa", "California"]

I was pretty excited when all this came together so well. When I've got more time, I'd like to fix up the crawler that feeds twitterplaces, since at the moment it just dumps the database and recreates it every hour from a sampling of the twitter firehose.

Ah - for more good hours in the day.