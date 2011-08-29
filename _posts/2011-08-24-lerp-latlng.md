---
layout: post
title: Lerping LatLngs
---

I needed some code for lerping google maps latlongs (for providing a custom streetview navigator). Here's the function in coffeescript:

    google.maps.LatLng.prototype.lerp = (b, i) ->
      lat = (b.lat() - @lat()) * i + @lat()
      lng = (b.lng() - @lng()) * i + @lng()
