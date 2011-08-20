---
layout: post
title: Duplication detection with postgis
---

I've written a particularly gnarly query here that I thought I would share. It's for iterating over a collection of points that have names, and identifying points that likely candidates for merging.

    select
      name, floor(length(ST_ExteriorRing(st_box2d(st_extent(geometry)))) * 1000000) as length, count(id)
    from
      places
    group by
      name
    order by 
      count desc;
      
Basically, it selects places with similair names, and returns the length of the bounding box surrounding those places. You can use this as a basic test to see if those places should be merged. There a tonne of situations in which this won't work, but to get you out the gate, it might be helpful.