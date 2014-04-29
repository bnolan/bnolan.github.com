---
layout: post
title: "Better encounter detection"
---
 
So I got as far as making a [cool contoured terrain](http://bennolan.com/contour-terrain/html/) in WebGL before I decided that it was time to do a bit more work on With. I downloaded the latest database dump from Heroku and started doing some analysis. Where I got to last with With, is that I couldn't reliably detect encounters between people, so I put it on the backburner while I worked on other stuff and talked to friends about was to better detect encounters.

# Using st_buffer

Every location fix I get from a user has a latitude, longitude and accuracy. Krasimir asked me why I don't use something like st_buffer to create a circle around the location fix, and see if that circle intersects with any other users `fixes`. This was actually a really cool idea, so I refactored my encounter simulation code like so:

    create temporary table 
      current_locations
    as
      select
        id,
        geo as geo,
        st_buffer(geo, accuracy) as fix,
        created_at,
        user_id
      from
        locations
      where
        created_at > #{conn.quote(earlier_t)}
      and
        id in (select max(id) from locations where accuracy < 500 and created_at < #{conn.quote(t)} group by user_id);

This way, instead of searching for all encounters within an arbitrary distance of each other, I use the accuracy of the fix to see if the two circles intersect using st_intersects.

# Using intersections to define the encounter

The next thing, was defining where about the encounter took place, so that you can compare old encounters to new encounters (since every 5 minutes I either extend an encounter and say it's still in progress, or I end date it and create new encounters for wherever you are now). I had a few ideas, first up was to use the centroid of a union of the two buffers, but then I thought about it, and realistically, the encounter should have happened in the intersection are of the two buffers. This may create weird lens shaped intersection areas if the two users two locations are quite different, but in theory the intersection area should cover where the encounter actually occurred.

# Two person encounters or multi?

The next problem I was working on, was how to create multi person encounters. You have two problems, people leave and join encounters at different times (eg I might be at the pub with Sam, and Patrick might turn up half an hour later), and also, you have to consider friendship networks. For example, I might be at the pub with Robin, and Robins friend Dave is there. Does this mean that I'm in an encounter with Dave? I don't know. What if Dave has a friend who I don't know - how greedy do the encounters get? Do they gobble up everyone who has a friendship with anyone else at the location - I don't think so, but I couldn't work out a nice way to represent this.
