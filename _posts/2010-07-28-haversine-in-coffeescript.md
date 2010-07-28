The [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) is a equation that can be used to calculate the straight line distance between two coordinates on a sphere. It is commonly used by geohackers to work out how far in *kilometres* it is between two latitude/latitude coordinates.

Remember that lat/longs are actually spherical coordinates expressed in degrees.

This [page](http://kapelica.hr/kw/latlong.html) at kapelica.hr contained a great implementation of the haversine formula in javascript, I tidied it up and ported it to coffeescript to measure distances to the nearest places in my iphone app.

    Radians: (degrees) ->
      degrees /  57.2957795
  
    Haversine: (lat1, lon1, lat2, lon2) ->
      R = 6371 # km
      dLat: Radians(lat2-lat1)
      dLon: Radians(lon2-lon1)
      a: Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(Radians(lat1)) * Math.cos(Radians(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2)
      c: 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      R * c

Note that the degrees->radians conversion isn't exact, but the results should be within the margin of error for most GPS positioning systems.