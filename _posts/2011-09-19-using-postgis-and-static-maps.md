---
layout: post
title: Using the new static streetview api
---

So, Google just released a [static street view api](http://googlegeodevelopers.blogspot.com/2011/09/quick-and-simple-street-view-with.html), which is awesome, since showing a streetview of a place will usually jog someones memory much quicker than a top down view.

The only problem with the API (and it may be fixed in a future revision), is that you need to specify the heading that you want the returned image to be facing. This is a problem, since usually you only have the lat long of the place that you are visualizing, and not the bearing from the nearest road that a google streetview car drove along.

However - in my case, I have a complete set of OpenStreetMap data in my places database, so I could:

* Look for the nearest street
* Calculate the nearest point on the street
* Get the azimuth angle between the nearest point and the destination place
* Convert radians to degrees

And get the correct street view images. See this [search for curry](http://nz.geonear.com/places/search?q=curry) on Geonear to see what I mean.

Here's the code I used (rails code using postgis):

    <%= image_tag ".../streetview
      ?location=#{place.latitude},#{place.longitude}
      &size=280x200
      &pitch=15
      &fov=65
      &heading=#{place.street_view_heading}
      &sensor=false" %>

And in `place.rb`:

    def street_view_heading
      street = nearest_street
      
      point = Place.find_by_sql(['select st_closestpoint(?, ?) as geometry', street.geometry, self.geometry])
        .first
        .geometry
      
      (Street.find_by_sql(['select st_azimuth(?, ?) as azimuth', point, self.geometry])
        .first
        .azimuth
        .to_f * 180 / 3.14159).floor
    end

And we're away. Very nice, thanks Google. :)